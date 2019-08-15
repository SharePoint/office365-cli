import commands from '../../commands';
import Command, { CommandError, CommandOption } from '../../../../Command';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
const command: Command = require('./orgassetslibrary-list');
import * as assert from 'assert';
import request from '../../../../request';
import Utils from '../../../../Utils';

describe(commands.ORGASSETSLIBRARY_LIST, () => {
  let vorpal: Vorpal;
  let log: any[];
  let cmdInstance: any;
  let cmdInstanceLogSpy: sinon.SinonSpy;

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    sinon.stub(command as any, 'getRequestDigest').callsFake(() => Promise.resolve({
      FormDigestValue: 'abc'
    }));
    auth.service.connected = true;
    auth.service.spoUrl = 'https://contoso.sharepoint.com';
  });

  beforeEach(() => {
    vorpal = require('../../../../vorpal-init');
    log = [];
    cmdInstance = {
      commandWrapper: {
        command: command.name
      },
      action: command.action(),
      log: (msg: string) => {
        log.push(msg);
      }
    };
    cmdInstanceLogSpy = sinon.spy(cmdInstance, 'log');
  });

  afterEach(() => {
    Utils.restore([
      vorpal.find,
      request.post
    ]);
  });

  after(() => {
    Utils.restore([
      auth.restoreAuth,
      appInsights.trackEvent,
      (command as any).getRequestDigest
    ]);
    auth.service.connected = false;
    auth.service.spoUrl = undefined;
  });

  it('has correct name', () => {
    assert.equal(command.name.startsWith(commands.ORGASSETSLIBRARY_LIST), true);
  });

  it('has a description', () => {
    assert.notEqual(command.description, null);
  });

  it('returns a result', (done) => {
    sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url.indexOf(`/_vti_bin/client.svc/ProcessQuery`) > -1) {
        return Promise.resolve(JSON.stringify([
          { "SchemaVersion": "15.0.0.0", "LibraryVersion": "16.0.7025.1207", "ErrorInfo": null, "TraceCorrelationId": "8992299e-a003-4000-7686-fda36e26a53c" }, 6, {
            "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssets",
            "CentralAssetRepositoryLibraries": null,
            "OrgAssetsLibraries": {
              "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssetsLibraryCollection",
              "_Child_Items_": [{
                "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssetsLibrary",
                "DisplayName": "Site Assets",
                "FileType": "jpg",
                "LibraryUrl": {
                  "_ObjectType_": "SP.ResourcePath",
                  "DecodedUrl": "sites\u002fsitedesigns\u002fSiteAssets"
                },
                "ListId": "\/Guid(96c2e234-c996-4877-b3a6-8aebd8ab45b6)\/",
                "OrgAssetType": 1,
                "ThumbnailUrl": {
                  "_ObjectType_": "SP.ResourcePath",
                  "DecodedUrl": "SiteAssets\u002f__siteIcon__.jpg"
                },
                "UniqueId": "\/Guid(0d3c9e72-60f5-40f8-9e29-b91036f5630e)\/"
              }]
            },
            "SiteId": "\/Guid(9f0e0a96-14ec-4d4f-9b04-a8698367cd36)\/",
            "Url": {
              "_ObjectType_": "SP.ResourcePath",
              "DecodedUrl": "\u002fsites\u002fsitedesigns"
            },
            "WebId": "\/Guid(030c8d27-1bb4-4042-a252-dce8ac1e9f00)\/"
          }
        ]));
      }

      return Promise.reject('Invalid request');
    });

    cmdInstance.action({ options: { debug: true, verbose: true } }, () => {
      try {
        assert(cmdInstanceLogSpy.calledWith({
          Url: '/sites/sitedesigns',
          Libraries:
            [{ DisplayName: 'Site Assets', LibraryUrl: 'sites/sitedesigns/SiteAssets', ListId: '/Guid(96c2e234-c996-4877-b3a6-8aebd8ab45b6)/', ThumbnailUrl: 'SiteAssets/__siteIcon__.jpg' }]
        }));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('returns a result as json', (done) => {
    sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url.indexOf(`/_vti_bin/client.svc/ProcessQuery`) > -1) {
        return Promise.resolve(JSON.stringify([
          { "SchemaVersion": "15.0.0.0", "LibraryVersion": "16.0.7025.1207", "ErrorInfo": null, "TraceCorrelationId": "8992299e-a003-4000-7686-fda36e26a53c" }, 6, {
            "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssets",
            "CentralAssetRepositoryLibraries": null,
            "OrgAssetsLibraries": {
              "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssetsLibraryCollection",
              "_Child_Items_": [{
                "_ObjectType_": "Microsoft.SharePoint.Administration.OrgAssetsLibrary",
                "DisplayName": "Site Assets",
                "FileType": "jpg",
                "LibraryUrl": {
                  "_ObjectType_": "SP.ResourcePath",
                  "DecodedUrl": "sites\u002fsitedesigns\u002fSiteAssets"
                },
                "ListId": "\/Guid(96c2e234-c996-4877-b3a6-8aebd8ab45b6)\/",
                "OrgAssetType": 1,
                "ThumbnailUrl": {
                  "_ObjectType_": "SP.ResourcePath",
                  "DecodedUrl": "SiteAssets\u002f__siteIcon__.jpg"
                },
                "UniqueId": "\/Guid(0d3c9e72-60f5-40f8-9e29-b91036f5630e)\/"
              }]
            },
            "SiteId": "\/Guid(9f0e0a96-14ec-4d4f-9b04-a8698367cd36)\/",
            "Url": {
              "_ObjectType_": "SP.ResourcePath",
              "DecodedUrl": "\u002fsites\u002fsitedesigns"
            },
            "WebId": "\/Guid(030c8d27-1bb4-4042-a252-dce8ac1e9f00)\/"
          }
        ]));
      }

      return Promise.reject('Invalid request');
    });

    cmdInstance.action({ options: { debug: true, verbose: true, output: 'json' } }, () => {
      try {
        assert(cmdInstanceLogSpy.calledWith(JSON.stringify({
          Url: '/sites/sitedesigns',
          Libraries:
            [{ DisplayName: 'Site Assets', LibraryUrl: 'sites/sitedesigns/SiteAssets', ListId: '/Guid(96c2e234-c996-4877-b3a6-8aebd8ab45b6)/', ThumbnailUrl: 'SiteAssets/__siteIcon__.jpg' }]
        })));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('handles no library set correctly', (done) => {
    const svcListRequest = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url.indexOf(`/_vti_bin/client.svc/ProcessQuery`) > -1) {
        if (opts.headers['X-RequestDigest']) {
          return Promise.resolve(JSON.stringify([{
            "SchemaVersion": "15.0.0.0",
            "LibraryVersion": "16.0.9124.1233",
            "ErrorInfo": null,
            "TraceCorrelationId": "1e21fa9e-403d-9000-7c8e-7e8d8898fd57"
          }, 6, {
            "IsNull": false
          }]));
        }
      }

      return Promise.reject('Invalid request');
    });

    cmdInstance.action({
      options: {
        debug: true
      }
    }, (err?: any) => {
      try {
        assert(svcListRequest.called);
        assert.equal(err.message, 'No libraries in Organization Assets');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('handles error getting request', (done) => {
    const svcListRequest = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url.indexOf(`/_vti_bin/client.svc/ProcessQuery`) > -1) {
        if (opts.headers['X-RequestDigest']) {
          return Promise.resolve(JSON.stringify([
            {
              "SchemaVersion": "15.0.0.0", "LibraryVersion": "16.0.7018.1204", "ErrorInfo": {
                "ErrorMessage": "An error has occurred", "ErrorValue": null, "TraceCorrelationId": "965d299e-a0c6-4000-8546-cc244881a129", "ErrorCode": -1, "ErrorTypeName": "Microsoft.SharePoint.PublicCdn.TenantCdnAdministrationException"
              }, "TraceCorrelationId": "965d299e-a0c6-4000-8546-cc244881a129"
            }
          ]));
        }
      }

      return Promise.reject('Invalid request');
    });

    cmdInstance.action({
      options: {
        debug: true
      }
    }, (err?: any) => {
      try {
        assert(svcListRequest.called);
        assert.equal(err.message, 'An error has occurred');
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles random API error', (done) => {
    sinon.stub(request, 'post').callsFake((opts) => Promise.reject('An error has occurred'));

    cmdInstance.action({ options: {} }, (err?: any) => {
      try {
        assert.equal(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
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

  it('has help referring to the right command', () => {
    const cmd: any = {
      log: (msg: string) => { },
      prompt: () => { },
      helpInformation: () => { }
    };
    const find = sinon.stub(vorpal, 'find').callsFake(() => cmd);
    cmd.help = command.help();
    cmd.help({}, () => { });
    assert(find.calledWith(commands.ORGASSETSLIBRARY_LIST));
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
});