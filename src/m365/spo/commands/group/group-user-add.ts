import { Cli, CommandOutput, Logger } from '../../../../cli';
import Command, { CommandErrorWithOutput, CommandError, CommandOption } from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import SpoCommand from '../../../base/SpoCommand';
import * as SpoUserGetCommand from '../../../spo/commands/user/user-get';
import { Options as SpoUserGetCommandOptions } from '../../../spo/commands/user/user-get';
import commands from '../../commands';
import { SharingResult } from './SharingResult';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  webUrl: string;
  groupId: number;
  userName: string;
}

class SpoGroupUserAddCommand extends SpoCommand {

  public get name(): string {
    return commands.GROUP_USER_ADD;
  }

  public get description(): string {
    return 'Adds user to a SharePoint Group';
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    this.getOnlyActiveUsers(args, logger)
      .then((resolvedUsernameList: string[]): Promise<SharingResult> => {
        if (this.verbose) {
          logger.logToStderr(`Start adding Active user/s to SharePoint Group ${args.options.groupId}...`);
        }

        const data: any = {
          url: args.options.webUrl,
          peoplePickerInput: this.getFormattedUserList(resolvedUsernameList),
          roleValue: `group:${args.options.groupId}`
        };    
        const requestOptions: any = {
          url: `${args.options.webUrl}/_api/SP.Web.ShareObject`,
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose'
          },
          data: data,
          responseType: 'json'
        };
    
        return request.post<SharingResult>(requestOptions);
      })
      .then((sharingResult: SharingResult): void => {
        if (sharingResult.ErrorMessage !== null) {
          return cb(new CommandError(sharingResult.ErrorMessage));
        }
        logger.log(sharingResult.UsersAddedToGroup);

        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  private getOnlyActiveUsers(args: CommandArgs, logger: Logger): Promise<string[]> {
    if (this.verbose) {
      logger.logToStderr(`Removing Users which are not active from the original list`);
    }

    const activeUsernamelist: string[] = [];    
    return Promise.all(args.options.userName.split(",").map(singleUsername => {
      const options: SpoUserGetCommandOptions = {
        webUrl: args.options.webUrl,
        id: undefined,
        email: singleUsername.trim(),
        output: 'json',
        debug: args.options.debug,
        verbose: args.options.verbose
      };
      return Cli.executeCommandWithOutput(SpoUserGetCommand as Command, { options: { ...options, _: [] } })
        .then((getUserGetOutput: CommandOutput): void => {
          if (this.debug) {
            logger.logToStderr(getUserGetOutput.stderr);
          }
                    
          activeUsernamelist.push(JSON.parse(getUserGetOutput.stdout).UserPrincipalName);
        }, (err: CommandErrorWithOutput) => {
          if (this.debug) {
            logger.logToStderr(err.stderr);
          }
        });
    }))
      .then((): Promise<string[]> => {
        return Promise.resolve(activeUsernamelist);
      });
  }

  private getFormattedUserList(activeUserList: string[]): any {
    const generatedPeoplePicker: any = JSON.stringify(activeUserList.map(singleUsername => {
      return { Key: singleUsername.trim() };
    }));
    return generatedPeoplePicker;
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>'
      },
      {
        option: '--groupId <groupId>'
      },
      {
        option: '--userName <userName>'
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

    if (typeof args.options.groupId !== 'number') {
      return `Group Id : ${args.options.groupId} is not a number`;
    }

    return true;
  }
}

module.exports = new SpoGroupUserAddCommand();