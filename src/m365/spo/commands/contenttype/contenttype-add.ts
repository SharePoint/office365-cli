import { Cli, CommandOutput, Logger } from '../../../../cli';
import Command, { CommandError, CommandErrorWithOutput, CommandOption, CommandTypes } from '../../../../Command';
import config from '../../../../config';
import GlobalOptions, { Output } from '../../../../GlobalOptions';
import request from '../../../../request';
import Utils from '../../../../Utils';
import SpoCommand from '../../../base/SpoCommand';
import commands from '../../commands';
import * as SpoContentTypeGetCommand from './contenttype-get';
import { Options as SpoContentTypeGetCommandOptions } from './contenttype-get';
import { ClientSvcResponse, ClientSvcResponseContents, ContextInfo } from '../../spo';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  webUrl: string;
  listTitle?: string;
  name: string;
  id: string;
  description?: string;
  group?: string;
}

class SpoContentTypeAddCommand extends SpoCommand {
  public get name(): string {
    return commands.CONTENTTYPE_ADD;
  }

  public get description(): string {
    return 'Adds a new list or site content type';
  }

  public types(): CommandTypes | undefined {
    return {
      string: ['id', 'i']
    };
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    let parentInfo: string = '';

    this
      .getParentInfo(args.options.listTitle, args.options.webUrl, logger)
      .then((parent: string): Promise<ContextInfo> => {
        parentInfo = parent;

        if (this.verbose) {
          logger.logToStderr(`Retrieving request digest...`);
        }

        return this.getRequestDigest(args.options.webUrl);
      })
      .then((res: ContextInfo): Promise<string> => {
        const description: string = args.options.description ?
          `<Property Name="Description" Type="String">${Utils.escapeXml(args.options.description)}</Property>` :
          '<Property Name="Description" Type="Null" />';
        const group: string = args.options.group ?
          `<Property Name="Group" Type="String">${Utils.escapeXml(args.options.group)}</Property>` :
          '<Property Name="Group" Type="Null" />';

        const requestOptions: any = {
          url: `${args.options.webUrl}/_vti_bin/client.svc/ProcessQuery`,
          headers: {
            'X-RequestDigest': res.FormDigestValue
          },
          data: `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="${config.applicationName}" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="8" ObjectPathId="7" /><ObjectPath Id="10" ObjectPathId="9" /><ObjectIdentityQuery Id="11" ObjectPathId="9" /></Actions><ObjectPaths><Property Id="7" ParentId="5" Name="ContentTypes" /><Method Id="9" ParentId="7" Name="Add"><Parameters><Parameter TypeId="{168f3091-4554-4f14-8866-b20d48e45b54}">${description}${group}<Property Name="Id" Type="String">${Utils.escapeXml(args.options.id)}</Property><Property Name="Name" Type="String">${Utils.escapeXml(args.options.name)}</Property><Property Name="ParentContentType" Type="Null" /></Parameter></Parameters></Method>${parentInfo}</ObjectPaths></Request>`
        };

        return request.post(requestOptions);
      })
      .then((res: string): void => {
        const json: ClientSvcResponse = JSON.parse(res);
        const response: ClientSvcResponseContents = json[0];
        if (response.ErrorInfo) {
          cb(new CommandError(response.ErrorInfo.ErrorMessage));
          return;
        }

        const options: SpoContentTypeGetCommandOptions = {
          webUrl: args.options.webUrl,
          listTitle: args.options.listTitle,
          id: args.options.id,
          output: args.options.output,
          debug: this.debug,
          verbose: this.verbose
        };
        Cli.executeCommandWithOutput(SpoContentTypeGetCommand as Command, { options: { ...options, _: [] } })
          .then((res: CommandOutput): void => {
            if (this.debug) {
              logger.logToStderr(res.stderr);
            }
            let result = res.stdout;
            if (options.output === Output[Output.json]) {
              result = JSON.parse(result);
            }

            logger.log(result);
            cb();
          }, (err: CommandErrorWithOutput) => {
            cb(err.error);
          });
        return;
      }, (err: any): void => this.handleRejectedPromise(err, logger, cb));
  }

  private getParentInfo(listTitle: string | undefined, webUrl: string, logger: Logger): Promise<string> {
    return new Promise<string>((resolve: (parentInfo: string) => void, reject: (error: any) => void): void => {
      if (!listTitle) {
        resolve('<Property Id="5" ParentId="3" Name="Web" /><StaticProperty Id="3" TypeId="{3747adcd-a3c3-41b9-bfab-4a64dd2f1e0a}" Name="Current" />');
        return;
      }

      let siteId: string = '';
      let webId: string = '';

      ((): Promise<{ Id: string; }> => {
        if (this.verbose) {
          logger.logToStderr(`Retrieving site collection id...`);
        }

        const requestOptions: any = {
          url: `${webUrl}/_api/site?$select=Id`,
          headers: {
            accept: 'application/json;odata=nometadata'
          },
          responseType: 'json'
        };

        return request.get(requestOptions);
      })()
        .then((res: { Id: string }): Promise<{ Id: string; }> => {
          siteId = res.Id;

          if (this.verbose) {
            logger.logToStderr(`Retrieving site id...`);
          }

          const requestOptions: any = {
            url: `${webUrl}/_api/web?$select=Id`,
            headers: {
              accept: 'application/json;odata=nometadata'
            },
            responseType: 'json'
          };

          return request.get(requestOptions);
        })
        .then((res: { Id: string }): Promise<{ Id: string; }> => {
          webId = res.Id;

          if (this.verbose) {
            logger.logToStderr(`Retrieving list id...`);
          }

          const requestOptions: any = {
            url: `${webUrl}/_api/web/lists/getByTitle('${encodeURIComponent(listTitle)}')?$select=Id`,
            headers: {
              accept: 'application/json;odata=nometadata'
            },
            responseType: 'json'
          };

          return request.get(requestOptions);
        })
        .then((res: { Id: string }): void => {
          resolve(`<Identity Id="5" Name="1a48869e-c092-0000-1f61-81ec89809537|740c6a0b-85e2-48a0-a494-e0f1759d4aa7:site:${siteId}:web:${webId}:list:${res.Id}" />`);
        }, (error: any): void => {
          reject(error);
        });
    });
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
        option: '-i, --id <id>'
      },
      {
        option: '-n, --name <name>'
      },
      {
        option: '-d, --description [description]'
      },
      {
        option: '-g, --group [group]'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    return SpoCommand.isValidSharePointUrl(args.options.webUrl);
  }
}

module.exports = new SpoContentTypeAddCommand();