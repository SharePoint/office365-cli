import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./status-list');

describe(commands.STATUS_LIST, () => {
  let log: any[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;

  const jsonOutput = {
    "value": [
      {
        "FeatureStatus": [
          {
            "FeatureDisplayName": "Service",
            "FeatureName": "service",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Form functionality",
            "FeatureName": "functionality",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Integration",
            "FeatureName": "integration",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          }
        ],
        "Id": "Forms",
        "IncidentIds": [],
        "Status": "ServiceOperational",
        "StatusDisplayName": "Normal service",
        "StatusTime": "2020-09-18T13:15:36.6847769Z",
        "Workload": "Forms",
        "WorkloadDisplayName": "Microsoft Forms"
      },
      {
        "FeatureStatus": [
          {
            "FeatureDisplayName": "Planner",
            "FeatureName": "Planner",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          }
        ],
        "Id": "Planner",
        "IncidentIds": [],
        "Status": "ServiceOperational",
        "StatusDisplayName": "Normal service",
        "StatusTime": "2020-09-18T13:15:36.6847769Z",
        "Workload": "Planner",
        "WorkloadDisplayName": "Planner"
      },
      {
        "FeatureStatus": [
          {
            "FeatureDisplayName": "Playback",
            "FeatureName": "Playback",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Live Events",
            "FeatureName": "Live Events",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Stream website",
            "FeatureName": "Stream website",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          }
        ],
        "Id": "Stream",
        "IncidentIds": [],
        "Status": "ServiceOperational",
        "StatusDisplayName": "Normal service",
        "StatusTime": "2020-09-18T13:15:36.6847769Z",
        "Workload": "Stream",
        "WorkloadDisplayName": "Microsoft Stream"
      },
      {
        "FeatureStatus": [
          {
            "FeatureDisplayName": "Provisioning",
            "FeatureName": "provisioning",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "SharePoint Features",
            "FeatureName": "spofeatures",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Tenant Admin",
            "FeatureName": "tenantadmin",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Search and Delve",
            "FeatureName": "search",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Custom Solutions and Workflows",
            "FeatureName": "customsolutionsworkflows",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Project Online",
            "FeatureName": "projectonline",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Office Web Apps",
            "FeatureName": "officewebapps",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "SP Designer",
            "FeatureName": "spdesigner",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Access Services",
            "FeatureName": "accessservices",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "InfoPath Online",
            "FeatureName": "infopathonline",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          }
        ],
        "Id": "SharePoint",
        "IncidentIds": [],
        "Status": "ServiceOperational",
        "StatusDisplayName": "Normal service",
        "StatusTime": "2020-09-18T13:15:36.6847769Z",
        "Workload": "SharePoint",
        "WorkloadDisplayName": "SharePoint Online"
      }
    ]
  };

  const jsonOutputForms = {
    "value": [
      {
        "FeatureStatus": [
          {
            "FeatureDisplayName": "Service",
            "FeatureName": "service",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Form functionality",
            "FeatureName": "functionality",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          },
          {
            "FeatureDisplayName": "Integration",
            "FeatureName": "integration",
            "FeatureServiceStatus": "ServiceOperational",
            "FeatureServiceStatusDisplayName": "Normal service"
          }
        ],
        "Id": "Forms",
        "IncidentIds": [],
        "Status": "ServiceOperational",
        "StatusDisplayName": "Normal service",
        "StatusTime": "2020-09-18T13:15:36.6847769Z",
        "Workload": "Forms",
        "WorkloadDisplayName": "Microsoft Forms"
      }
    ]
  };

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    auth.service.connected = true;

    auth.service.accessTokens['https://graph.microsoft.com'] = {
      expiresOn: 'abc',
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ing0NTh4eU9wbHNNMkg3TlhrMlN4MTd4MXVwYyIsImtpZCI6Ing0NTh4eU9wbHNNMkg3TlhrN1N4MTd4MXVwYyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLndpbmRvd3MubmV0IiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2FlZTMyZTYtNDA1ZC00MjRhLTljZjEtMjA3MWQwNDdmMjk4LyIsImlhdCI6MTUxNTAwNDc4NCwibmJmIjoxNTE1MDA0Nzg0LCJleHAiOjE1MTUwMDg2ODQsImFjciI6IjEiLCJhaW8iOiJBQVdIMi84R0FBQUFPN3c0TDBXaHZLZ1kvTXAxTGJMWFdhd2NpOEpXUUpITmpKUGNiT2RBM1BvPSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiIwNGIwNzc5NS04ZGRiLTQ2MWEtYmJlZS0wMmY5ZTFiZjdiNDYiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkRvZSIsImdpdmVuX25hbWUiOiJKb2huIiwiaXBhZGRyIjoiOC44LjguOCIsIm5hbWUiOiJKb2huIERvZSIsIm9pZCI6ImYzZTU5NDkxLWZjMWEtNDdjYy1hMWYwLTk1ZWQ0NTk4MzcxNyIsInB1aWQiOiIxMDk0N0ZGRUE2OEJDQ0NFIiwic2NwIjoiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwic3ViIjoiemZicmtUV1VQdEdWUUg1aGZRckpvVGp3TTBrUDRsY3NnLTJqeUFJb0JuOCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6ImNhZWUzM2U2LTQwNWQtNDU0YS05Y2YxLTMwNzFkMjQxYTI5OCIsInVuaXF1ZV9uYW1lIjoiYWRtaW5AY29udG9zby5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJhZG1pbkBjb250b3NvLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6ImFUZVdpelVmUTBheFBLMVRUVXhsQUEiLCJ2ZXIiOiIxLjAifQ==.abc'
    };
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
    assert.strictEqual(command.name.startsWith(commands.STATUS_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['WorkloadDisplayName', 'StatusDisplayName']);
  });

  it('supports debug mode', () => {
    const options = command.options();
    let containsDebugOption = false;
    options.forEach(o => {
      if (o.option === '--debug') {
        containsDebugOption = true;
      }
    });
    assert(containsDebugOption);
  });

  it('handles promise error while getting status of Microsoft 365 services', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/CurrentStatus') > -1) {
        return Promise.reject('An error has occurred');
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {

      }
    } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the status of Microsoft 365 services', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/CurrentStatus') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
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

  it('gets the status of Microsoft 365 services (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/CurrentStatus') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
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

  it('gets the status of Microsoft 365 services with Workload', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/CurrentStatus') > -1) {
        return Promise.resolve(jsonOutputForms);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        workload: 'Forms',
        debug: false
      }
    } as any, () => {
      try {
        assert(loggerLogSpy.calledWith(jsonOutputForms.value));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the status of Microsoft 365 services with Workload (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/CurrentStatus') > -1) {
        return Promise.resolve(jsonOutputForms);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        workload: 'Forms',
        debug: true
      }
    } as any, () => {
      try {
        assert(loggerLogSpy.calledWith(jsonOutputForms.value));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });
});