import { Logger } from '../../../../cli';
import {
  CommandOption,
  CommandTypes
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import Utils from '../../../../Utils';
import SpoCommand from '../../../base/SpoCommand';
import commands from '../../commands';
import { ContextInfo } from '../../spo';
import { ListItemInstanceCollection } from './ListItemInstanceCollection';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  id?: string;
  fields?: string;
  filter?: string;
  pageNumber?: string;
  pageSize?: string;
  camlQuery?: string;
  title?: string;
  webUrl: string;
}

class SpoListItemListCommand extends SpoCommand {
  public get name(): string {
    return commands.LISTITEM_LIST;
  }

  public get description(): string {
    return 'Gets a list of items from the specified list';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.id = typeof args.options.id !== 'undefined';
    telemetryProps.title = typeof args.options.title !== 'undefined';
    telemetryProps.fields = typeof args.options.fields !== 'undefined';
    telemetryProps.filter = typeof args.options.filter !== 'undefined';
    telemetryProps.pageNumber = typeof args.options.pageNumber !== 'undefined';
    telemetryProps.pageSize = typeof args.options.pageSize !== 'undefined';
    telemetryProps.camlQuery = typeof args.options.camlQuery !== 'undefined';
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const listIdArgument = args.options.id || '';
    const listTitleArgument = args.options.title || '';

    let formDigestValue: string = '';

    const fieldsArray: string[] = args.options.fields ? args.options.fields.split(",")
      : (!args.options.output || args.options.output === "text") ? ["Title", "Id"] : [];

    const listRestUrl: string = (args.options.id ?
      `${args.options.webUrl}/_api/web/lists(guid'${encodeURIComponent(listIdArgument)}')`
      : `${args.options.webUrl}/_api/web/lists/getByTitle('${encodeURIComponent(listTitleArgument)}')`);

    ((): Promise<any> => {
      if (args.options.camlQuery) {
        if (this.debug) {
          logger.logToStderr(`getting request digest for query request`);
        }

        return this.getRequestDigest(args.options.webUrl);
      }
      else {
        return Promise.resolve();
      }
    })()
      .then((res: ContextInfo): Promise<any> => {
        formDigestValue = args.options.camlQuery ? res.FormDigestValue : '';

        if (args.options.pageNumber && Number(args.options.pageNumber) > 0) {
          const rowLimit: string = `$top=${Number(args.options.pageSize) * Number(args.options.pageNumber)}`;
          const filter: string = args.options.filter ? `$filter=${encodeURIComponent(args.options.filter)}` : ``;
          const fieldSelect: string = `?$select=Id&${rowLimit}&${filter}`;

          const requestOptions: any = {
            url: `${listRestUrl}/items${fieldSelect}`,
            headers: {
              'accept': 'application/json;odata=nometadata',
              'X-RequestDigest': formDigestValue
            },
            responseType: 'json'
          };

          return request.get(requestOptions);
        }
        else {
          return Promise.resolve();
        }
      })
      .then((res: any): Promise<ListItemInstanceCollection> => {
        const skipTokenId = (res && res.value && res.value.length && res.value[res.value.length - 1]) ? res.value[res.value.length - 1].Id : 0;
        const skipToken: string = (args.options.pageNumber && Number(args.options.pageNumber) > 0 && skipTokenId > 0) ? `$skiptoken=Paged=TRUE%26p_ID=${res.value[res.value.length - 1].Id}` : ``;
        const rowLimit: string = args.options.pageSize ? `$top=${args.options.pageSize}` : ``;
        const filter: string = args.options.filter ? `$filter=${encodeURIComponent(args.options.filter)}` : ``;
        const fieldSelect: string = fieldsArray.length > 0 ?
          `?$select=${encodeURIComponent(fieldsArray.join(","))}&${rowLimit}&${skipToken}&${filter}` :
          `?${rowLimit}&${skipToken}&${filter}`;
        const requestBody: any = args.options.camlQuery ?
          {
            "query": {
              "ViewXml": args.options.camlQuery
            }
          }
          : ``;

        const requestOptions: any = {
          url: `${listRestUrl}/${args.options.camlQuery ? `GetItems` : `items${fieldSelect}`}`,
          headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': formDigestValue
          },
          responseType: 'json',
          data: requestBody
        };

        return args.options.camlQuery ? request.post(requestOptions) : request.get(requestOptions);
      })
      .then((listItemInstances: ListItemInstanceCollection): void => {
        listItemInstances.value.forEach(v => delete v['ID']);
        logger.log(listItemInstances.value);
        cb();
      }, (err: any): void => this.handleRejectedODataJsonPromise(err, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>'
      },
      {
        option: '-i, --id [listId]'
      },
      {
        option: '-t, --title [listTitle]'
      },
      {
        option: '-s, --pageSize [pageSize]'
      },
      {
        option: '-n, --pageNumber [pageNumber]'
      },
      {
        option: '-q, --camlQuery [camlQuery]'
      },
      {
        option: '-f, --fields [fields]'
      },
      {
        option: '-l, --filter [filter]'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public types(): CommandTypes {
    return {
      string: [
        'webUrl',
        'id',
        'title',
        'camlQuery',
        'pageSize',
        'pageNumber',
        'fields',
        'filter'
      ]
    };
  }

  public validate(args: CommandArgs): boolean | string {
    const isValidSharePointUrl: boolean | string = SpoCommand.isValidSharePointUrl(args.options.webUrl);
    if (isValidSharePointUrl !== true) {
      return isValidSharePointUrl;
    }

    if (!args.options.id && !args.options.title) {
      return `Specify list id or title`;
    }

    if (args.options.id && args.options.title) {
      return `Specify list id or title but not both`;
    }

    if (args.options.camlQuery && args.options.fields) {
      return `Specify camlQuery or fields but not both`;
    }

    if (args.options.camlQuery && args.options.pageSize) {
      return `Specify camlQuery or pageSize but not both`;
    }

    if (args.options.camlQuery && args.options.pageNumber) {
      return `Specify camlQuery or pageNumber but not both`;
    }

    if (args.options.pageSize && isNaN(Number(args.options.pageSize))) {
      return `pageSize must be numeric`;
    }

    if (args.options.pageNumber && !args.options.pageSize) {
      return `pageSize must be specified if pageNumber is specified`;
    }

    if (args.options.pageNumber && isNaN(Number(args.options.pageNumber))) {
      return `pageNumber must be numeric`;
    }

    if (args.options.id &&
      !Utils.isValidGuid(args.options.id)) {
      return `${args.options.id} in option id is not a valid GUID`;
    }

    return true;
  }
}

module.exports = new SpoListItemListCommand();