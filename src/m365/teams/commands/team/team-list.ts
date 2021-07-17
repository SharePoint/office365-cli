import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import { GraphItemsListCommand } from '../../../base/GraphItemsListCommand';
import commands from '../../commands';
import { Team } from '../../Team';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  joined?: boolean;
}

class TeamsTeamListCommand extends GraphItemsListCommand<Team> {
  public get name(): string {
    return commands.TEAM_LIST;
  }

  public get description(): string {
    return 'Lists Microsoft Teams in the current tenant';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.joined = args.options.joined;
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    let endpoint: string = `${this.resource}/beta/groups?$filter=resourceProvisioningOptions/Any(x:x eq 'Team')&$select=id,displayName,description`;
    if (args.options.joined) {
      endpoint = `${this.resource}/v1.0/me/joinedTeams`;
    }
    this
      .getAllItems(endpoint, logger, true)
      .then((): Promise<any> => {
        if (args.options.joined) {
          return Promise.resolve();
        }
        else {
          return Promise.all(this.items.map(g => this.getTeamFromGroup(g)));
        }
      })
      .then((res?: Team[]): void => {
        if (res) {
          this.items = res;
        }

        logger.log(this.items);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  private getTeamFromGroup(group: { id: string, displayName: string, description: string }): Promise<Team> {
    return new Promise<Team>((resolve: (team: Team) => void, reject: (error: any) => void): void => {
      const requestOptions: any = {
        url: `${this.resource}/v1.0/teams/${group.id}`,
        headers: {
          accept: 'application/json;odata.metadata=none'
        },
        responseType: 'json'
      };

      request
        .get(requestOptions)
        .then((res: any): void => {
          resolve({
            id: group.id,
            displayName: group.displayName,
            isArchived: res.isArchived,
            description: group.description
          });
        }, (err: any): void => {
          // If the user is not member of the team he/she cannot access it
          if (err.statusCode === 403) {
            resolve({
              id: group.id,
              displayName: group.displayName,
              description: group.description,
              isArchived: undefined
            });
          }
          else {
            reject(err);
          }
        });
    });
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-j, --joined'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
}

module.exports = new TeamsTeamListCommand();