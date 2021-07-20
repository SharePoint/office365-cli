import * as assert from 'assert';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as markshell from 'markshell';
import * as os from 'os';
import * as path from 'path';
import * as sinon from 'sinon';
import { Cli, CommandOutput } from '.';
import appInsights from '../appInsights';
import Command, { CommandArgs, CommandError, CommandOption, CommandTypes } from '../Command';
import AnonymousCommand from '../m365/base/AnonymousCommand';
import Utils from '../Utils';
import { Logger } from './Logger';
import Table = require('easy-table');
const packageJSON = require('../../package.json');

class MockCommand extends AnonymousCommand {
  public get name(): string {
    return 'cli mock';
  }
  public get description(): string {
    return 'Mock command';
  }
  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-x, --parameterX <parameterX>'
      },
      {
        option: '-y, --parameterY [parameterY]'
      }
    ];
    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
  public types(): CommandTypes {
    return {
      string: ['x'],
      boolean: ['y']
    };
  }
  public commandAction(logger: Logger, args: any, cb: (err?: any) => void): void {
    logger.log(args.options.parameterX);
    cb();
  }
}

class MockCommandWithAlias extends AnonymousCommand {
  public get name(): string {
    return 'cli mock alias';
  }
  public get description(): string {
    return 'Mock command with alias';
  }
  public alias(): string[] {
    return ['cli mock alt'];
  }
  public commandAction(logger: Logger, args: any, cb: () => void): void {
    cb();
  }
}

class MockCommandWithValidation extends AnonymousCommand {
  public get name(): string {
    return 'cli mock1 validation';
  }
  public get description(): string {
    return 'Mock command with validation';
  }
  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-x, --parameterX <parameterX>'
      },
      {
        option: '-y, --parameterY [parameterY]'
      }
    ];
    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
  public commandAction(logger: Logger, args: any, cb: () => void): void {
    cb();
  }
}

class MockCommandWithPrompt extends AnonymousCommand {
  public get name(): string {
    return 'cli mock prompt';
  }
  public get description(): string {
    return 'Mock command with prompt';
  }
  public commandAction(logger: Logger, args: any, cb: () => void): void {
    Cli.prompt({
      type: 'confirm',
      name: 'continue',
      default: false,
      message: `Continue?`
    }, (): void => {
      cb();
    });
  }
}

class MockCommandWithOutput extends AnonymousCommand {
  public get name(): string {
    return 'cli mock output';
  }
  public get description(): string {
    return 'Mock command with output';
  }
  public commandAction(logger: Logger, args: any, cb: () => void): void {
    logger.log('Command output');
    cb();
  }
}

class MockCommandWithRawOutput extends AnonymousCommand {
  public get name(): string {
    return 'cli mock output';
  }
  public get description(): string {
    return 'Mock command with output';
  }
  public commandAction(logger: Logger, args: any, cb: () => void): void {
    if (this.debug) {
      logger.logToStderr('Debug output');
    }

    logger.logRaw('Raw output');
    cb();
  }
}

