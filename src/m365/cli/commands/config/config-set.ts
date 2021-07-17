import { Cli, Logger } from "../../../../cli";
import { CommandOption } from "../../../../Command";
import GlobalOptions from "../../../../GlobalOptions";
import { settingsNames } from "../../../../settingsNames";
import AnonymousCommand from "../../../base/AnonymousCommand";
import commands from "../../commands";

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  key: string;
  value: string;
}

class CliConfigSetCommand extends AnonymousCommand {
  private static readonly optionNames: string[] = Object.getOwnPropertyNames(settingsNames);

  public get name(): string {
    return commands.CONFIG_SET;
  }

  public get description(): string {
    return 'Manage global configuration settings about the CLI for Microsoft 365';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps[args.options.key] = args.options.value;
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: (err?: any) => void): void {
    let value: any = undefined;

    switch (args.options.key) {
      case settingsNames.autoOpenBrowserOnLogin:
      case settingsNames.showHelpOnFailure:
      case settingsNames.printErrorsAsPlainText:
        value = args.options.value === 'true';
        break;
      default:
        value = args.options.value;
        break;
    }

    Cli.getInstance().config.set(args.options.key, value);
    cb();
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-k, --key <key>',
        autocomplete: CliConfigSetCommand.optionNames
      },
      {
        option: '-v, --value <value>'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(args: CommandArgs): boolean | string {
    if (CliConfigSetCommand.optionNames.indexOf(args.options.key) < 0) {
      return `${args.options.key} is not a valid setting. Allowed values: ${CliConfigSetCommand.optionNames.join(', ')}`;
    }

    const allowedOutputs = ['text', 'json'];
    if (args.options.key === settingsNames.output &&
      allowedOutputs.indexOf(args.options.value) === -1) {
      return `${args.options.value} is not a valid value for the option ${args.options.key}. Allowed values: ${allowedOutputs.join(', ')}`;
    }

    const allowedErrorOutputs = ['stdout', 'stderr'];
    if (args.options.key === settingsNames.errorOutput &&
      allowedErrorOutputs.indexOf(args.options.value) === -1) {
      return `${args.options.value} is not a valid value for the option ${args.options.key}. Allowed values: ${allowedErrorOutputs.join(', ')}`;
    }

    return true;
  }
}

module.exports = new CliConfigSetCommand();