import type * as Msal from '@azure/msal-node';
import { DeviceCodeResponse } from "@azure/msal-common";
import type * as NodeForge from 'node-forge';
import { FileTokenStorage } from './auth/FileTokenStorage';
import { msalCachePlugin } from './auth/msalCachePlugin';
import { TokenStorage } from './auth/TokenStorage';
import type { AuthServer } from './AuthServer';
import { Cli, Logger } from './cli';
import { CommandError } from './Command';
import config from './config';
import request from './request';
import { settingsNames } from './settingsNames';

export interface Hash<TValue> {
  [key: string]: TValue;
}

interface AccessToken {
  expiresOn: Date | string | null;
  accessToken: string;
}

export interface InteractiveAuthorizationCodeResponse {
  code: string;
  redirectUri: string;
}

export interface InteractiveAuthorizationErrorResponse {
  error: string;
  errorDescription: string;
}

export class Service {
  connected: boolean = false;
  authType: AuthType = AuthType.DeviceCode;
  userName?: string;
  password?: string;
  certificateType: CertificateType = CertificateType.Unknown;
  certificate?: string;
  thumbprint?: string;
  accessTokens: Hash<AccessToken>;
  spoUrl?: string;
  tenantId?: string;
  // ID of the Azure AD app used to authenticate
  appId: string;
  // ID of the tenant where the Azure AD app is registered; common if multitenant
  tenant: string;

  constructor() {
    this.accessTokens = {};
    this.appId = config.cliAadAppId;
    this.tenant = config.tenant;
  }

  public logout(): void {
    this.connected = false;
    this.accessTokens = {};
    this.authType = AuthType.DeviceCode;
    this.userName = undefined;
    this.password = undefined;
    this.certificateType = CertificateType.Unknown;
    this.certificate = undefined;
    this.thumbprint = undefined;
    this.spoUrl = undefined;
    this.tenantId = undefined;
    this.appId = config.cliAadAppId;
    this.tenant = config.tenant;
  }
}

export enum AuthType {
  DeviceCode,
  Password,
  Certificate,
  Identity,
  Browser
}

export enum CertificateType {
  Unknown,
  Base64,
  Binary
}

export class Auth {
  private _authServer: AuthServer | undefined;
  private deviceCodeRequest?: Msal.DeviceCodeRequest;
  private _service: Service;
  private clientApplication: Msal.ClientApplication | undefined;

  public get service(): Service {
    return this._service;
  }

  public get defaultResource(): string {
    return 'https://graph.microsoft.com';
  }

  constructor() {
    this._service = new Service();
  }

  public async restoreAuth(): Promise<void> {
    // check if auth has been restored previously
    if (this._service.connected) {
      return Promise.resolve();
    }

    try {
      const service: Service = await this.getServiceConnectionInfo<Service>();
      this._service = Object.assign(this._service, service);
    }
    catch {
    }
  }

