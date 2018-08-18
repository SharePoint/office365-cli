import auth from '../../GraphAuth';
import config from '../../../../config';
import commands from '../../commands';
import GlobalOptions from '../../../../GlobalOptions';
import {
  CommandOption, CommandValidate
} from '../../../../Command';
import { Team } from './Team';
import { GraphItemsListCommand } from '../GraphItemsListCommand';
import * as request from 'request-promise-native';
import Utils from '../../../../Utils';

const vorpal: Vorpal = require('../../../../vorpal-init');

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  joined?: boolean;
}

class TeamsListCommand extends GraphItemsListCommand<Team> {
  public get name(): string {
    return `${commands.TEAMS_LIST}`;
  }

  public get description(): string {
    return 'Lists joined Microsoft Teams in the current tenant';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.joined = args.options.joined;
    return telemetryProps;
  }

  public commandAction(cmd: CommandInstance, args: CommandArgs, cb: () => void): void {

    let endpoint: string = `${auth.service.resource}/beta/groups?$filter=resourceProvisioningOptions/Any(x:x eq 'Team')`;
    if (args.options.joined) {
      endpoint = `${auth.service.resource}/beta/me/joinedTeams`;
    }
    this
      .getAllItems(endpoint, cmd, true)
      .then((): Promise<any> => {
        if (args.options.joined) {
          return Promise.resolve();
        } else {
          return Promise.all(this.items.map(g => this.getTeamFromGroup(g, cmd)));
        }
      })
      .then((res?: Team[]): void => {
        if (res) {
          this.items = res;

        }

        if (args.options.output === 'json') {
          cmd.log(this.items);
        }
        else {
          cmd.log(this.items.map(g => {
            const team: any = {
              id: g.id,
              displayName: g.displayName,
              description: g.description,
              isArchived: g.isArchived
            };
            return team;
          }));
        }

        if (this.verbose) {
          cmd.log(vorpal.chalk.green('DONE'));
        }

        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, cmd, cb));
  }

  private getTeamFromGroup(group: { id: string, displayName: string, description: string }, cmd: CommandInstance): Promise<Team> {
    return new Promise<Team>((resolve: (team: Team) => void, reject: (error: any) => void): void => {
      auth
        .ensureAccessToken(auth.service.resource, cmd, this.debug)
        .then((): request.RequestPromise => {
          const requestOptions: any = {
            url: `${auth.service.resource}/beta/teams/${group.id}`,
            headers: Utils.getRequestHeaders({
              authorization: `Bearer ${auth.service.accessToken}`,
              accept: 'application/json;odata.metadata=none'
            }),
            json: true
          };

          if (this.debug) {
            cmd.log('Executing web request...');
            cmd.log(requestOptions);
            cmd.log('');
          }

          return request.get(requestOptions);
        })
        .then((res: any): void => {
          resolve({
            id: group.id,
            displayName: group.displayName,
            isArchived: res.isArchived,
            description: group.description
          });
        }, (err: any): void => {
          // If they user is not member of the team he/she cannot acces it
          if (err.statusCode == 403) {
            resolve({
              id: group.id,
              displayName: group.displayName,
              isArchived: undefined,
              description: group.description
            })
          } else {


            reject(err);
          }
        });
    });
  }


  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-j, --joined',
        description: 'Retrieve only joined teams'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(): CommandValidate {
    return (args: CommandArgs): boolean | string => {
      return true;
    };
  }

  public commandHelp(args: {}, log: (help: string) => void): void {
    const chalk = vorpal.chalk;
    log(vorpal.find(this.name).helpInformation());
    log(
      `  ${chalk.yellow('Important:')} before using this command, connect to the Microsoft Graph
    using the ${chalk.blue(commands.CONNECT)} command.
        
  Remarks:

    To list available Microsoft Teams, you have to first connect to
    the Microsoft Graph using the ${chalk.blue(commands.CONNECT)} command,
    eg. ${chalk.grey(`${config.delimiter} ${commands.CONNECT}`)}.

    You can only see details or archived status on Microsoft Teams you are a member of

  Examples:
  
    List all Microsoft Teams in the tenant
      ${chalk.grey(config.delimiter)} ${this.name}

    List all Microsoft Teams in the tenant you are a member of
      ${chalk.grey(config.delimiter)} ${this.name} --joined
`);
  }
}

module.exports = new TeamsListCommand();