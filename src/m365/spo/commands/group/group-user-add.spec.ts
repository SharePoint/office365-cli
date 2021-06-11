import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Cli, Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./group-user-add');

describe(commands.GROUP_USER_ADD, () => {
  let log: string[];
  let logger: Logger;

  const JSONSingleUser =
  {
    ErrorMessage: null,
    IconUrl: "https://contoso.sharepoint.com/sites/SiteA/_layouts/15/images/siteicon.png",
    InvitedUsers: null,
    Name: "Site A",
    PermissionsPageRelativeUrl: null,
    StatusCode: 0,
    UniquelyPermissionedUsers: [],
    Url: "https://contoso.sharepoint.com/sites/SiteA",
    UsersAddedToGroup: [
      {
        AllowedRoles: [
          0
        ],
        CurrentRole: 0,
        DisplayName: "Alex Wilber",
        Email: "Alex.Wilber@contoso.com",
        InvitationLink: null,
        IsUserKnown: true,
        Message: null,
        Status: true,
        User: "i:0#.f|membership|Alex.Wilber@contoso.com"
      }
    ]
  };

  const JSONErrorResponseInvalidGroup =
  {
    ErrorMessage: "Group cannot be found.",
    IconUrl: null,
    InvitedUsers: null,
    Name: null,
    PermissionsPageRelativeUrl: null,
    StatusCode: -9,
    UniquelyPermissionedUsers: null,
    Url: null,
    UsersAddedToGroup: null
  };

  const JSONErrorResponseInvalidUsers =
  {
    ErrorMessage: "Couldn't resolve the users.",
    IconUrl: null,
    InvitedUsers: null,
    Name: null,
    PermissionsPageRelativeUrl: null,
    StatusCode: -9,
    UniquelyPermissionedUsers: null,
    Url: null,
    UsersAddedToGroup: null
  };

  const userInformation: any =
  {
    Id: 6,
    IsHiddenInUI: false,
    LoginName: "i:0#.f|membership|Alex.Wilber@contoso.com",
    Title: "Alex Wilber",
    PrincipalType: 1,
    Email: "Alex.Wilber@contoso.com",
    Expiration: "",
    IsEmailAuthenticationGuestUser: false,
    IsShareByEmailGuestUser: false,
    IsSiteAdmin: false,
    UserId: { NameId: "10010001b0c19a2", NameIdIssuer: "urn:federation:microsoftonline" },
    UserPrincipalName: "Alex.Wilber@contoso.com"
  };

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
    // loggerLogToStderrSpy = sinon.spy(logger, 'logToStderr');
  });

  afterEach(() => {
    Utils.restore([
      request.post,
      Cli.executeCommandWithOutput
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
    assert.strictEqual(command.name.startsWith(commands.GROUP_USER_ADD), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('Adding user to a SharePoint Group', (done) => {
    sinon.stub(Cli, 'executeCommandWithOutput').callsFake(() => Promise.resolve({
      stdout: JSON.stringify(userInformation),
      stderr: ''
    }));

    sinon.stub(request, 'post').callsFake(opts => {
      if (opts.url === 'https://contoso.sharepoint.com/sites/SiteA/_api/SP.Web.ShareObject' &&
        opts.data) {
        return Promise.resolve(JSONSingleUser);
      }

      return Promise.reject(`Invalid request ${JSON.stringify(opts)}`);
    });
    command.action(logger, {
      options: {
        debug: false,
        webUrl: "https://contoso.sharepoint.com/sites/SiteA",
        groupId: 32,
        userName: "Alex.Wilber@contoso.com"
      }
    }, (err?: any) => {
      try {
        assert.strictEqual(typeof err, 'undefined');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('Adding user to a SharePoint Group (DEBUG)', (done) => {
    sinon.stub(Cli, 'executeCommandWithOutput').callsFake(() => Promise.resolve({
      stdout: JSON.stringify(userInformation),
      stderr: ''
    }));

    sinon.stub(request, 'post').callsFake(opts => {
      if (opts.url === 'https://contoso.sharepoint.com/sites/SiteA/_api/SP.Web.ShareObject' &&
        opts.data) {
        return Promise.resolve(JSONSingleUser);
      }

      return Promise.reject(`Invalid request ${JSON.stringify(opts)}`);
    });
    command.action(logger, {
      options: {
        debug: true,
        webUrl: "https://contoso.sharepoint.com/sites/SiteA",
        groupId: 32,
        userName: "Alex.Wilber@contoso.com"
      }
    }, (err?: any) => {
      try {
        assert.strictEqual(typeof err, 'undefined');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('Handles error when adding user to a SharePoint Group - Invalid Group', (done) => {
    sinon.stub(Cli, 'executeCommandWithOutput').callsFake(() => Promise.resolve({
      stdout: JSON.stringify(userInformation),
      stderr: ''
    }));

    sinon.stub(request, 'post').callsFake(opts => {
      if (opts.url === 'https://contoso.sharepoint.com/sites/SiteA/_api/SP.Web.ShareObject' &&
        opts.data) {
        return Promise.resolve(JSONErrorResponseInvalidGroup);
      }

      return Promise.reject(`Invalid request ${JSON.stringify(opts)}`);
    });
    command.action(logger, {
      options: {
        debug: false,
        webUrl: "https://contoso.sharepoint.com/sites/SiteA",
        groupId: 99999999,
        userName: "Alex.Wilber@contoso.com"
      }
    }, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError("Group cannot be found.")));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('Handles error when adding user to a SharePoint Group - Username Does Not exist', (done) => {
    sinon.stub(Cli, 'executeCommandWithOutput').callsFake(() => Promise.reject({
      error: `Couldn't resolve the users.`,
      stderr: `Couldn't resolve the users. stderr`
    }));

    sinon.stub(request, 'post').callsFake(opts => {
      if (opts.url === 'https://contoso.sharepoint.com/sites/SiteA/_api/SP.Web.ShareObject' &&
        opts.data) {
        return Promise.resolve(JSONErrorResponseInvalidUsers);
      }

      return Promise.reject(`Invalid request ${JSON.stringify(opts)}`);
    });

    command.action(logger, {
      options: {
        debug: true,
        webUrl: "https://contoso.sharepoint.com/sites/SiteA",
        groupId: 4,
        userName: "Alex.Wilber@invalidcontoso.onmicrosoft.com"
      }
    }, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError(`Couldn't resolve the users.`)));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('fails validation if webURL is Invalid', () => {
    const actual = command.validate({ options: { webUrl: "InvalidWEBURL", groupId: 32, userName: "Alex.Wilber@contoso.com" } });
    assert.notStrictEqual(actual, true);
  });

  it('fails validation if groupID is Invalid', () => {
    const actual = command.validate({ options: { webUrl: "https://contoso.sharepoint.com/sites/SiteA", groupId: "NOGROUP", userName: "Alex.Wilber@contoso.com" } });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation if all the required options are specified', () => {
    const actual = command.validate({ options: { webUrl: "https://contoso.sharepoint.com/sites/SiteA", groupId: 32, userName: "Alex.Wilber@contoso.com" } });
    assert.strictEqual(actual, true);
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

});