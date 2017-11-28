import auth from '../../SpoAuth';
import config from '../../../../config';
import * as request from 'request-promise-native';
import commands from '../../commands';
import VerboseOption from '../../../../VerboseOption';
import {
  CommandHelp,
  CommandOption,
  CommandValidate
} from '../../../../Command';
import SpoCommand from '../../SpoCommand';
import { ContextInfo } from '../../spo';
import Utils from '../../../../Utils';
import { CustomAction } from './customaction';
import Table = require('easy-table');

const vorpal: Vorpal = require('../../../../vorpal-init');

interface CommandArgs {
  options: Options;
}

interface Options extends VerboseOption {
  id: string;
  url: string;
  scope?: string;
}

class SpoCustomActionGetCommand extends SpoCommand {

  public get name(): string {
    return `${commands.CUSTOMACTION_GET}`;
  }

  public get description(): string {
    return 'Gets details for the specified custom action';
  }

  public commandAction(cmd: CommandInstance, args: CommandArgs, cb: () => void): void {
    if (this.verbose) {
      cmd.log(`Retrieving access token for ${auth.service.resource}...`);
    }

    auth
      .ensureAccessToken(auth.service.resource, cmd, this.verbose)
      .then((accessToken: string): Promise<ContextInfo> => {
        if (this.verbose) {
          cmd.log(`Retrieved access token ${accessToken}. Retrieving request digest...`);
        }

        return this.getRequestDigestForSite(args.options.url, accessToken, cmd, this.verbose);
      })
      .then((contextResponse: ContextInfo): Promise<CustomAction> => {
        if (this.verbose) {
          cmd.log('Response:');
          cmd.log(contextResponse);
          cmd.log('');

          cmd.log(`Attempt to get custom action with scope: ${args.options.scope}`);
          cmd.log('');
        }

        if (args.options.scope && args.options.scope.toLowerCase() !== "all") {
          
          return this.getCustomAction(args.options, cmd);
        }
        
        return this.searchAllScopes(args.options, cmd);
      })
      .then((customAction: CustomAction): void => {
        if (this.verbose) {
          cmd.log('Response:');
          cmd.log(customAction);
          cmd.log('');
        }

        if (customAction["odata.null"] === true) {
          cmd.log(`Custom action with id ${args.options.id} not found`);
        }
        else {
          const t: Table = new Table();
          t.cell('Name', customAction.Name);
          t.cell('Id', customAction.Id);
          t.cell('Location', customAction.Location);
          t.cell('Scope', this.humanizeScope(customAction.Scope));
          t.cell('ClientSideComponentId', customAction.ClientSideComponentId);
          t.cell('ClientSideComponentProperties', JSON.stringify(customAction.ClientSideComponentProperties));
          t.newRow();
  
          cmd.log('');
          cmd.log(t.printTransposed({
            separator: ': '
          }));
        }
        cb();
      }, (err: any): void => {
        cmd.log(vorpal.chalk.red(`Error: ${err}`));
        cb();
      });
  }

  protected getCustomAction(options: Options, cmd: CommandInstance): Promise<CustomAction> {

    const requestOptions: any = {
      url: `${options.url}/_api/${options.scope}/UserCustomActions('${encodeURIComponent(options.id)}')`,
      headers: {
        authorization: `Bearer ${auth.service.accessToken}`,
        accept: 'application/json;odata=nometadata'
      },
      json: true
    };

    if (this.verbose) {
      cmd.log('Executing web request...');
      cmd.log(requestOptions);
      cmd.log('');
    }

    return request.get(requestOptions);
  }

