import commands from '../../commands';
import request from '../../../../request';
import GlobalOptions from '../../../../GlobalOptions';
import {
  CommandOption, CommandValidate, CommandError
} from '../../../../Command';
import GraphCommand from '../../../base/GraphCommand';

const vorpal: Vorpal = require('../../../../vorpal-init');

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  id?: string;
  name?: string;
  confirm?: boolean;
}

class TodoListRemoveCommand extends GraphCommand {
  public get name(): string {
    return `${commands.LIST_REMOVE}`;
  }

  public get description(): string {
    return 'Removes a Microsoft To Do task list';
  }


  public commandAction(cmd: CommandInstance, args: CommandArgs, cb: (err?: any) => void): void {

    const getListId = () => {
      if (args.options.name) {
        // Search list by its name
        const requestOptions: any = {
          url: `${this.resource}/beta/me/todo/lists?$filter=displayName eq '${escape(args.options.name)}'`,
          headers: {
            accept: "application/json;odata.metadata=none"
          },
          json: true
        };
        return request.get(requestOptions)
          .then((response: any) => response.value && response.value.length === 1 ? response.value[0].id : null);
      }

      return Promise.resolve(args.options.id);
    };

    const removeList = () => {
      getListId().then(listId => {
        if (!listId) {
          cb(new CommandError(`The list ${args.options.name} cannot be found`));
          return;
        }

        const requestOptions: any = {
          url: `${this.resource}/beta/me/todo/lists/${listId}`,
          headers: {
            accept: "application/json;odata.metadata=none"
          },
          json: true
        };

        request
          .delete(requestOptions)
          .then((): void => {

            if (this.verbose) {
              cmd.log(vorpal.chalk.green('DONE'));
            }

            cb();
          }, (err: any) => this.handleRejectedODataJsonPromise(err, cmd, cb));
      }, (err: any) => this.handleRejectedODataJsonPromise(err, cmd, cb));

    };

    if (args.options.confirm) {
      removeList();
    }
    else {
      cmd.prompt(
        {
          type: "confirm",
          name: "continue",
          default: false,
          message: `Are you sure you want to remove the list ${args.options.id || args.options.name}?`
        },
        (result: { continue: boolean }): void => {
          if (!result.continue) {
            cb();
          }
          else {
            removeList();
          }
        }
      );
    }
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.name = typeof args.options.name !== 'undefined';
    telemetryProps.id = typeof args.options.id !== 'undefined';
    telemetryProps.confirm = args.options.confirm;
    return telemetryProps;
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-n, --name [name]',
        description: `The name of the task list to remove. Specify either id or name but not both`
      },
      {
        option: '-i, --id [id]',
        description: `The ID of the list to remove. Specify either id or name but not both`
      },
      {
        option: '--confirm',
        description: `Don't prompt for confirming removing the task list`
      },
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }

  public validate(): CommandValidate {
    return (args: CommandArgs): boolean | string => {
      if (!args.options.name && !args.options.id) {
        return 'Both name and id options are missing';
      }

      if (args.options.name && args.options.id) {
        return 'name and id options cannot be specified at the same time'
      }

      return true;
    };
  }

  public commandHelp(args: {}, log: (help: string) => void): void {
    log(vorpal.find(this.name).helpInformation());
    log(
      `  
  Examples:
  
    Remove the list "My task list"
      ${this.name} --name "My task list"

    Remove the list with Id "AAMkAGI3NDhlZmQzLWQxYjAtNGJjNy04NmYwLWQ0M2IzZTNlMDUwNAAuAAAAAACQ1l2jfH6VSZraktP8Z7auAQCbV93BagWITZhL3J6BMqhjAAD9pHIhAAA="
      ${this.name} --id "AAMkAGI3NDhlZmQzLWQxYjAtNGJjNy04NmYwLWQ0M2IzZTNlMDUwNAAuAAAAAACQ1l2jfH6VSZraktP8Z7auAQCbV93BagWITZhL3J6BMqhjAAD9pHIhAAA="
`);
  }
}

module.exports = new TodoListRemoveCommand();