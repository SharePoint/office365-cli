import auth from '../../SpoAuth';
import config from '../../../../config';
import commands from '../../commands';
import GlobalOptions from '../../../../GlobalOptions';
import * as request from 'request-promise-native';
import {
  CommandOption,
  CommandValidate
} from '../../../../Command';
import SpoCommand from '../../SpoCommand';
import Utils from '../../../../Utils';
import { Auth } from '../../../../Auth';
import { ContextInfo } from '../../spo';

const vorpal: Vorpal = require('../../../../vorpal-init');

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  webUrl: string;
  listId?: string;
  listTitle?: string;
  viewId?: string;
  viewTitle?: string;
}

class SpoListViewSetCommand extends SpoCommand {
  public allowUnknownOptions(): boolean | undefined {
    return true;
  }

  public get name(): string {
    return commands.LIST_VIEW_SET;
  }

  public get description(): string {
    return 'Updates existing list view';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.listId = typeof args.options.listId !== 'undefined';
    telemetryProps.listTitle = typeof args.options.listTitle !== 'undefined';
    telemetryProps.viewId = typeof args.options.viewId !== 'undefined';
    telemetryProps.viewTitle = typeof args.options.viewTitle !== 'undefined';    
    return telemetryProps;
  }

  public commandAction(cmd: CommandInstance, args: CommandArgs, cb: () => void): void {
    const resource: string = Auth.getResourceFromUrl(args.options.webUrl);
    let siteAccessToken: string = '';
    const baseRestUrl: string = `${args.options.webUrl}/_api/web/lists`;
    const listRestUrl: string = args.options.listId ?
      `(guid'${encodeURIComponent(args.options.listId)}')`
      : `/getByTitle('${encodeURIComponent(args.options.listTitle as string)}')`;
    const viewRestUrl: string = `/views/${(args.options.viewId ? `getById('${encodeURIComponent(args.options.viewId)}')` : `getByTitle('${encodeURIComponent(args.options.viewTitle as string)}')`)}`;

    if (this.debug) {
      cmd.log(`Retrieving access token for ${resource}...`);
    }

    auth
      .getAccessToken(resource, auth.service.refreshToken as string, cmd, this.debug)
      .then((accessToken: string): request.RequestPromise => {
        siteAccessToken = accessToken;

        if (this.debug) {
          cmd.log(`Retrieved access token ${accessToken}. Retrieving request digest...`);
        }

        return this.getRequestDigestForSite(args.options.webUrl, siteAccessToken, cmd, this.debug);
      })
      .then((res: ContextInfo): request.RequestPromise => {
        if (this.debug) {
          cmd.log('Response:');
          cmd.log(res);
          cmd.log('');
        }

        const requestOptions: any = {
          url: `${baseRestUrl}${listRestUrl}${viewRestUrl}`,
          headers: Utils.getRequestHeaders({
            authorization: `Bearer ${siteAccessToken}`,
            'X-RequestDigest': res.FormDigestValue,
            'content-type': 'application/json;odata=nometadata',
            accept: 'application/json;odata=nometadata'
          }),
          json: true,
          body: this.getPayload(args.options)
        };

        if (this.debug) {
          cmd.log('Executing web request...');
          cmd.log(requestOptions);
          cmd.log('');
        }

        return request.patch(requestOptions);
      })
      .then((rawRes: any): void => {
        // request doesn't return any content

        if (this.verbose) {
          cmd.log(vorpal.chalk.green('DONE'));
        }

        cb();
      }, (rawRes: any): void => this.handleRejectedODataJsonPromise(rawRes, cmd, cb));
  }

