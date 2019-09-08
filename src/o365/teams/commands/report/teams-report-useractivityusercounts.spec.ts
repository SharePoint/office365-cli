import commands from '../../commands';
import Command, { CommandOption, CommandError, CommandValidate } from '../../../../Command';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
const command: Command = require('./teams-report-useractivityusercounts');
import * as assert from 'assert';
import Utils from '../../../../Utils';
import request from '../../../../request';
import * as fs from 'fs';

describe(commands.TEAMS_REPORT_USERACTIVITYUSERCOUNTS, () => {
  let vorpal: Vorpal;
  let log: string[];
  let cmdInstance: any;
  let cmdInstanceLogSpy: sinon.SinonSpy;
  let writeFileSyncFake = () => { };

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    auth.service.connected = true;
  });

  beforeEach(() => {
    vorpal = require('../../../../vorpal-init');
    log = [];
    cmdInstance = {
      commandWrapper: {
        command: command.name
      },
      action: command.action(),
      log: (msg: string) => {
        log.push(msg);
      }
    };
    cmdInstanceLogSpy = sinon.spy(cmdInstance, 'log');
    (command as any).items = [];
  });

  afterEach(() => {
    Utils.restore([
      vorpal.find,
      request.get,
      fs.writeFileSync
    ]);
  });

  after(() => {
    Utils.restore([
      appInsights.trackEvent,
      auth.restoreAuth
    ]);
    auth.service.connected = false;
  });

  it('has correct name', () => {
    assert.equal(command.name.startsWith(commands.TEAMS_REPORT_USERACTIVITYUSERCOUNTS), true);
  });

  it('has a description', () => {
    assert.notEqual(command.description, null);
  });

  it('fails validation if period option is not passed', () => {
    const actual = (command.validate() as CommandValidate)({ options: {} });
    assert.notEqual(actual, true);
  });

  it('fails validation on invalid period', () => {
    const actual = (command.validate() as CommandValidate)({ options: { period: 'abc' } });
    assert.notEqual(actual, true);
  });

  it('fails validation on invalid output', () => {
    const actual = (command.validate() as CommandValidate)({ options: { output: 'abc' } });
    assert.notEqual(actual, true);
  });

  it('passes validation on valid \'D7\' period', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D7'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'D30\' period', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D30'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'D90\' period', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D90'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'180\' period', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D90'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'text\' output', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D7',
        output: 'text'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'json\' output', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D7',
        output: 'json'
      }
    });
    assert.equal(actual, true);
  });

  it('passes validation on valid \'csv\' output', () => {
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D7',
        output: 'csv'
      }
    });
    assert.equal(actual, true);
  });

  it('fails validation if specified outputFile path doesn\'t exist', () => {
    sinon.stub(fs, 'existsSync').callsFake(() => false);
    const actual = (command.validate() as CommandValidate)({
      options: {
        period: 'D7',
        outputFile: '/path/not/found.zip'
      }
    });
    Utils.restore(fs.existsSync);
    assert.notEqual(actual, true);
  });

  it('gets the number of Microsoft Teams users by activity type for the given period', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });

    cmdInstance.action({ options: { debug: false, period: 'D7' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in txt format', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });

    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.txt' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period when output is json', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });

    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', output: 'json' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.notCalled, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in txt format with output', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });
    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.txt', output: 'text' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in csv format', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });
    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.csv' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in csv format with output', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });
    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.csv', output: 'csv' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in json format', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`
        Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period
        2019-08-28,2019-08-28,0,0,0,0,0,7
        2019-08-28,2019-08-27,0,0,0,0,0,7
        `);
      }

      return Promise.reject('Invalid request');
    });
    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: false, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.json' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the number of Microsoft Teams users by activity type for the given period and export report data in json format with output', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')`) {
        return Promise.resolve(`Report Refresh Date,Report Date,Team Chat Messages,Private Chat Messages,Calls,Meetings,Other Actions,Report Period\n2019-08-28,2019-08-28,0,0,0,0,0,7`);
      }

      return Promise.reject('Invalid request');
    });
    const fileStub: sinon.SinonStub = sinon.stub(fs, 'writeFileSync').callsFake(writeFileSyncFake);

    cmdInstance.action({ options: { debug: true, period: 'D7', outputFile: '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.json', output: 'json' } }, () => {
      try {
        assert.equal(requestStub.lastCall.args[0].url, "https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserCounts(period='D7')");
        assert.equal(requestStub.lastCall.args[0].headers["accept"], 'application/json;odata.metadata=none');
        assert.equal(requestStub.lastCall.args[0].json, true);
        assert.equal(fileStub.called, true);
        assert(cmdInstanceLogSpy.calledWith(`File saved to path '/Users/josephvelliah/Desktop/teams-report-useractivityusercounts.json'`));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles random API error', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => Promise.reject('An error has occurred'));

    cmdInstance.action({ options: { debug: false, period: 'D7' } }, (err?: any) => {
      try {
        assert.equal(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('supports specifying outputFile', () => {
    const options = (command.options() as CommandOption[]);
    let containsOption = false;
    options.forEach(o => {
      if (o.option.indexOf('--outputFile') > -1) {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('supports specifying output', () => {
    const options = (command.options() as CommandOption[]);
    let containsOption = false;
    options.forEach(o => {
      if (o.option.indexOf('--output') > -1) {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('supports debug mode', () => {
    const options = (command.options() as CommandOption[]);
    let containsOption = false;
    options.forEach(o => {
      if (o.option === '--debug') {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('has help referring to the right command', () => {
    const cmd: any = {
      log: (msg: string) => { },
      prompt: () => { },
      helpInformation: () => { }
    };
    const find = sinon.stub(vorpal, 'find').callsFake(() => cmd);
    cmd.help = command.help();
    cmd.help({}, () => { });
    assert(find.calledWith(commands.TEAMS_REPORT_USERACTIVITYUSERCOUNTS));
  });

  it('has help with examples', () => {
    const _log: string[] = [];
    const cmd: any = {
      log: (msg: string) => {
        _log.push(msg);
      },
      prompt: () => { },
      helpInformation: () => { }
    };
    sinon.stub(vorpal, 'find').callsFake(() => cmd);
    cmd.help = command.help();
    cmd.help({}, () => { });
    let containsExamples: boolean = false;
    _log.forEach(l => {
      if (l && l.indexOf('Examples:') > -1) {
        containsExamples = true;
      }
    });
    Utils.restore(vorpal.find);
    assert(containsExamples);
  });
});