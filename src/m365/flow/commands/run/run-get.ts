import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import AzmgmtCommand from '../../../base/AzmgmtCommand';
import commands from '../../commands';
import { Json } from '../../../../../node_modules/adaptive-expressions/lib/builtinFunctions';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  environment: string;
  flow: string;
  name: string;
}

class FlowRunGetCommand extends AzmgmtCommand {
  public get name(): string {
    return commands.RUN_GET;
  }

  public get description(): string {
    return 'Gets information about a specific run of the specified Microsoft Flow';
  }

  public defaultProperties(): string[] | undefined {
    return ['name', 'startTime', 'endTime', 'status', 'triggerName', 'runUrl','triggerInformation'];
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    if (this.verbose) {
      logger.logToStderr(`Retrieving information about run ${args.options.name} of Microsoft Flow ${args.options.flow}...`);
    }

    const requestOptions: any = {
      url: `${this.resource}providers/Microsoft.ProcessSimple/environments/${encodeURIComponent(args.options.environment)}/flows/${encodeURIComponent(args.options.flow)}/runs/${encodeURIComponent(args.options.name)}?api-version=2016-11-01`,
      headers: {
        accept: 'application/json'
      },
      responseType: 'json'
    };
    const fetch = require("node-fetch");
    request
      .get(requestOptions)
      .then(async (res: any): Promise<void> => {
        res.startTime = res.properties.startTime;
        res.endTime = res.properties.endTime || '';
        res.properties = res.properties;
        res.status = res.properties.status;
        res.runUrl = `https://emea.flow.microsoft.com/manage/environments/${encodeURIComponent(args.options.environment)}/flows/${encodeURIComponent(args.options.flow)}/runs/${encodeURIComponent(args.options.name)}`;
        await fetch( res.properties.trigger.outputsLink.uri)
            .then((response: { text: () => Json; }) => response.text())
            .then((data: any) => {
                let jsondata = JSON.parse(data);
                res.triggerInformation = jsondata.body;
              });
        logger.log(res);

        cb();
      }, (rawRes: any): void => this.handleRejectedODataJsonPromise(rawRes, logger, cb));
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-n, --name <name>'
      },
      {
        option: '-f, --flow <flow>'
      },
      {
        option: '-e, --environment <environment>'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
}

module.exports = new FlowRunGetCommand();