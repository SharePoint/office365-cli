import Command, { CommandAction, CommandError } from '../../Command';
import auth from './SpoAuth';
import { SearchResponse, FormDigestInfo, ClientSvcResponse, ClientSvcResponseContents } from './spo';
import * as request from 'request-promise-native';
import Utils from '../../Utils';
import { SpoOperation } from './commands/site/SpoOperation';
import config from '../../config';


export default abstract class SpoCommand extends Command {
  protected requiresTenantAdmin(): boolean {
    return false;
  }

  public action(): CommandAction {
    const cmd: SpoCommand = this;

    return function (this: CommandInstance, args: any, cb: (err?: any) => void) {
      auth
        .restoreAuth()
        .then((): void => {
          cmd.initAction(args);

          if (!auth.site.connected) {
            cb(new CommandError('Log in to a SharePoint Online site first'));
            return;
          }

          if (cmd.requiresTenantAdmin()) {
            if (!auth.site.isTenantAdminSite()) {
              cb(new CommandError(`${auth.site.url} is not a tenant admin site. Log in to your tenant admin site and try again`));
              return;
            }
          }

          cmd.commandAction(this, args, cb);
        }, (error: any): void => {
          cb(new CommandError(error));
        });
    }
  }

  protected getRequestDigest(cmd: CommandInstance, debug: boolean): request.RequestPromise {
    return this.getRequestDigestForSite(auth.site.url, auth.site.accessToken, cmd, debug);
  }

  protected getRequestDigestForSite(siteUrl: string, accessToken: string, cmd: CommandInstance, debug: boolean): request.RequestPromise {
    const requestOptions: any = {
      url: `${siteUrl}/_api/contextinfo`,
      headers: Utils.getRequestHeaders({
        authorization: `Bearer ${accessToken}`,
        accept: 'application/json;odata=nometadata'
      }),
      json: true
    };

    if (debug) {
      cmd.log('Executing web request...');
      cmd.log(requestOptions);
      cmd.log('');
    }

    return request.post(requestOptions);
  }

  public static isValidSharePointUrl(url: string): boolean | string {
    if (!url) {
      return false;
    }

    if (url.indexOf('https://') !== 0 ||
      url.indexOf('.sharepoint.com') === -1) {
      return `${url} is not a valid SharePoint Online site URL`;
    }
    else {
      return true;
    }
  }

  protected getTenantAppCatalogUrl(cmd: CommandInstance, debug: boolean): Promise<string> {
    return new Promise<string>((resolve: (appCatalogUrl: string) => void, reject: (error: any) => void): void => {
      const requestOptions: any = {
        url: `${auth.site.url}/_api/search/query?querytext='contentclass:STS_Site%20AND%20SiteTemplate:APPCATALOG'&SelectProperties='SPWebUrl'`,
        headers: Utils.getRequestHeaders({
          authorization: `Bearer ${auth.site.accessToken}`,
          accept: 'application/json;odata=nometadata'
        }),
        json: true
      };

      if (debug) {
        cmd.log('Executing web request...');
        cmd.log(requestOptions);
        cmd.log('');
      }

      request
        .get(requestOptions)
        .then((res: SearchResponse): void => {
          if (debug) {
            cmd.log('Response');
            cmd.log(res);
            cmd.log('');
          }

          if (res.PrimaryQueryResult.RelevantResults.RowCount < 1) {
            reject('Tenant app catalog not found');
            return;
          }

          for (let i: number = 0; i < res.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells.length; i++) {
            if (res.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells[i].Key === 'SPWebUrl') {
              resolve(res.PrimaryQueryResult.RelevantResults.Table.Rows[0].Cells[i].Value);
              return;
            }
          }

          reject('Tenant app catalog URL not found');
        }, (error: any): void => {
          if (debug) {
            cmd.log('Error');
            cmd.log(error);
            cmd.log('');
          }

          reject(error);
        });
    });
  }

  protected ensureFormDigest(cmd: CommandInstance, context: FormDigestInfo): Promise<FormDigestInfo> {
    return new Promise<FormDigestInfo>((reject: (error: any) => void): void => {
      if (this.isUnexpiredFormDigest(context)) {

        if (this.debug) {
          cmd.log('Existing form digest still valid');
        }

        Promise.resolve(context);
      }

      this
        .getRequestDigest(cmd, this.debug)
        .then((res: FormDigestInfo): void => {
          if (this.debug) {
            cmd.log('Response:');
            cmd.log(res);
            cmd.log('');
          }

          context.FormDigestValue = res.FormDigestValue;
          context.FormDigestTimeoutSeconds = res.FormDigestTimeoutSeconds
          context.FormDigestExpiresAt = new Date();
          context.FormDigestExpiresAt.setSeconds(context.FormDigestExpiresAt.getSeconds() + res.FormDigestTimeoutSeconds - 5);

          Promise.resolve(context);
        }, (error: any): void => {
          reject(error);
        });
    });
  }


  private isUnexpiredFormDigest(contextinfo: FormDigestInfo): boolean {
    const now: Date = new Date();
    if (contextinfo.FormDigestValue &&
      now < (contextinfo.FormDigestExpiresAt as Date)) {

      return true;
    }

    return false;
  }

  protected waitUntilFinished(operationId: string, resolve: () => void, reject: (error: any) => void, accessToken: string, cmd: CommandInstance, currentContext: FormDigestInfo, dots?: string, timeout?: NodeJS.Timer): void {
    this
      .ensureFormDigest(cmd, currentContext)
      .then((res: FormDigestInfo): request.RequestPromise => {
        currentContext = res;

        if (this.debug) {
          cmd.log(`Checking if operation ${operationId} completed...`);
        }

        if (!this.debug && this.verbose) {
          dots += '.';
          process.stdout.write(`\r${dots}`);
        }

        const requestOptions: any = {
          url: `${auth.site.url}/_vti_bin/client.svc/ProcessQuery`,
          headers: Utils.getRequestHeaders({
            authorization: `Bearer ${auth.service.accessToken}`,
            'X-RequestDigest': currentContext.FormDigestValue
          }),
          body: `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="${config.applicationName}" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><Query Id="188" ObjectPathId="184"><Query SelectAllProperties="false"><Properties><Property Name="IsComplete" ScalarProperty="true" /><Property Name="PollingInterval" ScalarProperty="true" /></Properties></Query></Query></Actions><ObjectPaths><Identity Id="184" Name="${operationId.replace(/\\n/g, '&#xA;').replace(/"/g, '')}" /></ObjectPaths></Request>`
        };

        if (this.debug) {
          cmd.log('Executing web request...');
          cmd.log(requestOptions);
          cmd.log('');
        }

        return request.post(requestOptions);
      })
      .then((res: string): void => {
        if (this.debug) {
          cmd.log('Response:');
          cmd.log(res);
          cmd.log('');
        }

        const json: ClientSvcResponse = JSON.parse(res);
        const response: ClientSvcResponseContents = json[0];
        if (response.ErrorInfo) {
          reject(response.ErrorInfo.ErrorMessage);
        }
        else {
          const operation: SpoOperation = json[json.length - 1];
          let isComplete: boolean = operation.IsComplete;
          if (isComplete) {
            if (this.verbose) {
              process.stdout.write('\n');
            }

            resolve();
            return;
          }

          timeout = setTimeout(() => {
            this.waitUntilFinished(JSON.stringify(operation._ObjectIdentity_), resolve, reject, accessToken, cmd, currentContext, dots);
          }, operation.PollingInterval);
        }
      });
  }
}