  public async ensureAccessToken(resource: string, logger: Logger, debug: boolean = false, fetchNew: boolean = false): Promise<string> {
    const now: Date = new Date();
    const accessToken: AccessToken | undefined = this.service.accessTokens[resource];
    const expiresOn: Date = accessToken && accessToken.expiresOn ?
      // if expiresOn is serialized from the service file, it's set as a string
      // if it's coming from MSAL, it's a Date
      typeof accessToken.expiresOn === 'string' ? new Date(accessToken.expiresOn) : accessToken.expiresOn
      : new Date(0);

    if (!fetchNew && accessToken && expiresOn > now) {
      if (debug) {
        logger.logToStderr(`Existing access token ${accessToken.accessToken} still valid. Returning...`);
      }
      return accessToken.accessToken;
    }
    else {
      if (debug) {
        if (!accessToken) {
          logger.logToStderr(`No token found for resource ${resource}`);
        }
        else {
          logger.logToStderr(`Access token expired. Token: ${accessToken.accessToken}, ExpiresAt: ${accessToken.expiresOn}`);
        }
      }
    }

    let getTokenPromise: ((resource: string, logger: Logger, debug: boolean, fetchNew: boolean) => Promise<AccessToken | null>) | undefined;

    // when using cert, you can't retrieve token silently, because there is
    // no account. Also cert auth instantiates clientApplication itself
    // after inspecting the specified cert and calculating thumbprint if one
    // wasn't specified
    if (this.service.authType !== AuthType.Certificate) {
      this.clientApplication = this.getClientApplication(logger, debug);
      if (this.clientApplication) {
        const accounts = await this.clientApplication.getTokenCache().getAllAccounts();
        if (accounts.length > 0) {
          getTokenPromise = this.ensureAccessTokenSilent.bind(this);
        }
      }
    }

    if (!getTokenPromise) {
      switch (this.service.authType) {
        case AuthType.DeviceCode:
          getTokenPromise = this.ensureAccessTokenWithDeviceCode.bind(this);
          break;
        case AuthType.Password:
          getTokenPromise = this.ensureAccessTokenWithPassword.bind(this);
          break;
        case AuthType.Certificate:
          getTokenPromise = this.ensureAccessTokenWithCertificate.bind(this);
          break;
        case AuthType.Identity:
          getTokenPromise = this.ensureAccessTokenWithIdentity.bind(this);
          break;
        case AuthType.Browser:
          getTokenPromise = this.ensureAccessTokenWithBrowser.bind(this);
          break;
      }
    }

    const response = await getTokenPromise(resource, logger, debug, fetchNew);
    if (!response) {
      if (debug) {
        logger.logToStderr(`getTokenPromise authentication result is null`);
      }
      throw `Failed to retrieve an access token. Please try again`;
    }
    else {
      if (debug) {
        logger.logToStderr('Response');
        logger.logToStderr(response);
        logger.logToStderr('');
      }
    }

    this.service.accessTokens[resource] = {
      expiresOn: response.expiresOn,
      accessToken: response.accessToken
    };
    this.service.connected = true;
    try {
      await this.storeConnectionInfo();
    }
    catch (ex) {
      // error could happen due to an issue with persisting the access
      // token which shouldn't fail the overall token retrieval process
      if (debug) {
        logger.logToStderr(new CommandError(ex));
      }
    }
    return response.accessToken;
  }

  private getClientApplication(logger: Logger, debug: boolean): Msal.ClientApplication | undefined {
    switch (this.service.authType) {
      case AuthType.DeviceCode:
      case AuthType.Password:
      case AuthType.Browser:
        return this.getPublicClient(logger, debug);
      case AuthType.Certificate:
        return this.getConfidentialClient(logger, debug, this.service.thumbprint as string, this.service.password);
      case AuthType.Identity:
        // msal-node doesn't support managed identity so we need to do it manually
        return undefined;
    }
  }

  private getAuthClientConfiguration(logger: Logger, debug: boolean, certificateThumbprint?: string, certificatePrivateKey?: string): Msal.Configuration {
    const msal: typeof Msal = require('@azure/msal-node');
    const { LogLevel } = msal;
    const cert = !certificateThumbprint ? undefined : {
      thumbprint: certificateThumbprint,
      privateKey: certificatePrivateKey as string
    };
    return {
      auth: {
        clientId: this.service.appId,
        authority: `https://login.microsoftonline.com/${this.service.tenant}`,
        clientCertificate: cert
      },
      cache: {
        cachePlugin: msalCachePlugin
      },
      system: {
        loggerOptions: {
          // loggerCallback is called by MSAL which we're not testing
          /* c8 ignore next 4 */
          loggerCallback: (level: Msal.LogLevel, message: string) => {
            if (level === LogLevel.Error || debug) {
              logger.logToStderr(message);
            }
          },
          piiLoggingEnabled: false,
          logLevel: debug ? LogLevel.Verbose : LogLevel.Error
        }
      }
    };
  }

  private getPublicClient(logger: Logger, debug: boolean) {
    const msal: typeof Msal = require('@azure/msal-node');
    const { PublicClientApplication } = msal;

    if (this.service.authType === AuthType.Password &&
      this.service.tenant === 'common') {
      // common is not supported for the password flow and must be changed to
      // organizations
      this.service.tenant = 'organizations';
    }

    return new PublicClientApplication(this.getAuthClientConfiguration(logger, debug));
  }

