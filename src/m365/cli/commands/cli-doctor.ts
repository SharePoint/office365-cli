import { Logger } from '../../../cli';
import commands from '../commands';
import auth, { AuthType } from '../../../Auth';
import * as os from 'os';
import Command from '../../../Command';
import Utils from '../../../Utils';
const packageJSON = require('../../../../package.json');

interface CliDiagnosticInfo {
  os: {
    platform: string;
    version: string;
    release: string;
  };
  authMode: string;
  cliAadAppId: string;
  cliAadAppTenant: string;
  cliEnvironment: string;
  nodeVersion: string;
  cliVersion: string;
  roles:string[];
  scopes:string[];
}

class CliDoctorCommand extends Command {
  public get name(): string {
    return commands.DOCTOR;
  }

  public get description(): string {
    return 'Retrieves diagnostic information about the current environment';
  }

  public commandAction(logger: Logger, args: any, cb: (err?: any) => void): void {

    const roles:string[] = [];
    const scopes:string[] = [];
    
    Object.keys(auth.service.accessTokens).forEach((tokenKey) => {
      const accessToken:string = auth.service.accessTokens[tokenKey].accessToken;

      this.getRolesFromAccessToken(accessToken).forEach(role => roles.push(role));
      this.getScopesFromAccessToken(accessToken).forEach(scope => scopes.push(scope));
    });
    
    const diagnosticInfo: CliDiagnosticInfo = {
      os: {
        platform: os.platform(),
        version: os.version(),
        release: os.release()
      },
      cliVersion: packageJSON.version,
      nodeVersion: process.version,
      cliAadAppId: auth.service.appId,
      cliAadAppTenant: Utils.isValidGuid(auth.service.tenant) ? "single" : auth.service.tenant,
      authMode: AuthType[auth.service.authType],
      cliEnvironment: process.env.CLIMICROSOFT365_ENV ? process.env.CLIMICROSOFT365_ENV : "",
      roles:roles,
      scopes:scopes
    };

    logger.log(diagnosticInfo);
    cb();
  }

  private getRolesFromAccessToken(accessToken: string): string[] {
    let roles: string[] = [];

    if (!accessToken || accessToken.length === 0) {
      return roles;
    }

    const chunks = accessToken.split('.');
    if (chunks.length !== 3) {
      return roles;
    }

    const tokenString: string = Buffer.from(chunks[1], 'base64').toString();
    const token: any = JSON.parse(tokenString);
    if(token.roles !== undefined){
      roles = token.roles;
    }

    return roles;
  }

  private getScopesFromAccessToken(accessToken: string): string[] {
    let scopes: string[] = [];

    if (!accessToken || accessToken.length === 0) {
      return scopes;
    }

    const chunks = accessToken.split('.');
    if (chunks.length !== 3) {
      return scopes;
    }

    const tokenString: string = Buffer.from(chunks[1], 'base64').toString();
    
    const token: any = JSON.parse(tokenString);
    if(token.scp?.length > 0){
      scopes = token.scp.split(' ');
    }

    return scopes;
  }
}

module.exports = new CliDoctorCommand();