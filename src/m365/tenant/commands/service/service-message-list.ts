import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandOption } from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  workload: string;
}

class TenantServiceMessageListCommand extends Command {
  public get name(): string {
    return commands.SERVICE_MESSAGE_LIST;
  }

  public get description(): string {
    return 'Gets service messages Microsoft 365';
  }

  public defaultProperties(): string[] | undefined {
    return ['Workload', 'Id', 'Message'];
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    if (this.verbose) {
      logger.logToStderr(`Getting service messages...`);
    }

    const serviceUrl: string = 'https://manage.office.com/api/v1.0';
    const statusEndpoint: string = args.options.workload ? `ServiceComms/Messages?$filter=Workload eq '${encodeURIComponent(args.options.workload)}'` : 'ServiceComms/Messages';
    const tenantId: string = Utils.getTenantIdFromAccessToken(auth.service.accessTokens[auth.defaultResource].accessToken);

    const requestOptions: any = {
      url: `${serviceUrl}/${tenantId}/${statusEndpoint}`,
      headers: {
        accept: 'application/json;odata.metadata=none'
      },
      responseType: 'json'
    };

    request
      .get<{ value: any[] }>(requestOptions)
      .then((res: { value: any[] }): void => {
        res.value.forEach(r => {
          r.Workload = r.Id.startsWith('MC') ? r.AffectedWorkloadDisplayNames.join(', ') : r.Workload;
          r.Id = r.Id;
          r.Message = r.Id.startsWith('MC') ? r.Title : r.ImpactDescription;
        });

        logger.log(res.value);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-w, --workload [workload]	'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
}

module.exports = new TenantServiceMessageListCommand();