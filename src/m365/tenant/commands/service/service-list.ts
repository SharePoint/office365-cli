import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';

class TenantServiceListCommand extends Command {
  public get name(): string {
    return commands.SERVICE_LIST;
  }

  public get description(): string {
    return 'Gets services available in Microsoft 365';
  }

  public defaultProperties(): string[] | undefined {
    return ['Id', 'DisplayName'];
  }

  public commandAction(logger: Logger, args: any, cb: (err?: any) => void): void {
    if (this.verbose) {
      logger.logToStderr(`Getting the health status of the different services in Microsoft 365.`);
    }

    const serviceUrl: string = 'https://manage.office.com/api/v1.0';
    const statusEndpoint: string = 'ServiceComms/Services';

    const tenantId = Utils.getTenantIdFromAccessToken(auth.service.accessTokens[auth.defaultResource].accessToken);

    const requestOptions: any = {
      url: `${serviceUrl}/${tenantId}/${statusEndpoint}`,
      headers: {
        accept: 'application/json;odata.metadata=none'
      },
      responseType: 'json'
    };

    request
      .get(requestOptions)
      .then((res: any): void => {
        logger.log(res.value);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }
}

module.exports = new TenantServiceListCommand();