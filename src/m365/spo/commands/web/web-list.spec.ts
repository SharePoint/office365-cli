import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./web-list');

describe(commands.WEB_LIST, () => {
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
    assert.strictEqual(command.name.startsWith(commands.WEB_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('defines correct properties for the default output', () => {
    assert.deepStrictEqual(command.defaultProperties(), ['Title', 'Url', 'Id']);
  });

  it('retrieves all webs', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/webs') > -1) {
        return Promise.resolve(
          {
            "value": [{
              "AllowRssFeeds": false,
              "AlternateCssUrl": null,
              "AppInstanceId": "00000000-0000-0000-0000-000000000000",
              "Configuration": 0,
              "Created": null,
              "CurrentChangeToken": null,
              "CustomMasterUrl": null,
              "Description": null,
              "DesignPackageId": null,
              "DocumentLibraryCalloutOfficeWebAppPreviewersDisabled": false,
              "EnableMinimalDownload": false,
              "HorizontalQuickLaunch": false,
              "Id": "d8d179c7-f459-4f90-b592-14b08e84accb",
              "IsMultilingual": false,
              "Language": 1033,
              "LastItemModifiedDate": null,
              "LastItemUserModifiedDate": null,
              "MasterUrl": null,
              "NoCrawl": false,
              "OverwriteTranslationsOnChange": false,
              "ResourcePath": null,
              "QuickLaunchEnabled": false,
              "RecycleBinEnabled": false,
              "ServerRelativeUrl": null,
              "SiteLogoUrl": null,
              "SyndicationEnabled": false,
              "Title": "Subsite",
              "TreeViewEnabled": false,
              "UIVersion": 15,
              "UIVersionConfigurationEnabled": false,
              "Url": "https://Contoso.sharepoint.com/Subsite",
              "WebTemplate": "STS"
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
          "AllowRssFeeds": false,
          "AlternateCssUrl": null,
          "AppInstanceId": "00000000-0000-0000-0000-000000000000",
          "Configuration": 0,
          "Created": null,
          "CurrentChangeToken": null,
          "CustomMasterUrl": null,
          "Description": null,
          "DesignPackageId": null,
          "DocumentLibraryCalloutOfficeWebAppPreviewersDisabled": false,
          "EnableMinimalDownload": false,
          "HorizontalQuickLaunch": false,
          "Id": "d8d179c7-f459-4f90-b592-14b08e84accb",
          "IsMultilingual": false,
          "Language": 1033,
          "LastItemModifiedDate": null,
          "LastItemUserModifiedDate": null,
          "MasterUrl": null,
          "NoCrawl": false,
          "OverwriteTranslationsOnChange": false,
          "ResourcePath": null,
          "QuickLaunchEnabled": false,
          "RecycleBinEnabled": false,
          "ServerRelativeUrl": null,
          "SiteLogoUrl": null,
          "SyndicationEnabled": false,
          "Title": "Subsite",
          "TreeViewEnabled": false,
          "UIVersion": 15,
          "UIVersionConfigurationEnabled": false,
          "Url": "https://Contoso.sharepoint.com/Subsite",
          "WebTemplate": "STS"
        }]));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('command correctly handles web list reject request', (done) => {
    const err = 'Invalid request';
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('/_api/web/webs') > -1) {
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

  it('uses correct API url when output json option is passed', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      logger.log('Test Url:');
      logger.log(opts.url);
      if ((opts.url as string).indexOf('select123=') > -1) {
        return Promise.resolve('Correct Url1');
      }

      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'json',
        debug: false,
        webUrl: 'https://contoso.sharepoint.com'
      }
    }, () => {

      try {
        assert('Correct Url');
        done();
      }
      catch (e) {
        done(e);
      }
    });
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

  it('passes validation if the url option is a valid SharePoint site URL', () => {
    const actual = command.validate({ options: { webUrl: 'https://contoso.sharepoint.com' } });
    assert.strictEqual(actual, true);
  });
});