import { Logger } from '../../../../cli';
import { CommandError, CommandOption, CommandTypes } from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import SpoCommand from '../../../base/SpoCommand';
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

export interface  Options extends GlobalOptions {
  webUrl: string;
  listTitle?: string;
  id?: string;
  name?: string;
}

class SpoContentTypeGetCommand extends SpoCommand {
  public get name(): string {
    return commands.CONTENTTYPE_GET;
  }

  public get description(): string {
    return 'Retrieves information about the specified list or site content type';
  }

  public types(): CommandTypes | undefined {
    return {
      string: ['id', 'i']
    };
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    let requestUrl: string = `${args.options.webUrl}/_api/web/${(args.options.listTitle ? `lists/getByTitle('${encodeURIComponent(args.options.listTitle)}')/` : '')}contenttypes`;

    if (args.options.id) {
      requestUrl += `('${encodeURIComponent(args.options.id)}')`;
    }
    else if (args.options.name) {
      requestUrl += `?$filter=Name eq '${encodeURIComponent(args.options.name)}'`;
    }

    const requestOptions: any = {
      url: requestUrl,
      headers: {
        accept: 'application/json;odata=nometadata'
      },
      responseType: 'json'
    };

    request
      .get(requestOptions)
      .then((res: any): void => {
        let errorMessage: string = '';

        if (args.options.name) {
          if (res.value.length === 0) {
            errorMessage = `Content type with name ${args.options.name} not found`;
          }
          else{
            res = res.value[0];
          }
        }

        if (args.options.id && res['odata.null'] === true) {
          errorMessage = `Content type with ID ${args.options.id} not found`;
        }

        if (errorMessage) {
          cb(new CommandError(errorMessage));
          return;
        }

        logger.log(res);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>'
      },
      {
        option: '-l, --listTitle [listTitle]'
      },
      {
        option: '-i, --id [id]'
      },
      {
        option: '-n, --name [name]'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    const isValidSharePointUrl: boolean | string = SpoCommand.isValidSharePointUrl(args.options.webUrl);
    if (isValidSharePointUrl !== true) {
      return isValidSharePointUrl;
    }

    if (args.options.id && args.options.name) {
      return 'Specify id or name, but not both';
    }

    if (!args.options.id && !args.options.name) {
      return 'Specify id or name, one is required';
    }

    return true;
  }
}

module.exports = new SpoContentTypeGetCommand();