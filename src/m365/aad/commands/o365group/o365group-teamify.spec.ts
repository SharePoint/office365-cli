import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./o365group-teamify');

describe(commands.O365GROUP_TEAMIFY, () => {
  let log: string[];
  let logger: Logger;

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
    (command as any).items = [];
  });

  afterEach(() => {
    Utils.restore([
      request.put
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
    assert.strictEqual(command.name.startsWith(commands.O365GROUP_TEAMIFY), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('validates for a correct input.', (done) => {
    const actual = command.validate({
      options: {
        groupId: '8231f9f2-701f-4c6e-93ce-ecb563e3c1ee'
      }
    });
    assert.strictEqual(actual, true);
    done();
  });

  it('o365group teamify success', (done) => {
    const requestStub: sinon.SinonStub = sinon.stub(request, 'put').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/groups/8231f9f2-701f-4c6e-93ce-ecb563e3c1ee/team`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams/$entity",
          "id": "8231f9f2-701f-4c6e-93ce-ecb563e3c1ee",
          "createdDateTime": null,
          "displayName": "Group Team",
          "description": "Group Team description",
          "internalId": "19:ASjdflg-xKFnjueOwbm3es6HF2zx3Ki57MyfDFrjeg01@thread.tacv2",
          "classification": null,
          "specialization": null,
          "visibility": "public",
          "webUrl": "https://teams.microsoft.com/l/team/19:ASjdflg-xKFnjueOwbm3es6HF2zx3Ki57MyfDFrjeg01%40thread.tacv2/conversations?groupId=8231f9f2-701f-4c6e-93ce-ecb563e3c1ee&tenantId=3a7a651b-2620-433b-a1a3-42de27ae94e8",
          "isArchived": null,
          "isMembershipLimitedToOwners": false,
          "discoverySettings": null,
          "memberSettings": {
            "allowCreateUpdateChannels": true,
            "allowCreatePrivateChannels": true,
            "allowDeleteChannels": true,
            "allowAddRemoveApps": true,
            "allowCreateUpdateRemoveTabs": true,
            "allowCreateUpdateRemoveConnectors": true
          },
          "guestSettings": {
            "allowCreateUpdateChannels": false,
            "allowDeleteChannels": false
          },
          "messagingSettings": {
            "allowUserEditMessages": true,
            "allowUserDeleteMessages": true,
            "allowOwnerDeleteMessages": true,
            "allowTeamMentions": true,
            "allowChannelMentions": true
          },
          "funSettings": {
            "allowGiphy": true,
            "giphyContentRating": "moderate",
            "allowStickersAndMemes": true,
            "allowCustomMemes": true
          }
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: { debug: false, groupId: '8231f9f2-701f-4c6e-93ce-ecb563e3c1ee' }
    }, () => {
      try {
        assert.strictEqual(requestStub.lastCall.args[0].url, 'https://graph.microsoft.com/v1.0/groups/8231f9f2-701f-4c6e-93ce-ecb563e3c1ee/team');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('should handle Microsoft graph error response', (done) => {
    sinon.stub(request, 'put').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/groups/8231f9f2-701f-4c6e-93ce-ecb563e3c1ee/team`) {
        return Promise.reject({
          "error": {
            "code": "NotFound",
            "message": "Failed to execute MS Graph backend request GetGroupInternalApiRequest",
            "innerError": {
              "date": "2021-06-19T03:00:13",
              "request-id": "0e3f93f6-d3f7-4d84-9eb5-dc2dda0eec0e",
              "client-request-id": "68cff2aa-b010-daa7-2467-fa8e96cbda25"
            }
          }
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: { debug: false, groupId: '8231f9f2-701f-4c6e-93ce-ecb563e3c1ee' }
    } as any, (err?: any) => {
      try {
        assert.strictEqual(err.message, 'Failed to execute MS Graph backend request GetGroupInternalApiRequest');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('fails validation if the groupId is not a valid GUID', () => {
    const actual = command.validate({ options: { groupId: 'invalid' } });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation if the groupId is a valid GUID', () => {
    const actual = command.validate({ options: { groupId: '8231f9f2-701f-4c6e-93ce-ecb563e3c1ee' } });
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