  private getConfidentialClient(logger: Logger, debug: boolean, certificateThumbprint: string, certificatePrivateKey?: string) {
    const msal: typeof Msal = require('@azure/msal-node');
    const { ConfidentialClientApplication } = msal;

    return new ConfidentialClientApplication(this.getAuthClientConfiguration(logger, debug, certificateThumbprint, certificatePrivateKey));
  }

  private retrieveAuthCodeWithBrowser(resource: string, logger: Logger, debug: boolean): Promise<InteractiveAuthorizationCodeResponse> {
    return new Promise<InteractiveAuthorizationCodeResponse>((resolve: (error: InteractiveAuthorizationCodeResponse) => void, reject: (error: InteractiveAuthorizationErrorResponse) => void): void => {
      // _authServer is never set before hitting this line, but this check
      // is implemented so that we can support lazy loading
      // but also stub it for testing
      /* c8 ignore next 3 */
      if (!this._authServer) {
        this._authServer = require('./AuthServer').default;
      }

      (this._authServer as AuthServer).initializeServer(this.service, resource, resolve, reject, logger, debug);
    });
  }

  private async ensureAccessTokenWithBrowser(resource: string, logger: Logger, debug: boolean): Promise<AccessToken | null> {
    if (debug) {
      logger.logToStderr(`Retrieving new access token using interactive browser session...`);
    }

    const response = await this.retrieveAuthCodeWithBrowser(resource, logger, debug);
    if (debug) {
      logger.logToStderr(`The service returned the code '${response.code}'`);
    }

    return (this.clientApplication as Msal.PublicClientApplication).acquireTokenByCode({
      code: response.code,
      redirectUri: response.redirectUri,
      scopes: [`${resource}/.default`]
    });
  }

  private async ensureAccessTokenSilent(resource: string, logger: Logger, debug: boolean, fetchNew: boolean): Promise<AccessToken | null> {
    if (debug) {
      logger.logToStderr(`Retrieving new access token silently`);
    }

    const accounts = await (this.clientApplication as Msal.ClientApplication)
      .getTokenCache().getAllAccounts();
    return (this.clientApplication as Msal.ClientApplication).acquireTokenSilent({
      account: accounts[0],
      scopes: [`${resource}/.default`],
      forceRefresh: fetchNew
    });
  }

  private async ensureAccessTokenWithDeviceCode(resource: string, logger: Logger, debug: boolean): Promise<AccessToken | null> {
    if (debug) {
      logger.logToStderr(`Starting Auth.ensureAccessTokenWithDeviceCode. resource: ${resource}, debug: ${debug}`);
    }

    this.deviceCodeRequest = {
      // deviceCodeCallback is called by MSAL which we're not testing
      /* c8 ignore next 1 */
      deviceCodeCallback: response => this.getDeviceCodeResponse(response, logger, debug),
      scopes: [`${resource}/.default`]
    };
    return (this.clientApplication as Msal.PublicClientApplication).acquireTokenByDeviceCode(this.deviceCodeRequest) as Promise<AccessToken | null>;
  }

  public getDeviceCodeResponse(response: DeviceCodeResponse, logger: Logger, debug: boolean): void {
    if (debug) {
      logger.logToStderr('Response:');
      logger.logToStderr(response);
      logger.logToStderr('');
    }

    logger.log(response.message);

    if (Cli.getInstance().getSettingWithDefaultValue<boolean>(settingsNames.autoOpenBrowserOnLogin, false)) {
      const open = require('open') as typeof import('open');
      open(response.verificationUri);
    }
  }

  private async ensureAccessTokenWithPassword(resource: string, logger: Logger, debug: boolean): Promise<AccessToken | null> {
    if (debug) {
      logger.logToStderr(`Retrieving new access token using credentials...`);
    }

    return (this.clientApplication as Msal.PublicClientApplication).acquireTokenByUsernamePassword({
      username: this.service.userName as string,
      password: encodeURIComponent(this.service.password as string),
      scopes: [`${resource}/.default`]
    });
  }