  /**
   * Get request with `web` scope is send first. 
   * If custom action not found then 
   * another get request is send with `site` scope.
   */
  protected searchAllScopes(options: Options, cmd: CommandInstance): Promise<CustomAction> {
    return new Promise<CustomAction>((resolve, reject) => {
      options.scope = "Web";
      this.getCustomAction(options, cmd).then((webResult: CustomAction): void => {

        if (this.verbose) {
          cmd.log('getCustomAction with scope of web result...');
          cmd.log(webResult);
          cmd.log('');
        }

        if (webResult["odata.null"] !== true) {
          return resolve(webResult);
        }

        options.scope = "Site";
        this.getCustomAction(options, cmd).then((siteResult: CustomAction): void => {

          if (this.verbose) {
            cmd.log('getCustomAction with scope of site result...');
            cmd.log(siteResult);
            cmd.log('');
          }

          return resolve(siteResult);

        }, (err: any): void => {
          reject(err);
        });
      }, (err: any): void => {
        reject(err);
      });
    });
  }

  protected humanizeScope(scope: number): string {

    switch (scope) {
      case 2:
        return "Site";
      case 3:
        return "Web";
    }

    return `${scope}`;
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-i, --id <id>',
        description: 'Id (Guid) of the custom action to retrieve'
      },
      {
        option: '-u, --url <url>',
        description: 'Url of the site (collection) to retrieve the custom action from'
      },
      {
        option: '-s, --scope [scope]',
        description: 'Scope of the custom action. Allowed values Site|Web|All. Default All',
        autocomplete: ['Site', 'Web', 'All']
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(): CommandValidate {
    return (args: CommandArgs): boolean | string => {

      if (Utils.isValidGuid(args.options.id) === false) {
        return `${args.options.id} is not valid. Custom action id (Guid) expected.`;
      }

      if (SpoCommand.isValidSharePointUrl(args.options.url) !== true) {
        return 'Missing required option url';
      }

      if (args.options.scope) {
        if (args.options.scope !== 'Site' &&
          args.options.scope !== 'Web' &&
          args.options.scope !== 'All') {
          return `${args.options.scope} is not a valid custom action scope. Allowed values are Site|Web|All`;
        }
      }

      return true;
    };
  }

  public help(): CommandHelp {
    return function (args: CommandArgs, log: (help: string) => void): void {
      const chalk = vorpal.chalk;
      log(vorpal.find(commands.CUSTOMACTION_GET).helpInformation());
      log(
        `  ${chalk.yellow('Important:')} before using this command, connect to a SharePoint Online site,
        using the ${chalk.blue(commands.CONNECT)} command.
                      
        Remarks:
      
          To retrieve custom action, you have to first connect to a SharePoint Online site using the
          ${chalk.blue(commands.CONNECT)} command, eg. ${chalk.grey(`${config.delimiter} ${commands.CONNECT} https://contoso.sharepoint.com`)}.
      
        Examples:
        
          ${chalk.grey(config.delimiter)} ${commands.CUSTOMACTION_GET} -i 058140e3-0e37-44fc-a1d3-79c487d371a3 -u https://contoso.sharepoint.com/sites/test
      
          ${chalk.grey(config.delimiter)} ${commands.CUSTOMACTION_GET} --id 058140e3-0e37-44fc-a1d3-79c487d371a3 --url https://contoso.sharepoint.com/sites/test

          ${chalk.grey(config.delimiter)} ${commands.CUSTOMACTION_GET} -i 058140e3-0e37-44fc-a1d3-79c487d371a3 -u https://contoso.sharepoint.com/sites/test -s Site

          ${chalk.grey(config.delimiter)} ${commands.CUSTOMACTION_GET} --id 058140e3-0e37-44fc-a1d3-79c487d371a3 --url https://contoso.sharepoint.com/sites/test --scope Web
            Returns details about the user custom action with ID '058140e3-0e37-44fc-a1d3-79c487d371a3'
            available in the site or site collection.
      
        More information:
      
          UserCustomAction REST API resources:
            https://msdn.microsoft.com/en-us/library/office/dn531432.aspx#bk_UserCustomAction
      `);
    };
  }
}

module.exports = new SpoCustomActionGetCommand();