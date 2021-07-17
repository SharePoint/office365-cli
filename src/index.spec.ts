import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as aadCommands from './m365/aad/commands';
import * as cliCommands from './m365/cli/commands';
import * as globalCommands from './m365/commands/commands';
import * as flowCommands from './m365/flow/commands';
import * as graphCommands from './m365/graph/commands';
import * as oneDriveCommands from './m365/onedrive/commands';
import * as outlookCommands from './m365/outlook/commands';
import * as paCommands from './m365/pa/commands';
import * as plannerCommands from './m365/planner/commands';
import * as spfxCommands from './m365/spfx/commands';
import * as spoCommands from './m365/spo/commands';
import * as teamsCommands from './m365/teams/commands';
import * as tenantCommands from './m365/tenant/commands';
import * as utilCommands from './m365/util/commands';
import * as yammerCommands from './m365/yammer/commands';


describe('Lazy loading commands', () => {
  it('has all commands stored in correct paths that allow lazy loading', () => {
    const commandCollections: any[] = [
      globalCommands.default,
      aadCommands.default,
      cliCommands.default,
      flowCommands.default,
      graphCommands.default,
      oneDriveCommands.default,
      outlookCommands.default,
      paCommands.default,
      plannerCommands.default,
      spfxCommands.default,
      spoCommands.default,
      teamsCommands.default,
      tenantCommands.default,
      utilCommands.default,
      yammerCommands.default
    ];
    const aliases: string[] = [
      'consent',
      'flow connector export',
      'flow connector list',
      'outlook sendmail',
      'spo site classic remove',
      'spo sp grant add',
      'spo sp grant list',
      'spo sp grant revoke',
      'spo sp permissionrequest approve',
      'spo sp permissionrequest deny',
      'spo sp permissionrequest list',
      'spo sp set',
      'teams team get',
      'teams user add',
      'teams user list',
      'teams user remove',
      'teams user set',
      'aad o365group restore'
    ];
    const allCommandNames: string[] = [];

    commandCollections.forEach(commandsCollection => {
      for (const commandName in commandsCollection) {
        allCommandNames.push(commandsCollection[commandName]);
      }
    });

    const incorrectFilePaths: string[] = [];
    allCommandNames.forEach(commandName => {
      if (aliases.indexOf(commandName) > -1) {
        // aliases can't be resolved to file names
        return;
      }

      const words: string[] = commandName.split(' ');
      let commandFilePath: string = '';
      if (words.length === 1) {
        commandFilePath = path.join('m365', 'commands', `${commandName}.js`);
      }
      else {
        if (words.length === 2) {
          commandFilePath = path.join('m365', words[0], 'commands', `${words.join('-')}.js`);
        }
        else {
          commandFilePath = path.join('m365', words[0], 'commands', words[1], words.slice(1).join('-') + '.js');
        }
      }

      if (!fs.existsSync(path.join(__dirname, commandFilePath))) {
        incorrectFilePaths.push(commandFilePath);
      }
    });

    assert.deepStrictEqual(incorrectFilePaths, []);
  });
});
