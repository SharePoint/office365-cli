import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import Command from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import commands from '../../commands';
import Utils from '../../../../Utils';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  userName: string;
  apiKey: string;
  domain?: string
}

class HIBPCommand extends Command {
  public get name(): string {
    return commands.USER_HIBP;
  }

  static readonly HIBP_HOST = 'https://haveibeenpwned.com/api/v3';

  public get description(): string {
    return 'Allows you to retrieve all or accounts from specified domain that have been pwned with the specified username';
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {

    let url: string = `https://haveibeenpwned.com/api/v3/breachedaccount/${args.options.userName}`;
    
    // Filters the result set to only breaches against the domain specified.
    if (args.options.domain) {
      url += `?domain=${args.options.domain}`;
    }

    const requestOptions: any = {
      url: url,
      headers: {
        'accept': 'application/json',
        'hibp-api-key': args.options.apiKey,
        'x-anonymous': true
      },
      responseType: 'json'
    };

    request
      .get(requestOptions)
      .then((res: any): void => {
        logger.log(res);
        cb();
      }, (rawRes: any): void => {
        if (rawRes.response !== undefined && rawRes.response.status === 404) {
          logger.log("\nGood news — no pwnage found!\n");
          cb();
        } 
        else {
          this.handleRejectedPromise(rawRes, logger, cb);
        }
      });
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-n, --userName [userName]'
      },
      {
        option: '--apiKey, [apiKey]'
      },
      {
        option: '--domain, [domain]'
      }
    ];
    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (!args.options.userName) {
      return 'Specify userName';
    }

    if (!Utils.isValidUserPrincipalName(args.options.userName)) {
      return 'Specify valid userName';
    }

    if (!args.options.apiKey) {
      return 'Specify apiKey';
    }

    return true;
  }
}

module.exports = new HIBPCommand();