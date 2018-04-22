import auth from '../../SpoAuth';
import config from '../../../../config';
import commands from '../../commands';
import * as request from 'request-promise-native';
import GlobalOptions from '../../../../GlobalOptions';
import {CommandOption,
  CommandValidate, CommandError
} from '../../../../Command';
import SpoCommand from '../../SpoCommand';
import Utils from '../../../../Utils';
import { GetClientSideWebPartsRsp } from './GetClientSideWebPartsRsp';
const vorpal: Vorpal = require('../../../../vorpal-init');

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  webUrl: string;
}

class SpoWebClientSideWebPart extends SpoCommand {
  
  public get name(): string {
    return commands.WEB_CLIENTSIDEWEBPART_LIST;
  }

  public get description(): string {
    return 'Lists available client-side web parts';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    
    return telemetryProps;
  }

  public commandAction(cmd: CommandInstance, args: CommandArgs, cb: () => void): void {
    auth
    .getAccessToken(auth.service.resource, auth.service.refreshToken as string, cmd, this.debug)
    .then((): request.RequestPromise => {
      const requestOptions: any = {
        url: `${args.options.webUrl}/_api/web/GetClientSideWebParts`,
        headers: Utils.getRequestHeaders({
          authorization: `Bearer ${auth.service.accessToken}`,
          accept: 'application/json;odata=nometadata'
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
    .then((res: GetClientSideWebPartsRsp): void => {
      if (this.debug) {
        cmd.log('Response:')
        cmd.log(res);
        cmd.log('');
      }

      let clientSideWebparts : any[] = [];
      res.value.forEach(component => {
        if(component.ComponentType === 1)
        {
          clientSideWebparts.push(
            { 
              Id : component.Id.replace("{","").replace("}",""),
              Name : component.Name,
              Title : JSON.parse(component.Manifest).preconfiguredEntries[0].title.default
            });
        }
      });

      if(clientSideWebparts.length == 0) {
        cmd.log(new CommandError("No client side webparts could be returned for this web."));
      }
    
      cmd.log(clientSideWebparts);

      cb();
    },(err: any): 
      void => 
      this.handleRejectedODataJsonPromise(err, cmd, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>',
        description: 'URL of the site for which to retrieve the information'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(): CommandValidate {
    return (args: CommandArgs): boolean | string => {
      if(!args.options.webUrl)
      {
        return 'Required option webUrl missing';
      }
      else {
        const isValidSharePointUrl: boolean | string = SpoCommand.isValidSharePointUrl(args.options.webUrl);
        if (isValidSharePointUrl !== true) {
          return isValidSharePointUrl;
        }
      }
      return true;
    };
  }

  public commandHelp(args: {}, log: (help: string) => void): void {
    const chalk = vorpal.chalk;
    log(vorpal.find(this.name).helpInformation());
    log(
      `  ${chalk.yellow('Important:')} before using this command, connect to a SharePoint Online site,
      using the ${chalk.blue(commands.CONNECT)} command.

    Remarks:
    
      To get the list of available ClientSideWebpart, you have to first connect to SharePoint using the
      ${chalk.blue(commands.CONNECT)} command, eg. ${chalk.grey(`${config.delimiter} ${commands.CONNECT} https://contoso.sharepoint.com`)}.
    
    Examples:
      Lists all the available clientsidewebparts for the web
      ${chalk.grey(config.delimiter)} ${commands.WEB_CLIENTSIDEWEBPART_LIST} --u https://contoso.sharepoint.com

    ` );
  }
}

module.exports = new SpoWebClientSideWebPart();