import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./userprofile-get');
describe(commands.USERPROFILE_GET, () => {
  let log: string[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;
  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    sinon.stub(command as any, 'getRequestDigest').callsFake(() => Promise.resolve({ FormDigestValue: 'ABC' }));
    auth.service.connected = true;
    auth.service.spoUrl = 'https://contoso.sharepoint.com';
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
      (command as any).getRequestDigest,
      appInsights.trackEvent
    ]);
    auth.service.connected = true;
    auth.service.spoUrl = undefined;
  });

  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.USERPROFILE_GET), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('gets userprofile information about the specified user', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor') > -1) {
        return Promise.resolve({
          "UserProfileProperties": [
            {
              "Key": "UserProfile_GUID",
              "Value": "f3f102bb-7ac7-408e-9184-384062abd0d5",
            },
            {
              "Key": "SID",
              "Value": "i:0h.f|membership|10032000840f3681@live.com",
            }]
        }
        );
      }
      return Promise.reject('Invalid request');
    });
    command.action(logger, {
      options: {
        output: 'text',
        userName: 'john.doe@contoso.onmicrosoft.com'
      }
    } as any, () => {
      try {
        assert(loggerLogSpy.calledWith([
          {
            key: "UserProfile_GUID",
            Value: "f3f102bb-7ac7-408e-9184-384062abd0d5",
          },
          {
            key: "SID",
            Value: "i:0h.f|membership|10032000840f3681@live.com",
          }
        ]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets userprofile information about the specified user output json', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor') > -1) {
        return Promise.resolve({
          "AccountName": "i:0#.f|membership|dips1802@dev1802.onmicrosoft.com",
          "DirectReports": [],
          "DisplayName": "Dipen Shah",
          "Email": "dips1802@dev1802.onmicrosoft.com",
          "ExtendedManagers": [],
          "ExtendedReports": [
            "i:0#.f|membership|dips1802@dev1802.onmicrosoft.com"
          ],
          "IsFollowed": false,
          "LatestPost": null,
          "Peers": [],
          "PersonalSiteHostUrl": "https://dev1802-my.sharepoint.com:443/",
          "PersonalUrl": "https://dev1802-my.sharepoint.com/personal/dips1802_dev1802_onmicrosoft_com/",
          "PictureUrl": null,
          "Title": null
        });
      }
      return Promise.reject('Invalid request');
    });
    command.action(logger, {
      options: {
        output: 'json',
        debug: true,
        userName: 'john.doe@contoso.onmicrosoft.com'
      }
    } as any, () => {
      try {
        assert(loggerLogSpy.calledWith({
          "AccountName": "i:0#.f|membership|dips1802@dev1802.onmicrosoft.com",
          "DirectReports": [],
          "DisplayName": "Dipen Shah",
          "Email": "dips1802@dev1802.onmicrosoft.com",
          "ExtendedManagers": [],
          "ExtendedReports": [
            "i:0#.f|membership|dips1802@dev1802.onmicrosoft.com"
          ],
          "IsFollowed": false,
          "LatestPost": null,
          "Peers": [],
          "PersonalSiteHostUrl": "https://dev1802-my.sharepoint.com:443/",
          "PersonalUrl": "https://dev1802-my.sharepoint.com/personal/dips1802_dev1802_onmicrosoft_com/",
          "PictureUrl": null,
          "Title": null
        }));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('supports debug mode', () => {
    const options = command.options();
    let containsOption = false;
    options.forEach(o => {
      if (o.option === '--debug') {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('supports specifying userName', () => {
    const options = command.options();
    let containsOption = false;
    options.forEach(o => {
      if (o.option.indexOf('--userName') > -1) {
        containsOption = true;
      }
    });
    assert(containsOption);
  });

  it('fails validation if the user principal name is not a valid', () => {
    const actual = command.validate({ options: { userName: 'abc' } });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation when the user principal name is a valid', () => {
    const actual = command.validate({ options: { userName: 'john.doe@mytenant.onmicrosoft.com' } });
    assert.strictEqual(actual, true);
  });

})