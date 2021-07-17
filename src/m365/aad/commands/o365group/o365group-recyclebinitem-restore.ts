import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import Utils from '../../../../Utils';
import GraphCommand from '../../../base/GraphCommand';
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  id: string;
}

class AadO365GroupRecycleBinItemRestoreCommand extends GraphCommand {
  public get name(): string {
    return commands.O365GROUP_RECYCLEBINITEM_RESTORE;
  }

  public get description(): string {
    return 'Restores a deleted Microsoft 365 Group';
  }

  public alias(): string[] | undefined {
    return [commands.O365GROUP_RESTORE];
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.id = (!(!args.options.id)).toString();
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    if (this.verbose) {
      logger.logToStderr(`Restoring Microsoft 365 Group: ${args.options.id}...`);
    }

    const requestOptions: any = {
      url: `${this.resource}/v1.0/directory/deleteditems/${args.options.id}/restore`,
      headers: {
<<<<<<< HEAD:src/m365/aad/commands/o365group/o365group-recyclebinitem-restore.ts
        'Content-type': 'application/json;odata.metadata=none'
=======
        'Content-type': 'application/json'
>>>>>>> 77bc1e70642158a67473eaa7a076169c77015fc1:src/m365/aad/commands/o365group/o365group-recyclebinitem-restore.ts
      }
    };

    request
      .post(requestOptions)
      .then(_ => cb(), (rawRes: any): void => this.handleRejectedODataJsonPromise(rawRes, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-i, --id <id>'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (!Utils.isValidGuid(args.options.id)) {
      return `${args.options.id} is not a valid GUID`;
    }

    return true;
  }
}

module.exports = new AadO365GroupRecycleBinItemRestoreCommand();