  private async ensureAccessTokenWithCertificate(resource: string, logger: Logger, debug: boolean): Promise<AccessToken | null> {
    const nodeForge: typeof NodeForge = require('node-forge');
    const { pem, pki, asn1, pkcs12 } = nodeForge;

    if (debug) {
      logger.logToStderr(`Retrieving new access token using certificate...`);
    }

    let cert: string = '';
    const buf = Buffer.from(this.service.certificate as string, 'base64');

    if (this.service.certificateType === CertificateType.Unknown || this.service.certificateType === CertificateType.Base64) {
      // First time this method is called, we don't know if certificate is PEM or PFX (type is Unknown)
      // We assume it is PEM but when parsing of PEM fails, we assume it could be PFX
      // Type is persisted on service so subsequent calls only run through the correct parsing flow
      try {
        cert = buf.toString('utf8');
        const pemObjs: NodeForge.pem.ObjectPEM[] = pem.decode(cert);

        if (this.service.thumbprint === undefined) {
          const pemCertObj: NodeForge.pem.ObjectPEM = pemObjs.find(pem => pem.type === "CERTIFICATE") as NodeForge.pem.ObjectPEM;
          const pemCertStr: string = pem.encode(pemCertObj);
          const pemCert: NodeForge.pki.Certificate = pki.certificateFromPem(pemCertStr);

          this.service.thumbprint = this.calculateThumbprint(pemCert);
        }
      }
      catch (e) {
        this.service.certificateType = CertificateType.Binary;
      }
    }

    if (this.service.certificateType === CertificateType.Binary) {
      const p12Asn1 = asn1.fromDer(buf.toString('binary'), false);

      const p12Parsed = pkcs12.pkcs12FromAsn1(p12Asn1, false, this.service.password);

      let keyBags: any = p12Parsed.getBags({ bagType: pki.oids.pkcs8ShroudedKeyBag });
      const pkcs8ShroudedKeyBag = keyBags[pki.oids.pkcs8ShroudedKeyBag][0];

      if (debug) {
        // check if there is something in the keyBag as well as
        // the pkcs8ShroudedKeyBag. This will give us more information
        // whether there is a cert that can potentially store keys in the keyBag.
        // I could not find a way to add something to the keyBag with all 
        // my attempts, but lets keep it here for troubleshooting purposes.
        logger.logToStderr(`pkcs8ShroudedKeyBagkeyBags length is ${[pki.oids.pkcs8ShroudedKeyBag].length}`);

        keyBags = p12Parsed.getBags({ bagType: pki.oids.keyBag });
        logger.logToStderr(`keyBag length is ${keyBags[pki.oids.keyBag].length}`);
      }

      // convert a Forge private key to an ASN.1 RSAPrivateKey
      const rsaPrivateKey = pki.privateKeyToAsn1(pkcs8ShroudedKeyBag.key);

      // wrap an RSAPrivateKey ASN.1 object in a PKCS#8 ASN.1 PrivateKeyInfo
      const privateKeyInfo = pki.wrapRsaPrivateKey(rsaPrivateKey);

      // convert a PKCS#8 ASN.1 PrivateKeyInfo to PEM
      cert = pki.privateKeyInfoToPem(privateKeyInfo);

      if (this.service.thumbprint === undefined) {
        const certBags: {
          [key: string]: NodeForge.pkcs12.Bag[] | undefined;
          localKeyId?: NodeForge.pkcs12.Bag[];
          friendlyName?: NodeForge.pkcs12.Bag[];
        } = p12Parsed.getBags({ bagType: pki.oids.certBag });
        const certBag: NodeForge.pkcs12.Bag = (certBags[pki.oids.certBag] as NodeForge.pkcs12.Bag[])[0];

        this.service.thumbprint = this.calculateThumbprint(certBag.cert as NodeForge.pki.Certificate);
      }
    }

    this.clientApplication = this.getConfidentialClient(logger, debug, this.service.thumbprint as string, cert);
    return (this.clientApplication as Msal.ConfidentialClientApplication).acquireTokenByClientCredential({
      scopes: [`${resource}/.default`]
    });
  }

