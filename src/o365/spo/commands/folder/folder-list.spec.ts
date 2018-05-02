import commands from '../../commands';
import Command, { CommandValidate, CommandOption, CommandError } from '../../../../Command';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth, { Site } from '../../SpoAuth';
const command: Command = require('./folder-list');
import * as assert from 'assert';
import * as request from 'request-promise-native';
import Utils from '../../../../Utils';

describe(commands.FOLDER_LIST, () => {
  let vorpal: Vorpal;
  let log: any[];
  let cmdInstance: any;
  let cmdInstanceLogSpy: sinon.SinonSpy;
  let trackEvent: any;
  let telemetry: any;
  let stubGetResponses: any;

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(auth, 'getAccessToken').callsFake(() => { return Promise.resolve('ABC'); });
    trackEvent = sinon.stub(appInsights, 'trackEvent').callsFake((t) => {
      telemetry = t;
    });

    stubGetResponses = (getResp = null) => {
      return sinon.stub(request, 'get').callsFake((opts) => {
        if (opts.url.indexOf('GetFolderByServerRelativeUrl') > -1) {
          if (getResp) {
            return getResp;
          } else {
            return Promise.resolve({value:[{"Exists":true,"IsWOPIEnabled":false,"ItemCount":2,"Name":"Test","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/Test","TimeCreated":"2018-04-23T21:29:40Z","TimeLastModified":"2018-04-23T21:32:13Z","UniqueId":"3e735407-9c9f-418b-8378-450a9888d815","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"velin12","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/velin12","TimeCreated":"2018-05-02T22:28:50Z","TimeLastModified":"2018-05-02T22:36:14Z","UniqueId":"edeb37c6-8502-4a35-9fa2-6934bfc30214","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"test111","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/test111","TimeCreated":"2018-05-02T23:21:45Z","TimeLastModified":"2018-05-02T23:21:45Z","UniqueId":"0ac3da45-cacf-4c31-9b38-9ef3697d5a66","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"Forms","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/Forms","TimeCreated":"2018-02-15T13:57:52Z","TimeLastModified":"2018-02-15T13:57:52Z","UniqueId":"cbb96da6-c2d8-4af0-9451-d534d5949371","WelcomePage":""}]});
          }
        }
  
        return Promise.reject('Invalid request');
      });
    }
  });

  beforeEach(() => {
    vorpal = require('../../../../vorpal-init');
    log = [];
    cmdInstance = {
      log: (msg: string) => {
        log.push(msg);
      }
    };
    cmdInstanceLogSpy = sinon.spy(cmdInstance, 'log');
    auth.site = new Site();
    telemetry = null;
  });

  afterEach(() => {
    Utils.restore([
      vorpal.find,
      request.get
    ]);
  });

  after(() => {
    Utils.restore([
      appInsights.trackEvent,
      auth.getAccessToken,
      auth.restoreAuth,
      request.get
    ]);
  });

  it('has correct name', () => {
    assert.equal(command.name.startsWith(commands.FOLDER_LIST), true);
  });

  it('has a description', () => {
    assert.notEqual(command.description, null);
  });

  it('calls telemetry', (done) => {
    cmdInstance.action = command.action();
    cmdInstance.action({ options: {} }, () => {
      try {
        assert(trackEvent.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('logs correct telemetry event', (done) => {
    cmdInstance.action = command.action();
    cmdInstance.action({ options: {} }, () => {
      try {
        assert.equal(telemetry.name, commands.FOLDER_LIST);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('aborts when not connected to a SharePoint site', (done) => {
    auth.site = new Site();
    auth.site.connected = false;
    cmdInstance.action = command.action();
    cmdInstance.action({ options: { debug: false, webUrl: 'https://contoso.sharepoint.com', folderUrl: '/Shared Documents' } }, () => {
      try {
        assert(cmdInstanceLogSpy.calledWith(new CommandError('Connect to a SharePoint Online site first')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('should correctly handle folder get reject request', (done) => {
    stubGetResponses(new Promise((res, rej)=>rej('error1')));

    auth.site = new Site();
    auth.site.connected = true;
    auth.site.url = 'https://contoso.sharepoint.com';
    cmdInstance.action = command.action();

    cmdInstance.action({
      options: {
        debug: true,
        webUrl: 'https://contoso.sharepoint.com',
        folderUrl: '/Shared Documents',
      }
    }, () => {

      try {
        assert(cmdInstanceLogSpy.calledWith(new CommandError('error1')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('should correctly handle folder get success request', (done) => {
    stubGetResponses();

    auth.site = new Site();
    auth.site.connected = true;
    auth.site.url = 'https://contoso.sharepoint.com';
    cmdInstance.action = command.action();

    cmdInstance.action({
      options: {
        debug: true,
        webUrl: 'https://contoso.sharepoint.com',
        folderUrl: '/Shared Documents',
      }
    }, () => {
      try {
        assert(cmdInstanceLogSpy.lastCall.calledWith([{"Exists":true,"IsWOPIEnabled":false,"ItemCount":2,"Name":"Test","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/Test","TimeCreated":"2018-04-23T21:29:40Z","TimeLastModified":"2018-04-23T21:32:13Z","UniqueId":"3e735407-9c9f-418b-8378-450a9888d815","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"velin12","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/velin12","TimeCreated":"2018-05-02T22:28:50Z","TimeLastModified":"2018-05-02T22:36:14Z","UniqueId":"edeb37c6-8502-4a35-9fa2-6934bfc30214","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"test111","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/test111","TimeCreated":"2018-05-02T23:21:45Z","TimeLastModified":"2018-05-02T23:21:45Z","UniqueId":"0ac3da45-cacf-4c31-9b38-9ef3697d5a66","WelcomePage":""},{"Exists":true,"IsWOPIEnabled":false,"ItemCount":0,"Name":"Forms","ProgID":null,"ServerRelativeUrl":"/sites/abc/Shared Documents/Forms","TimeCreated":"2018-02-15T13:57:52Z","TimeLastModified":"2018-02-15T13:57:52Z","UniqueId":"cbb96da6-c2d8-4af0-9451-d534d5949371","WelcomePage":""}]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('should send correct request params when /', (done) => {
    let request: sinon.SinonStub = stubGetResponses();

    auth.site = new Site();
    auth.site.connected = true;
    auth.site.url = 'https://contoso.sharepoint.com';
    cmdInstance.action = command.action();

    cmdInstance.action({
      options: {
        debug: false,
        webUrl: 'https://contoso.sharepoint.com',
        folderUrl: '/Shared Documents',
      }
    }, () => {
      try {
        const lastCall: any = request.lastCall.args[0];
        assert.equal(lastCall.url, 'https://contoso.sharepoint.com/_api/web/GetFolderByServerRelativeUrl(\'%2FShared%20Documents\')/folders');
        assert.equal(lastCall.headers.authorization, 'Bearer ABC');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('should send correct request params when /sites/abc', (done) => {
    let request: sinon.SinonStub = stubGetResponses();

    auth.site = new Site();
    auth.site.connected = true;
    auth.site.url = 'https://contoso.sharepoint.com/sites/abc';
    cmdInstance.action = command.action();

    cmdInstance.action({
      options: {
        verbose: true,
        webUrl: 'https://contoso.sharepoint.com/sites/abc',
        folderUrl: '/Shared Documents',
      }
    }, () => {
      try {
        const lastCall: any = request.lastCall.args[0];
        assert.equal(lastCall.url, 'https://contoso.sharepoint.com/sites/abc/_api/web/GetFolderByServerRelativeUrl(\'%2Fsites%2Fabc%2FShared%20Documents\')/folders');
        assert.equal(lastCall.headers.authorization, 'Bearer ABC');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('supports debug mode', () => {
    const options = (command.options() as CommandOption[]);
    let containsDebugOption = false;
    options.forEach(o => {
      if (o.option === '--debug') {
        containsDebugOption = true;
      }
    });
    assert(containsDebugOption);
  });

  it('supports specifying URL', () => {
    const options = (command.options() as CommandOption[]);
    let containsTypeOption = false;
    options.forEach(o => {
      if (o.option.indexOf('<webUrl>') > -1) {
        containsTypeOption = true;
      }
    });
    assert(containsTypeOption);
  });

  it('fails validation if the webUrl option not specified', () => {
    const actual = (command.validate() as CommandValidate)({ options: { folderUrl: '/Shared Documents' } });
    assert.notEqual(actual, true);
  });

  it('fails validation if the webUrl option is not a valid SharePoint site URL', () => {
    const actual = (command.validate() as CommandValidate)({ options: { webUrl: 'foo', folderUrl: '/Shared Documents' } });
    assert.notEqual(actual, true);
  });

  it('passes validation if the webUrl option is a valid SharePoint site URL and folderUrl specified', () => {
    const actual = (command.validate() as CommandValidate)({ options: { webUrl: 'https://contoso.sharepoint.com', folderUrl: '/Shared Documents' } });
    assert.equal(actual, true);
  });

  it('fails validation if the folderUrl option not specified', () => {
    const actual = (command.validate() as CommandValidate)({ options: { webUrl: 'https://contoso.sharepoint.com' } });
    assert.notEqual(actual, true);
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
    assert(find.calledWith(commands.FOLDER_LIST));
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

  it('correctly handles lack of valid access token', (done) => {
    Utils.restore(auth.getAccessToken);
    sinon.stub(auth, 'getAccessToken').callsFake(() => { return Promise.reject(new Error('Error getting access token')); });
    auth.site = new Site();
    auth.site.connected = true;
    auth.site.url = 'https://contoso.sharepoint.com';
    cmdInstance.action = command.action();
    cmdInstance.action({
      options: {
        webUrl: "https://contoso.sharepoint.com",
        folderUrl: '/Shared Documents',
        debug: false
      }
    }, () => {
      try {
        assert(cmdInstanceLogSpy.calledWith(new CommandError('Error getting access token')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });
});