  private getPayload(options: any): any {
    const payload: any = {};
    const excludeOptions: string[] = [
      'webUrl',
      'listId',
      'listTitle',
      'viewId',
      'viewTitle',
      'debug',
      'verbose',
      'output'
    ];

    Object.keys(options).forEach(key => {
      if (excludeOptions.indexOf(key) === -1) {
        payload[key] = options[key];
      }
    });
    
    return payload;
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>',
        description: 'URL of the site where the list is located'
      },
      {
        option: '--listId [listId]',
        description: 'ID of the list where the view is located. Specify listTitle or listId but not both'
      },
      {
        option: '--listTitle [listTitle]',
        description: 'Title of the list where the view is located. Specify listTitle or listId but not both'
      },
      {
        option: '--viewId [viewId]',
        description: 'ID of the view to update. Specify viewTitle or viewId but not both'
      },
      {
        option: '--viewTitle [viewTitle]',
        description: 'Title of the view to update. Specify viewTitle or viewId but not both'
      },
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(): CommandValidate {
    return (args: CommandArgs): boolean | string => {
      if (!args.options.webUrl) {
        return 'Required parameter webUrl missing';
      }

      const isValidSharePointUrl: boolean | string = SpoCommand.isValidSharePointUrl(args.options.webUrl);
      if (isValidSharePointUrl !== true) {
        return isValidSharePointUrl;
      }

      if (!args.options.listId && !args.options.listTitle) {
        return `Specify listId or listTitle`;
      }

      if (args.options.listId && args.options.listTitle) {
        return `Specify listId or listTitle but not both`;
      }

      if (args.options.listId &&
        !Utils.isValidGuid(args.options.listId)) {
        return `${args.options.listId} in option listId is not a valid GUID`;
      }

      if (!args.options.viewId && !args.options.viewTitle) {
        return `Specify viewId or viewTitle`;
      }

      if (args.options.viewId && args.options.viewTitle) {
        return `Specify viewId or viewTitle but not both`;
      }

      if (args.options.viewId &&
        !Utils.isValidGuid(args.options.viewId)) {
        return `${args.options.viewId} in option viewId is not a valid GUID`;
      }

      return true;
    };
  }

  public commandHelp(args: {}, log: (help: string) => void): void {
    const chalk = vorpal.chalk;
    log(vorpal.find(this.name).helpInformation());
    log(
      `  ${chalk.yellow('Important:')} before using this command, log in to a SharePoint Online site,
    using the ${chalk.blue(commands.LOGIN)} command.
  
  Remarks:
  
    To update a list view, you have to first log in to SharePoint using
    the ${chalk.blue(commands.LOGIN)} command,
    eg. ${chalk.grey(`${config.delimiter} ${commands.LOGIN} https://contoso.sharepoint.com`)}.

    Specify properties to update using their names, eg.
    ${chalk.grey("--Title 'New Title' --JSLink jslink.js")}

    When updating list formatting, the value of the CustomFormatter property
    must be XML-escaped, eg. ${chalk.grey('&lt;')} instead of ${chalk.grey('<')}.
        
  Examples:

    Update the title of the list view specified by its name
      ${chalk.grey(config.delimiter)} ${commands.LIST_VIEW_SET} --webUrl https://contoso.sharepoint.com/sites/project-x --listTitle 'My List' --viewTitle 'All items' --Title 'All events'

    Update the title of the list view specified by its ID
      ${chalk.grey(config.delimiter)} ${commands.LIST_VIEW_SET} --webUrl https://contoso.sharepoint.com/sites/project-x --listTitle 'My List' --viewId 330f29c5-5c4c-465f-9f4b-7903020ae1ce --Title 'All events'
  
    Update view formatting of the specified list view
      ${chalk.grey(config.delimiter)} ${commands.LIST_VIEW_SET} --webUrl https://contoso.sharepoint.com/sites/project-x --listTitle 'My List' --viewTitle 'All items' --CustomFormatter '\`{"schema":"https://developer.microsoft.com/json-schemas/sp/view-formatting.schema.json","additionalRowClass": "=if([$DueDate] &lt;= @now, 'sp-field-severity--severeWarning', '')"}\`'
   `);
  }
}

module.exports = new SpoListViewSetCommand();