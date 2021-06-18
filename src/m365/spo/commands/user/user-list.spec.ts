import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./user-list');

describe(commands.USER_LIST, () => {
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
    assert.strictEqual(command.name.startsWith(commands.USER_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['Id', 'Title', 'LoginName']);
  });

  it('retrieves lists of site users with output option json', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/siteusers') > -1) {
        return Promise.resolve(
          {
            "value": [{
              "Id": 6,
              "IsHiddenInUI": false,
              "LoginName": "i:0#.f|membership|john.doe@mytenant.onmicrosoft.com",
              "Title": "John Doe",
              "PrincipalType": 1,
              "Email": "john.deo@mytenant.onmicrosoft.com",
              "Expiration": "",
              "IsEmailAuthenticationGuestUser": false,
              "IsShareByEmailGuestUser": false,
              "IsSiteAdmin": true,
              "UserId": { "NameId": "10010001b0c19a2", "NameIdIssuer": "urn:federation:microsoftonline" },
              "UserPrincipalName": "john.doe@mytenant.onmicrosoft.com"
            },
            {
              "Id": 7,
              "IsHiddenInUI": false,
              "LoginName": "i:0#.f|membership|abc@mytenant.onmicrosoft.com",
              "Title": "FName Lname",
              "PrincipalType": 1,
              "Email": "abc@mytenant.onmicrosoft.com",
              "Expiration": "",
              "IsEmailAuthenticationGuestUser": false,
              "IsShareByEmailGuestUser": false,
              "IsSiteAdmin": false,
              "UserId": { "NameId": "1003201096515567", "NameIdIssuer": "urn:federation:microsoftonline" },
              "UserPrincipalName": "abc@mytenant.onmicrosoft.com"
            }]
          }
        );
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'json',
        debug: true,
        webUrl: 'https://contoso.sharepoint.com'
      }
    }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          Id: 6,
          IsHiddenInUI: false,
          LoginName: "i:0#.f|membership|john.doe@mytenant.onmicrosoft.com",
          Title: "John Doe",
          PrincipalType: 1,
          Email: "john.deo@mytenant.onmicrosoft.com",
          Expiration: "",
          IsEmailAuthenticationGuestUser: false,
          IsShareByEmailGuestUser: false,
          IsSiteAdmin: true,
          UserId: { NameId: "10010001b0c19a2", NameIdIssuer: "urn:federation:microsoftonline" },
          UserPrincipalName: "john.doe@mytenant.onmicrosoft.com"
        },
        {
          Id: 7,
          IsHiddenInUI: false,
          LoginName: "i:0#.f|membership|abc@mytenant.onmicrosoft.com",
          Title: "FName Lname",
          PrincipalType: 1,
          Email: "abc@mytenant.onmicrosoft.com",
          Expiration: "",
          IsEmailAuthenticationGuestUser: false,
          IsShareByEmailGuestUser: false,
          IsSiteAdmin: false,
          UserId: { NameId: "1003201096515567", NameIdIssuer: "urn:federation:microsoftonline" },
          UserPrincipalName: "abc@mytenant.onmicrosoft.com"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('retrieves lists of site users', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/siteusers') > -1) {
        return Promise.resolve(
          {
            "value": [{
              "Id": 6,
              "Title": "John Doe",
              "Email": "john.deo@mytenant.onmicrosoft.com",
              "LoginName": "i:0#.f|membership|john.doe@mytenant.onmicrosoft.com"
            },
            {
              "Id": 7,
              "Title": "FName Lname",
              "Email": "abc@mytenant.onmicrosoft.com",
              "LoginName": "i:0#.f|membership|abc@mytenant.onmicrosoft.com"
            }]
          }
        );
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        debug: true,
        webUrl: 'https://contoso.sharepoint.com'
      }
    }, () => {
      try {
        assert(loggerLogSpy.calledWith([{
          "Id": 6,
          "Title": "John Doe",
          "Email": "john.deo@mytenant.onmicrosoft.com",
          "LoginName": "i:0#.f|membership|john.doe@mytenant.onmicrosoft.com"
        },
        {
          "Id": 7,
          "Title": "FName Lname",
          "Email": "abc@mytenant.onmicrosoft.com",
          "LoginName": "i:0#.f|membership|abc@mytenant.onmicrosoft.com"
        }]));
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

  it('passes validation if the url is valid', () => {
    const actual = command.validate({ options: { webUrl: 'https://contoso.sharepoint.com' } });
    assert.strictEqual(actual, true);
  });
});