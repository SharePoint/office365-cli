import * as assert from 'assert';
import * as sinon from 'sinon';
import { Logger } from '../../../../cli';
import request from '../../../../request';
import { CommandError } from '../../../../Command';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command = require('./user-hibp');

describe(commands.USER_HIBP, () => {

  let log: string[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;

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
    (command as any).items = [];
  });

  afterEach(() => {
    Utils.restore([
      request.get
    ]);
  });


  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.USER_HIBP), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('fails validation if userName and apiKey is not specified', () => {
    const actual = command.validate({ options: {} });
    assert.notStrictEqual(actual, true);
  });
  
  it('fails validation if the userName is not a valid UPN', () => {
    const actual = command.validate({ options: { userName: 'invalid' } });
    assert.notStrictEqual(actual, true);
  });

  it('fails validation if apiKey is not specified', () => {
    const actual = command.validate({ options: {userName:"account-exists@hibp-integration-tests.com"} });
    assert.notStrictEqual(actual, true);
  });

  it('passes validation if userName and apiKey is specified', () => {
    const actual = command.validate({ options: { userName: "account-exists@hibp-integration-tests.com", apiKey: "2975xc539c304xf797f665x43f8x557x" } });
    assert.strictEqual(actual, true);
  });

  it('passes validation if domain is specified', () => {
    const actual = command.validate({ options: { userName: "account-exists@hibp-integration-tests.com", apiKey: "2975xc539c304xf797f665x43f8x557x", domain: "domain.com" } });
    assert.strictEqual(actual, true);
  });

  it('checks user is pawned using userName', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://haveibeenpwned.com/api/v3/breachedaccount/account-exists@hibp-integration-tests.com`) {
        return Promise.resolve([{ "Name": "Adobe" }]);
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, userName: 'account-exists@hibp-integration-tests.com' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{ "Name": "Adobe" }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('checks user is pawned using userName and domain', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://haveibeenpwned.com/api/v3/breachedaccount/account-exists@hibp-integration-tests.com?domain=adobe.com`) {
        return Promise.resolve([{ "Name": "Adobe" }]);
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, userName: 'account-exists@hibp-integration-tests.com', domain: "adobe.com" } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{ "Name": "Adobe" }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('checks user is pawned using userName (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://haveibeenpwned.com/api/v3/breachedaccount/account-exists@hibp-integration-tests.com`) {
        return Promise.resolve([{"Name":"Adobe"}]);
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: { debug: false, userName: 'account-exists@hibp-integration-tests.com' } }, () => {
      try {
        assert(loggerLogSpy.calledWith([{"Name":"Adobe"}]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles no pwnage found', (done) => {
    sinon.stub(request, 'get').callsFake(() => {
      return Promise.reject({
        "response": {
          "status": 404
        }
      });
    });

    command.action(logger, { options: { debug: false, userName: 'account-notexists@hibp-integration-tests.com' } }, () => {
      try {
        assert(loggerLogSpy.calledWith("\nGood news — no pwnage found!\n"));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles unauthorized request', (done) => {
    sinon.stub(request, 'get').callsFake(() => {
      return Promise.reject({
        "statusCode": 401,
        "message": "Access denied due to improperly formed hibp-api-key."
      });
    });

    command.action(logger, { options: { debug: false, userName: 'account-notexists@hibp-integration-tests.com' } } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError(err.message)));
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
    options.forEach((o: { option: string; }) => {
      if (o.option === '--debug') {
        containsOption = true;
      }
    });
    assert(containsOption);
  });
});