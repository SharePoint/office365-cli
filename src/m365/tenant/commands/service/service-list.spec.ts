import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError, CommandOption } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./service-list');

describe(commands.SERVICE_LIST, () => {
  let log: any[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;

  const jsonOutput = {
    "value": [
      {
        "Id": "Bookings",
        "DisplayName": "Microsoft Bookings",
        "Features": [
          {
            "DisplayName": "Microsoft Bookings",
            "Name": "MicrosoftBookings"
          }
        ]
      },
      {
        "Id": "DynamicsCRM",
        "DisplayName": "Dynamics 365",
        "Features": [
          {
            "DisplayName": "Sign In",
            "Name": "signin"
          },
          {
            "DisplayName": "Sign up and administration",
            "Name": "admin"
          },
          {
            "DisplayName": "Organization access",
            "Name": "orgaccess"
          },
          {
            "DisplayName": "Organization performance",
            "Name": "orgperf"
          },
          {
            "DisplayName": "Components/Features",
            "Name": "crmcomponents"
          }
        ]
      }
    ]
  };

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    sinon.stub(Utils, 'getTenantIdFromAccessToken').callsFake(() => '31537af4-6d77-4bb9-a681-d2394888ea26');

    auth.service.connected = true;
    if (!auth.service.accessTokens[auth.defaultResource]) {
      auth.service.accessTokens[auth.defaultResource] = {
        expiresOn: 'abc',
        accessToken: 'abc'
      };
    }
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
      appInsights.trackEvent,
      Utils.getTenantIdFromAccessToken
    ]);
    auth.service.connected = false;
  });

  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.SERVICE_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['Id', 'DisplayName']);
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

  it('handles promise error while getting services available in Microsoft 365', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Services') > -1) {
        return Promise.reject('An error has occurred');
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {

      }
    }, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the services available in Microsoft 365', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Services') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'text',
        debug: false
      }
    }, () => {
      try {
        assert(loggerLogSpy.calledWith(jsonOutput.value));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the services available in Microsoft 365 (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Services') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'text',
        debug: true
      }
    }, () => {
      try {
        assert(loggerLogSpy.calledWith(jsonOutput.value));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });
}); 