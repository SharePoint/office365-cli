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
  groupId: string;
}

class AadO365GroupTeamifyCommand extends GraphCommand {
  public get name(): string {
    return commands.O365GROUP_TEAMIFY;
  }

  public get description(): string {
    return 'Creates a new Microsoft Teams team under existing Microsoft 365 group';
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const data: any = {  
      "memberSettings": {
        "allowCreatePrivateChannels": true,
        "allowCreateUpdateChannels": true
      },
      "messagingSettings": {
        "allowUserEditMessages": true,
        "allowUserDeleteMessages": true
      },
      "funSettings": {
        "allowGiphy": true,
        "giphyContentRating": "strict"
      }
    };

    const requestOptions: any = {
      url: `${this.resource}/v1.0/groups/${encodeURIComponent(args.options.groupId)}/team`,
      headers: {
        accept: 'application/json;odata.metadata=none'
      },
      data: data,
      responseType: 'json'
    };

    request
      .put(requestOptions)
      .then(_ => cb(), (err: any) => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-i, --groupId <groupId>'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (!Utils.isValidGuid(args.options.groupId)) {
      return `${args.options.groupId} is not a valid GUID`;
    }

    return true;
  }
}

module.exports = new AadO365GroupTeamifyCommand();