  private async ensureAccessTokenWithIdentity(resource: string, logger: Logger, debug: boolean): Promise<AccessToken | null> {
    const userName = this.service.userName;
    if (debug) {
      logger.logToStderr('Will try to retrieve access token using identity...');
    }

    const requestOptions: any = {
      url: '',
      headers: {
        accept: 'application/json',
        Metadata: true,
        'x-anonymous': true
      },
      responseType: 'json'
    };

    if (process.env.IDENTITY_ENDPOINT && process.env.IDENTITY_HEADER) {
      if (debug) {
        logger.logToStderr('IDENTITY_ENDPOINT and IDENTITY_HEADER env variables found it is Azure Function, WebApp...');
      }

      requestOptions.url = `${process.env.IDENTITY_ENDPOINT}?resource=${encodeURIComponent(resource)}&api-version=2019-08-01`;
      requestOptions.headers['X-IDENTITY-HEADER'] = process.env.IDENTITY_HEADER;
    }
    else if (process.env.MSI_ENDPOINT && process.env.MSI_SECRET) {
      if (debug) {
        logger.logToStderr('MSI_ENDPOINT and MSI_SECRET env variables found it is Azure Function or WebApp, but using the old names of the env variables...');
      }

      requestOptions.url = `${process.env.MSI_ENDPOINT}?resource=${encodeURIComponent(resource)}&api-version=2019-08-01`;
      requestOptions.headers['X-IDENTITY-HEADER'] = process.env.MSI_SECRET;
    }
    else if (process.env.IDENTITY_ENDPOINT) {
      if (debug) {
        logger.logToStderr('IDENTITY_ENDPOINT env variable found it is Azure Could Shell...');
      }

      if (userName && process.env.ACC_CLOUD) {
        // reject for now since the Azure Cloud Shell does not support user-managed identity 
        return Promise.reject('Azure Cloud Shell does not support user-managed identity. You can execute the command without the --userName option to login with user identity');
      }

      requestOptions.url = `${process.env.IDENTITY_ENDPOINT}?resource=${encodeURIComponent(resource)}`;
    }
    else if (process.env.MSI_ENDPOINT) {
      if (debug) {
        logger.logToStderr('MSI_ENDPOINT env variable found it is Azure Could Shell, but using the old names of the env variables...');
      }

      if (userName && process.env.ACC_CLOUD) {
        // reject for now since the Azure Cloud Shell does not support user-managed identity 
        return Promise.reject('Azure Cloud Shell does not support user-managed identity. You can execute the command without the --userName option to login with user identity');
      }

      requestOptions.url = `${process.env.MSI_ENDPOINT}?resource=${encodeURIComponent(resource)}`;
    }
    else {
      if (debug) {
        logger.logToStderr('IDENTITY_ENDPOINT and MSI_ENDPOINT env variables not found. Attempt to get Managed Identity token by using the Azure Virtual Machine API...');
      }

      requestOptions.url = `http://169.254.169.254/metadata/identity/oauth2/token?resource=${encodeURIComponent(resource)}&api-version=2018-02-01`;
    }

    if (userName) {
      // if name present then the identity is user-assigned managed identity
      // the name option in this case is either client_id or principal_id (object_id) 
      // of the managed identity service principal
      requestOptions.url += `&client_id=${encodeURIComponent(userName as string)}`;

      if (debug) {
        logger.logToStderr('Wil try to get token using client_id param...');
      }
    }

    try {
      const accessTokenResponse = await request.get<{ access_token: string; expires_on: string }>(requestOptions);
      return {
        accessToken: accessTokenResponse.access_token,
        expiresOn: new Date(parseInt(accessTokenResponse.expires_on) * 1000)
      };
    }
    catch (e) {
      if (!userName) {
        throw e;
      }

      // since the userName option can be either client_id or principal_id (object_id) 
      // and the first attempt was using client_id
      // now lets see if the api returned 'not found' response and
      // try to get token using principal_id (object_id)
      let isNotFoundResponse = false;
      if (e.error && e.error.Message) {
        // check if it is Azure Function api 'not found' response
        isNotFoundResponse = (e.error.Message.indexOf("No Managed Identity found") !== -1);
      }
      else if (e.error && e.error.error_description) {
        // check if it is Azure VM api 'not found' response
        isNotFoundResponse = (e.error.error_description === "Identity not found");
      }

      if (!isNotFoundResponse) {
        // it is not a 'not found' response then exit with error
        throw e;
      }

      if (debug) {
        logger.logToStderr('Wil try to get token using principal_id (also known as object_id) param ...');
      }

      requestOptions.url = requestOptions.url.replace('&client_id=', '&principal_id=');
      requestOptions.headers['x-anonymous'] = true;

      try {
        const accessTokenResponse = await request.get<{ access_token: string; expires_on: string }>(requestOptions);
        return {
          accessToken: accessTokenResponse.access_token,
          expiresOn: new Date(parseInt(accessTokenResponse.expires_on) * 1000)
        };
      }
      catch (err) {
        // will give up and not try any further with the 'msi_res_id' (resource id) query string param
        // since it does not work with the Azure Functions api, but just with the Azure VM api
        if (err.error.code === 'EACCES') {
          // the CLI does not know if managed identity is actually assigned when EACCES code thrown
          // so show meaningful message since the raw error response could be misleading 
          return Promise.reject('Error while logging with Managed Identity. Please check if a Managed Identity is assigned to the current Azure resource.');
        }
        else {
          throw err;
        }
      }
    }
  }

