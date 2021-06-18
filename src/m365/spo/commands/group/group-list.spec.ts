import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./group-list');

describe(commands.GROUP_LIST, () => {
  let log: any[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;
  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    auth.service.connected = true;
  });

  beforeEach(() => {
    log = [];
    logger = {
      log: (msg: string) => {
        log.push(msg);
      },
      logRaw: (msg: string) => {
        log.push(msg);
      },
      logToStderr: (msg: string) => {
        log.push(msg);
      }
    };
    loggerLogSpy = sinon.spy(logger, 'log');
  });

  afterEach(() => {
    Utils.restore([
      request.get
    ]);
  });

  after(() => {
    Utils.restore([
      auth.restoreAuth,
      appInsights.trackEvent
    ]);
    auth.service.connected = false;
  });

  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.GROUP_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['Id', 'Title', 'LoginName', 'IsHiddenInUI', 'PrincipalType']);
  });

  it('retrieves all groups with', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/sitegroups') > -1) {
        return Promise.resolve(
          {
            "value": [
              {
                "Id": 15,
                "Title": "Contoso Members",
                "LoginName": "Contoso Members",
                "Description": "SharePoint Contoso",
                "IsHiddenInUI": false,
                "PrincipalType": 8
              }
            ]
          }
        );
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        debug: false,
        webUrl: 'https://contoso.sharepoint.com'
      }
    }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          Id: 15,
          Title: "Contoso Members",
          LoginName: "Contoso Members",
          "Description": "SharePoint Contoso",
          IsHiddenInUI: false,
          PrincipalType: 8
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('command correctly handles group list reject request', (done) => {
    const err = 'Invalid request';
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/sitegroups') > -1) {
        return Promise.reject(err);
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        debug: true,
        webUrl: 'https://contoso.sharepoint.com'
      }
    }, (error?: any) => {
      try {
        assert.strictEqual(JSON.stringify(error), JSON.stringify(new CommandError(err)));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('supports specifying URL', () => {
    const options = command.options();
    let containsTypeOption = false;
    options.forEach(o => {
      if (o.option.indexOf('<webUrl>') > -1) {
        containsTypeOption = true;
      }
    });
    assert(containsTypeOption);
  });


  it('fails validation if the url option is not a valid SharePoint site URL', () => {
    const actual = command.validate({ options: { webUrl: 'foo' } });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation url is valid', () => {
    const actual = command.validate({ options: { webUrl: 'https://contoso.sharepoint.com' } });
    assert.strictEqual(actual, true);
  });
});