describe('Cli', () => {
  let cli: Cli;
  let rootFolder: string;
  let cliLogStub: sinon.SinonStub;
  let cliErrorStub: sinon.SinonStub;
  let cliFormatOutputSpy: sinon.SinonSpy;
  let processExitStub: sinon.SinonStub;
  let markshellStub: sinon.SinonStub;
  let mockCommandActionSpy: sinon.SinonSpy;
  let mockCommand: Command;
  let mockCommandWithAlias: Command;
  let mockCommandWithValidation: Command;

  before(() => {
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });

    cliLogStub = sinon.stub((Cli as any), 'log').callsFake(_ => { });
    cliErrorStub = sinon.stub((Cli as any), 'error');
    cliFormatOutputSpy = sinon.spy((Cli as any), 'formatOutput');
    processExitStub = sinon.stub(process, 'exit');
    markshellStub = sinon.stub(markshell, 'toRawContent');

    mockCommand = new MockCommand();
    mockCommandWithAlias = new MockCommandWithAlias();
    mockCommandWithValidation = new MockCommandWithValidation();
    mockCommandActionSpy = sinon.spy(mockCommand, 'action');

    return new Promise((resolve) => {
      fs.realpath(__dirname, (err: NodeJS.ErrnoException | null, resolvedPath: string): void => {
        rootFolder = resolvedPath;
        resolve(undefined);
      });
    });
  });

  beforeEach(() => {
    cli = Cli.getInstance();
    (cli as any).loadCommand(mockCommand);
    (cli as any).loadCommand(mockCommandWithAlias);
    (cli as any).loadCommand(mockCommandWithValidation);
  });

  afterEach(() => {
    (Cli as any).instance = undefined;
    cliLogStub.reset();
    cliErrorStub.reset();
    cliFormatOutputSpy.resetHistory();
    processExitStub.reset();
    markshellStub.reset();
    mockCommandActionSpy.resetHistory();
    Utils.restore([
      Cli.executeCommand,
      fs.existsSync,
      fs.readFileSync,
      mockCommandWithValidation.validate,
      mockCommandWithValidation.action,
      inquirer.prompt,
      // eslint-disable-next-line no-console
      console.log,
      // eslint-disable-next-line no-console
      console.error,
      mockCommand.commandAction,
      mockCommand.processOptions
    ]);
  });

  after(() => {
    Utils.restore([
      (Cli as any).log,
      (Cli as any).error,
      (Cli as any).formatOutput,
      process.exit,
      markshell.toRawContent,
      appInsights.trackEvent
    ]);
  });

  it('shows generic help when no command specified', (done) => {
    cli
      .execute(rootFolder, [])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith(`CLI for Microsoft 365 v${packageJSON.version}`));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('exits with 0 code when no command specified', (done) => {
    cli
      .execute(rootFolder, [])
      .then(_ => {
        try {
          assert(processExitStub.calledWith(0));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows generic help when help command and no command name specified', (done) => {
    cli
      .execute(rootFolder, ['help'])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith(`CLI for Microsoft 365 v${packageJSON.version}`));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows generic help when --help option specified', (done) => {
    cli
      .execute(rootFolder, ['--help'])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith(`CLI for Microsoft 365 v${packageJSON.version}`));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows generic help when -h option specified', (done) => {
    cli
      .execute(rootFolder, ['-h'])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith(`CLI for Microsoft 365 v${packageJSON.version}`));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows help for the specific command when help specified followed by a valid command name', (done) => {
    sinon.stub(fs, 'existsSync').callsFake((path) => path.toString().endsWith('.md'));
    cli
      .execute(rootFolder, ['help', 'cli', 'mock'])
      .then(_ => {
        try {
          assert(markshellStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows help for the specific command when valid command name specified followed by --help', (done) => {
    sinon.stub(fs, 'existsSync').callsFake((path) => path.toString().endsWith('.md'));
    cli
      .execute(rootFolder, ['cli', 'mock', '--help'])
      .then(_ => {
        try {
          assert(markshellStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows help for the specific command when valid command name specified followed by -h', (done) => {
    sinon.stub(fs, 'existsSync').callsFake((path) => path.toString().endsWith('.md'));
    cli
      .execute(rootFolder, ['cli', 'mock', '-h'])
      .then(_ => {
        try {
          assert(markshellStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows help for the specific command when valid command name specified followed by -h (single-word command)', (done) => {
    cli
      .execute(path.join(rootFolder, '..', 'm365'), ['status', '-h'])
      .then(_ => {
        try {
          assert(markshellStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('shows help for the specific command when help specified followed by a valid command alias', (done) => {
    sinon.stub(fs, 'existsSync').callsFake((path) => path.toString().endsWith('.md'));
    cli
      .execute(rootFolder, ['help', 'cli', 'mock', 'alt'])
      .then(_ => {
        try {
          assert(cliLogStub.called);
          assert(!cliLogStub.calledWith(`CLI for Microsoft 365 v${packageJSON.version}`));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`passes options validation if the command doesn't allow unknown options and specified options match command options`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '-y', '456'])
      .then(_ => {
        try {
          assert(mockCommandActionSpy.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`fails options validation if the command doesn't allow unknown options and specified options match command options`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '-z'])
      .then(_ => done('Promise fulfilled while error expected'), _ => {
        try {
          assert(cliErrorStub.calledWith(chalk.red(`Error: Invalid option: 'z'${os.EOL}`)));
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`doesn't execute command action when option validation failed`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '-z'])
      .then(_ => done('Promise fulfilled while error expected'), _ => {
        try {
          assert(mockCommandActionSpy.notCalled);
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`exits with exit code 1 when option validation failed`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '-z'])
      .then(_ => done('Promise fulfilled while error expected'), _ => {
        try {
          assert(processExitStub.calledWith(1));
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`fails validation if a required option is missing`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock'])
      .then(_ => done('Promise fulfilled while error expected'), _ => {
        try {
          assert(cliErrorStub.calledWith(chalk.red(`Error: Required option parameterX not specified`)));
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`calls command's validation method when defined`, (done) => {
    const mockCommandValidateSpy: sinon.SinonSpy = sinon.spy(mockCommandWithValidation, 'validate');
    cli
      .execute(rootFolder, ['cli', 'mock1', 'validation', '-x', '123'])
      .then(_ => {
        try {
          assert(mockCommandValidateSpy.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`passes validation when the command's validate method returns true`, (done) => {
    sinon.stub(mockCommandWithValidation, 'validate').callsFake(() => true);
    const mockCommandWithValidationActionSpy: sinon.SinonSpy = sinon.spy(mockCommandWithValidation, 'action');

    cli
      .execute(rootFolder, ['cli', 'mock1', 'validation', '-x', '123'])
      .then(_ => {
        try {
          assert(mockCommandWithValidationActionSpy.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`fails validation when the command's validate method returns a string`, (done) => {
    sinon.stub(mockCommandWithValidation, 'validate').callsFake(() => 'Error');
    const mockCommandWithValidationActionSpy: sinon.SinonSpy = sinon.spy(mockCommandWithValidation, 'action');

    cli
      .execute(rootFolder, ['cli', 'mock1', 'validation', '-x', '123'])
      .then(_ => done('Promise fulfilled while error expected'), _ => {
        try {
          assert(mockCommandWithValidationActionSpy.notCalled);
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`executes command when validation passed`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123'])
      .then(_ => {
        try {
          assert(mockCommandActionSpy.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`writes DONE when executing command in verbose mode succeeded`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '--verbose'])
      .then(_ => {
        try {
          assert(cliErrorStub.calledWith(chalk.green('DONE')));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it(`writes DONE when executing command in debug mode succeeded`, (done) => {
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123', '--debug'])
      .then(_ => {
        try {
          assert(cliErrorStub.calledWith(chalk.green('DONE')));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('executes the specified command', (done) => {
    Cli
      .executeCommand(mockCommand, { options: { _: [] } })
      .then(_ => {
        try {
          assert(mockCommandActionSpy.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('logs command name when executing command in debug mode', (done) => {
    Cli
      .executeCommand(mockCommand, { options: { debug: true, _: [] } })
      .then(_ => {
        try {
          assert(cliErrorStub.calledWith('Executing command cli mock with options {"options":{"debug":true,"_":[]}}'));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('calls inquirer when command shows prompt', (done) => {
    const promptStub: sinon.SinonStub = sinon.stub(inquirer, 'prompt').callsFake(() => Promise.resolve() as any);
    const mockCommandWithPrompt = new MockCommandWithPrompt();

    Cli
      .executeCommand(mockCommandWithPrompt, { options: { _: [] } })
      .then(_ => {
        try {
          assert(promptStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('prints command output with formatting', (done) => {
    const commandWithOutput: MockCommandWithOutput = new MockCommandWithOutput();
    Cli
      .executeCommand(commandWithOutput, { options: { _: [] } })
      .then(_ => {
        try {
          assert(cliLogStub.called, 'Cli.log not called');
          assert(cliFormatOutputSpy.called, 'Cli.formatOutput not called');
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('prints command output without formatting', (done) => {
    const commandWithOutput: MockCommandWithRawOutput = new MockCommandWithRawOutput();
    Cli
      .executeCommand(commandWithOutput, { options: { _: [] } })
      .then(_ => {
        try {
          assert(cliLogStub.called, 'Cli.log not called');
          assert(cliFormatOutputSpy.notCalled, 'Cli.formatOutput called');
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('returns command output when executing command with output', (done) => {
    const commandWithOutput: MockCommandWithOutput = new MockCommandWithOutput();
    Cli
      .executeCommandWithOutput(commandWithOutput, { options: { _: [] } })
      .then((output: CommandOutput) => {
        try {
          assert.strictEqual(output.stdout, 'Command output');
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('returns raw command output when executing command with output', (done) => {
    const commandWithOutput: MockCommandWithRawOutput = new MockCommandWithRawOutput();
    Cli
      .executeCommandWithOutput(commandWithOutput, { options: { _: [] } })
      .then((output: CommandOutput) => {
        try {
          assert.strictEqual(output.stdout, 'Raw output');
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('returns debug command output when executing command with output in debug mode', (done) => {
    const commandWithOutput: MockCommandWithRawOutput = new MockCommandWithRawOutput();
    Cli
      .executeCommandWithOutput(commandWithOutput, { options: { _: [], debug: true } })
      .then((output: CommandOutput) => {
        try {
          assert.strictEqual(output.stdout, 'Raw output');
          assert.strictEqual(output.stderr, 'Debug output');
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('calls inquirer when command shows prompt and executed with output', (done) => {
    const promptStub: sinon.SinonStub = sinon.stub(inquirer, 'prompt').callsFake(() => Promise.resolve() as any);
    const mockCommandWithPrompt = new MockCommandWithPrompt();

    Cli
      .executeCommandWithOutput(mockCommandWithPrompt, { options: { _: [] } })
      .then(_ => {
        try {
          assert(promptStub.called);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('logs command name when executing command with output in debug mode', (done) => {
    Cli
      .executeCommandWithOutput(mockCommand, { options: { debug: true, _: [] } })
      .then(_ => {
        try {
          assert(cliLogStub.calledWith('Executing command cli mock with options {"options":{"debug":true,"_":[]}}'));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('correctly handles error when executing command', (done) => {
    sinon.stub(mockCommand, 'commandAction').callsFake((logger: Logger, args: CommandArgs, cb: (err?: any) => void) => { cb('Error'); });
    Cli
      .executeCommand(mockCommand, { options: { _: [] } })
      .then(_ => {
        done('Command succeeded while expected fail');
      }, e => {
        try {
          assert.strictEqual(e, 'Error');
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it('correctly handles error when executing command with output', (done) => {
    sinon.stub(mockCommand, 'commandAction').callsFake((logger: Logger, args: CommandArgs, cb: (err?: any) => void) => { cb('Error'); });
    Cli
      .executeCommandWithOutput(mockCommand, { options: { _: [] } })
      .then(_ => {
        done('Command succeeded while expected fail');
      }, e => {
        try {
          assert.strictEqual(e.error, 'Error');
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it('loads commands from .js files with command definitions', (done) => {
    const cliCommandsFolder: string = path.join(rootFolder, '..', 'm365', 'cli', 'commands');
    cli
      .execute(cliCommandsFolder, ['cli', 'mock', '-x', '1'])
      .then(_ => {
        try {
          // 12 commands from the folder + 3 mocks
          assert.strictEqual(cli.commands.length, 12 + 3);
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(e));
  });

  it('closes with error when loading a command fails', (done) => {
    sinon.stub(cli as any, 'loadCommand').callsFake(() => { throw 'Error'; });
    const cliStub: sinon.SinonStub = sinon.stub(cli as any, 'closeWithError').callsFake(() => { throw new Error(); });
    const cliCommandsFolder: string = path.join(rootFolder, '..', 'm365', 'cli', 'commands');
    cli
      .execute(cliCommandsFolder, ['cli', 'mock'])
      .then(_ => {
        done('CLI ran correctly while exception expected');
      }, _ => {
        try {
          assert(cliStub.calledWith('Error'));
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it('loads all commands when completion requested', (done) => {
    const loadAllCommandsStub: sinon.SinonStub = sinon.stub(cli, 'loadAllCommands').callsFake(() => { });
    cli.loadCommandFromArgs(['completion']);

    try {
      assert(loadAllCommandsStub.called);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('loads command with one word', (done) => {
    (cli as any).commandsFolder = path.join(rootFolder, '..', 'm365');
    const loadAllCommandsSpy: sinon.SinonSpy = sinon.spy(cli, 'loadAllCommands');
    const loadCommandSpy: sinon.SinonSpy = sinon.spy((cli as any), 'loadCommand');
    cli.loadCommandFromArgs(['status']);

    try {
      assert(loadAllCommandsSpy.notCalled);
      assert(loadCommandSpy.called);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it(`loads all commands, when the matched file doesn't contain command`, (done) => {
    sinon.stub(cli as any, 'loadCommandFromFile').callsFake(_ => (cli as any).loadCommandFromFile.wrappedMethod.apply(cli, [path.join(rootFolder, 'CommandInfo.js')]));
    const loadAllCommandsStub: sinon.SinonSpy = sinon.stub(cli, 'loadAllCommands').callsFake(() => { });
    const loadCommandStub: sinon.SinonSpy = sinon.stub((cli as any), 'loadCommand').callsFake(() => { });
    cli.loadCommandFromArgs(['status']);

    try {
      assert(loadCommandStub.notCalled);
      assert(loadAllCommandsStub.called);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it(`loads all commands, when exception was thrown when loading a command file`, (done) => {
    (cli as any).commandsFolder = path.join(rootFolder, '..', 'm365');
    const loadAllCommandsStub: sinon.SinonSpy = sinon.stub(cli, 'loadAllCommands').callsFake(() => { });
    const loadCommandStub: sinon.SinonSpy = sinon.stub((cli as any), 'loadCommand').callsFake(() => { throw 'Error'; });
    cli.loadCommandFromArgs(['status']);

    try {
      assert(loadCommandStub.called);
      assert(loadAllCommandsStub.called);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('doesn\'t fail when undefined object is passed to the log', () => {
    const actual = (Cli as any).formatOutput(undefined);
    assert.strictEqual(actual, undefined);
  });

  it('returns the same object if non-array is passed to the log', () => {
    const s = 'foo';
    const actual = (Cli as any).formatOutput(s, {});
    assert.strictEqual(actual, s);
  });

  it('doesn\'t fail when an array with undefined object is passed to the log', () => {
    const actual = (Cli as any).formatOutput([undefined], {});
    assert.strictEqual(actual, '');
  });

  it('formats output as pretty JSON when JSON output requested', (done) => {
    const o = { lorem: 'ipsum', dolor: 'sit' };
    const actual = (Cli as any).formatOutput(o, { output: 'json' });
    try {
      assert.strictEqual(actual, JSON.stringify(o, null, 2));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats simple output as text', (done) => {
    const o = false;
    const actual = (Cli as any).formatOutput(o, {});
    try {
      assert.strictEqual(actual, `${o}`);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats date output as text', () => {
    const d = new Date();
    const actual = (Cli as any).formatOutput(d, {});
    assert.strictEqual(actual, d.toString());
  });

  it('formats object output as transposed table', (done) => {
    const o = { prop1: 'value1', prop2: 'value2' };
    const actual = (Cli as any).formatOutput(o, {});
    const t = new Table();
    t.cell('prop1', 'value1');
    t.cell('prop2', 'value2');
    t.newRow();
    const expected = t.printTransposed({
      separator: ': '
    });
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats object output as transposed table', (done) => {
    const o = { prop1: 'value1 ', prop12: 'value12' };
    const actual = (Cli as any).formatOutput(o, {});
    const t = new Table();
    t.cell('prop1', 'value1');
    t.cell('prop12', 'value12');
    t.newRow();
    const expected = t.printTransposed({
      separator: ': '
    });
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats array values as JSON', (done) => {
    const o = { prop1: ['value1', 'value2'] };
    const actual = (Cli as any).formatOutput(o, {});
    const expected = 'prop1: ["value1","value2"]' + '\n';
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats array of string arrays output as comma-separated strings', (done) => {
    const o = [
      ['value1', 'value2'],
      ['value3', 'value4']
    ];
    const actual = (Cli as any).formatOutput(o, {});
    const expected = [o[0].join(','), o[1].join(',')].join(os.EOL);
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats array of object output as table', (done) => {
    const o = [
      { prop1: 'value1', prop2: 'value2' },
      { prop1: 'value3', prop2: 'value4' }
    ];
    const actual = (Cli as any).formatOutput(o, {});
    const t = new Table();
    t.cell('prop1', 'value1');
    t.cell('prop2', 'value2');
    t.newRow();
    t.cell('prop1', 'value3');
    t.cell('prop2', 'value4');
    t.newRow();
    const expected = t.toString();
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('formats command error as error message', (done) => {
    const o = new CommandError('An error has occurred');
    const actual = (Cli as any).formatOutput(o, {});
    const expected = chalk.red('Error: An error has occurred');
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('sets array type to the first non-undefined value', (done) => {
    const o = [undefined, 'lorem', 'ipsum'];
    const actual = (Cli as any).formatOutput(o, {});
    const expected = `${os.EOL}lorem${os.EOL}ipsum`;
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('skips primitives mixed with objects when rendering a table', (done) => {
    const o = [
      { prop1: 'value1', prop2: 'value2' },
      'lorem',
      { prop1: 'value3', prop2: 'value4' }
    ];
    const actual = (Cli as any).formatOutput(o, {});
    const t = new Table();
    t.cell('prop1', 'value1');
    t.cell('prop2', 'value2');
    t.newRow();
    t.cell('prop1', 'value3');
    t.cell('prop2', 'value4');
    t.newRow();
    const expected = t.toString();
    try {
      assert.strictEqual(actual, expected);
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('applies JMESPath query to a single object', (done) => {
    const o = {
      "first": "Joe",
      "last": "Doe"
    };
    const actual = (Cli as any).formatOutput(o, { query: 'first', output: 'json' });
    try {
      assert.strictEqual(actual, JSON.stringify("Joe"));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('filters output following command definition in output text', (done) => {
    const o = [
      { "name": "Seattle", "state": "WA" },
      { "name": "New York", "state": "NY" },
      { "name": "Bellevue", "state": "WA" },
      { "name": "Olympia", "state": "WA" }
    ];
    const cli: Cli = Cli.getInstance();
    (cli as any).commandToExecute = {
      defaultProperties: ['name']
    };
    const actual = (Cli as any).formatOutput(o, { output: 'text' });
    const t = new Table();
    t.cell('name', 'Seattle');
    t.newRow();
    t.cell('name', 'New York');
    t.newRow();
    t.cell('name', 'Bellevue');
    t.newRow();
    t.cell('name', 'Olympia');
    t.newRow();
    const expected = t.toString();
    try {
      assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected));
      done();
    }
    catch (e) {
      done(e);
    }
    finally {
      (cli as any).commandToExecute = undefined;
    }
  });

  it('filters output wrapped in a value property following command definition in output text', (done) => {
    const o = {
      value: [
        { "name": "Seattle", "state": "WA" },
        { "name": "New York", "state": "NY" },
        { "name": "Bellevue", "state": "WA" },
        { "name": "Olympia", "state": "WA" }
      ]
    };
    const cli: Cli = Cli.getInstance();
    (cli as any).commandToExecute = {
      defaultProperties: ['name']
    };
    const actual = (Cli as any).formatOutput(o, { output: 'text' });
    const t = new Table();
    t.cell('name', 'Seattle');
    t.newRow();
    t.cell('name', 'New York');
    t.newRow();
    t.cell('name', 'Bellevue');
    t.newRow();
    t.cell('name', 'Olympia');
    t.newRow();
    const expected = t.toString();
    try {
      assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected));
      done();
    }
    catch (e) {
      done(e);
    }
    finally {
      (cli as any).commandToExecute = undefined;
    }
  });

  it('applies JMESPath query to an array', (done) => {
    const o = {
      "locations": [
        { "name": "Seattle", "state": "WA" },
        { "name": "New York", "state": "NY" },
        { "name": "Bellevue", "state": "WA" },
        { "name": "Olympia", "state": "WA" }
      ]
    };
    const actual = (Cli as any).formatOutput(o, {
      query: `locations[?state == 'WA'].name | sort(@) | {WashingtonCities: join(', ', @)}`,
      output: 'json'
    });
    try {
      assert.strictEqual(actual, JSON.stringify({
        "WashingtonCities": "Bellevue, Olympia, Seattle"
      }, null, 2));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('doesn\'t apply JMESPath query when command help requested', (done) => {
    const o = {
      "locations": [
        { "name": "Seattle", "state": "WA" },
        { "name": "New York", "state": "NY" },
        { "name": "Bellevue", "state": "WA" },
        { "name": "Olympia", "state": "WA" }
      ]
    };
    const actual = (Cli as any).formatOutput(o, {
      query: `locations[?state == 'WA'].name | sort(@) | {WashingtonCities: join(', ', @)}`,
      output: 'json',
      help: true
    });
    try {
      assert.strictEqual(actual, JSON.stringify(o, null, 2));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it('throws human-readable error when invalid JMESPath query specified', () => {
    const o = {
      "locations": [
        { "name": "Seattle", "state": "WA" },
        { "name": "New York", "state": "NY" },
        { "name": "Bellevue", "state": "WA" },
        { "name": "Olympia", "state": "WA" }
      ]
    };
    assert.throws(() => {
      (Cli as any).formatOutput(o, {
        query: `contains(abc)`,
        output: 'json'
      });

      assert(cliErrorStub.calledWith(chalk.red('Error: JMESPath query error. ArgumentError: contains() takes 2 arguments but received 1. See https://jmespath.org/specification.html for more information')));
    });
  });

  it(`prints commands grouped per service when no command specified`, (done) => {
    (cli as any).commandsFolder = path.join(rootFolder, '..', 'm365');
    cli.loadCommandFromArgs(['status']);
    cli.loadCommandFromArgs(['spo', 'site', 'list']);
    (cli as any).printAvailableCommands();

    try {
      assert(cliLogStub.calledWith('  cli *  4 commands'));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it(`prints commands from the specified group`, (done) => {
    (cli as any).commandsFolder = path.join(rootFolder, '..', 'm365');
    cli.loadCommandFromArgs(['status']);
    cli.loadCommandFromArgs(['spo', 'site', 'list']);
    (cli as any).optionsFromArgs = {
      options: {
        _: ['cli']
      }
    };
    (cli as any).printAvailableCommands();

    try {
      assert(cliLogStub.calledWith('  cli mock *   2 commands'));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it(`prints commands from the root group when the specified string doesn't match any group`, (done) => {
    (cli as any).commandsFolder = path.join(rootFolder, '..', 'm365');
    cli.loadCommandFromArgs(['status']);
    cli.loadCommandFromArgs(['spo', 'site', 'list']);
    (cli as any).optionsFromArgs = {
      options: {
        _: ['foo']
      }
    };
    (cli as any).printAvailableCommands();

    try {
      assert(cliLogStub.calledWith('  cli *  4 commands'));
      done();
    }
    catch (e) {
      done(e);
    }
  });

  it(`exits with the specified exit code`, () => {
    try {
      (cli as any).closeWithError(new CommandError('Error', 5), { options: {} });
      assert.fail(`Didn't fail while expected`);
    }
    catch {
      assert(processExitStub.calledWith(5));
    }
  });

  it(`prints error as JSON in JSON output mode and printErrorsAsPlainText set to false`, () => {
    const config = cli.config;
    sinon.stub(config, 'get').callsFake(() => false);

    try {
      (cli as any).closeWithError(new CommandError('Error'), { options: { output: 'json' } });
      assert.fail(`Didn't fail while expected`);
    }
    catch (err) {
      assert(cliErrorStub.calledWith(JSON.stringify({ error: 'Error' })));
    }
  });

  it(`replaces option value with the content of the specified file when value starts with @ and the specified file exists`, (done) => {
    sinon.stub(fs, 'existsSync').callsFake(_ => true);
    sinon.stub(fs, 'readFileSync').callsFake(_ => 'abc');
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '@file.txt', '-o', 'text'])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith('abc'));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(`Error: ${e}`));
  });

  it(`returns error when reading file contents failed`, (done) => {
    sinon.stub(fs, 'existsSync').callsFake(_ => true);
    sinon.stub(fs, 'readFileSync').callsFake(_ => { throw 'An error has occurred'; });
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '@file.txt'])
      .then(_ => {
        done('Promise completed while error expected');
      }, _ => {
        try {
          assert(cliErrorStub.calledWith(chalk.red(`Error: An error has occurred`)));
          done();
        }
        catch (e) {
          done(e);
        }
      });
  });

  it(`leaves the original value if the file specified in @ value doesn't exist`, (done) => {
    sinon.stub(fs, 'existsSync').callsFake(_ => false);
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '@file.txt', '-o', 'text'])
      .then(_ => {
        try {
          assert(cliLogStub.calledWith('@file.txt'));
          done();
        }
        catch (e) {
          done(e);
        }
      }, e => done(`Error: ${e}`));
  });

  it(`closes with error when processing options failed`, (done) => {
    sinon.stub(mockCommand, 'processOptions').callsFake(() => Promise.reject('Error'));
    cli
      .execute(rootFolder, ['cli', 'mock', '-x', '123'])
      .then(_ => {
        done('Passed while error expected');
      }, e => {
        try {
          assert.strictEqual(e.name, 'Error');
          done();
        }
        catch (er) {
          done(er);
        }
      });
  });

  it(`logs output to console`, () => {
    Utils.restore((Cli as any).log);
    const consoleLogSpy: sinon.SinonSpy = sinon.stub(console, 'log').callsFake(() => { });
    (Cli as any).log('Message');
    assert(consoleLogSpy.calledWith('Message'));
  });

  it(`logs empty line to console when no message specified`, () => {
    Utils.restore((Cli as any).log);
    const consoleLogSpy: sinon.SinonSpy = sinon.stub(console, 'log').callsFake(() => { });
    (Cli as any).log();
    assert(consoleLogSpy.calledWith());
  });

  it(`logs error to console stderr`, () => {
    Utils.restore((Cli as any).error);
    const consoleErrorSpy: sinon.SinonSpy = sinon.stub(console, 'error').callsFake(() => { });
    (Cli as any).error('Message');
    assert(consoleErrorSpy.calledWith('Message'));
  });

  it(`logs error to console stdout when stdout configured as error output`, () => {
    const config = cli.config;
    sinon.stub(config, 'get').callsFake(() => 'stdout');
    Utils.restore((Cli as any).error);
    const consoleErrorSpy: sinon.SinonSpy = sinon.stub(console, 'error').callsFake(() => { });
    const consoleLogSpy: sinon.SinonSpy = sinon.stub(console, 'log').callsFake(() => { });

    (Cli as any).error('Message');
    assert(consoleErrorSpy.notCalled, 'console.error called');
    assert(consoleLogSpy.calledWith('Message'), 'console.log not called with the right message');
  });

  it(`returns stored configuration value when available`, () => {
    const config = cli.config;
    sinon.stub(config, 'get').callsFake(() => 'value');
    const actualValue = cli.getSettingWithDefaultValue('key', '');
    assert.strictEqual(actualValue, 'value');
  });
});