  private calculateThumbprint(certificate: NodeForge.pki.Certificate): string {
    const nodeForge: typeof NodeForge = require('node-forge');
    const { md, asn1, pki } = nodeForge;

    const messageDigest: NodeForge.md.MessageDigest = md.sha1.create();
    messageDigest.update(asn1.toDer(pki.certificateToAsn1(certificate)).getBytes());
    return messageDigest.digest().toHex();
  }

  public static getResourceFromUrl(url: string): string {
    let resource: string = url;
    const pos: number = resource.indexOf('/', 8);
    if (pos > -1) {
      resource = resource.substr(0, pos);
    }

    if (resource === 'https://api.bap.microsoft.com') {
      // api.bap.microsoft.com is not a valid resource
      // we need to use https://management.azure.com/ instead
      resource = 'https://management.azure.com/';
    }

    return resource;
  }

  private async getServiceConnectionInfo<TConn>(): Promise<TConn> {
    const tokenStorage = this.getTokenStorage();
    const json: string = await tokenStorage.get();
    return JSON.parse(json);
  }

  public storeConnectionInfo(): Promise<void> {
    const tokenStorage = this.getTokenStorage();
    return tokenStorage.set(JSON.stringify(this.service));
  }

  public async clearConnectionInfo(): Promise<void> {
    const tokenStorage = this.getTokenStorage();
    await tokenStorage.remove();
    // we need to manually clear MSAL cache, because MSAL doesn't have support
    // for logging out when using cert-based auth
    const msalCache = this.getMsalCacheStorage();
    await msalCache.remove();
  }

  public getTokenStorage(): TokenStorage {
    return new FileTokenStorage(FileTokenStorage.connectionInfoFilePath());
  }

  private getMsalCacheStorage(): TokenStorage {
    return new FileTokenStorage(FileTokenStorage.msalCacheFilePath());
  }

  public static isAppOnlyAuth(accessToken: string): boolean | undefined {
    let isAppOnlyAuth: boolean | undefined;

    if (!accessToken || accessToken.length === 0) {
      return isAppOnlyAuth;
    }

    const chunks = accessToken.split('.');
    if (chunks.length !== 3) {
      return isAppOnlyAuth;
    }

    const tokenString: string = Buffer.from(chunks[1], 'base64').toString();
    try {
      const token: any = JSON.parse(tokenString);
      isAppOnlyAuth = !token.upn;
    }
    catch {
    }

    return isAppOnlyAuth;
  }
}

export default new Auth();