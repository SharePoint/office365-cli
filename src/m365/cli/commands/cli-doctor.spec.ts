import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../appInsights';
import { Logger } from '../../../cli';
import Command from '../../../Command';
import Utils from '../../../Utils';
import commands from '../commands';
import auth from '../../../Auth';
import * as os from 'os';
const packageJSON = require('../../../../package.json');

const command: Command = require('./cli-doctor');

describe(commands.DOCTOR, () => {
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
      os.platform,
      os.version,
      os.release,
      process.env
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
    assert.strictEqual(command.name.startsWith(commands.DOCTOR), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('retrieves "scopes" in the diagnostic information about the current environment', (done) => {
    const jwt = JSON.stringify({
      scp: "AllSites.FullControl AppCatalog.ReadWrite.All"
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId:"31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant:"common",
          cliEnvironment:"",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: [],
          scopes: ["AllSites.FullControl","AppCatalog.ReadWrite.All"]
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves "scopes" from multiple access tokens in the diagnostic information about the current environment', (done) => {
    const jwt1 = JSON.stringify({
      scp: "AllSites.FullControl AppCatalog.ReadWrite.All"
    });
    let jwt64 = Buffer.from(jwt1).toString('base64');
    const accessToken1 = `abc.${jwt64}.def`;

    const jwt2 = JSON.stringify({
      scp: "TermStore.Read.All"
    });
    jwt64 = Buffer.from(jwt2).toString('base64');
    const accessToken2 = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken1}`},
      "https://mydev.sharepoint.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken2}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
    
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId:"31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant:"common",
          cliEnvironment:"",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: [],
          scopes: ["AllSites.FullControl","AppCatalog.ReadWrite.All","TermStore.Read.All"]
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves "roles" in the diagnostic information about the current environment', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });

    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All"],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves "roles" from multiple access tokens in the diagnostic information about the current environment', (done) => {
    const jwt1 = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    let jwt64 = Buffer.from(jwt1).toString('base64');
    const accessToken1 = `abc.${jwt64}.def`;

    const jwt2 = JSON.stringify({
      roles: ["TermStore.Read.All"]
    });
    jwt64 = Buffer.from(jwt2).toString('base64');
    const accessToken2 = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken1}`},
      "https://mydev.sharepoint.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken2}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All","TermStore.Read.All"],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves "roles" and "scopes" in the diagnostic information about the current environment', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"],
      scp:"Sites.Read.All Files.ReadWrite.All"
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All"],
          scopes: ["Sites.Read.All","Files.ReadWrite.All"]
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves diagnostic information about the current environment when there are no roles or scopes available', (done) => {
    const jwt = JSON.stringify({
      roles: [],
      scp:""
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;
    
    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(0);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "DeviceCode",
          cliAadAppId:"31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant:"common",
          cliEnvironment:"",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: [],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves diagnostic information about the current environment with auth type "Certificate"', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
 
    command.action(logger,{options:{}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "Certificate",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All"],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves tenant information as "single" when TenantID is a GUID', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;
    
    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("923d42f0-6d23-41eb-b68d-c036d242654f");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });

    command.action(logger,{options:{debug:true}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "Certificate",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "single",
          cliEnvironment:"",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All"],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves diagnostic information about the current environment (debug)', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{debug:true}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode : "Certificate",
          cliAadAppId : "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant : "common",
          cliEnvironment :"",
          cliVersion : "3.11.0",
          nodeVersion : "v14.17.0",
          os : {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles : ["Sites.Read.All","Files.ReadWrite.All"],
          scopes : []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('retrieves diagnostic information of the current environment when executing in docker', (done) => {
    const jwt = JSON.stringify({
      roles: ["Sites.Read.All","Files.ReadWrite.All"]
    });
    const jwt64 = Buffer.from(jwt).toString('base64');
    const accessToken = `abc.${jwt64}.def`;

    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":`${accessToken}`}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': 'docker' });

    command.action(logger,{options:{debug:true}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "Certificate",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "docker",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: ["Sites.Read.All","Files.ReadWrite.All"],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });

  it('returns empty roles and scopes in diagnostic information when access token is empty', (done) => {
    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":""}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
    
    command.action(logger,{options:{debug:true}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "Certificate",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: [],
          scopes: []
        }));
        done();
      }
      catch(e){
        done(e);
      }
    });
  });


  it('returns empty roles and scopes in diagnostic information when access token is invalid', (done) => {
    sinon.stub(auth.service,'accessTokens').value({
      "https://graph.microsoft.com":{"expiresOn":"2021-07-04T09:52:18.000Z","accessToken":"a.b.c.d"}
    });
    sinon.stub(os,'platform').returns("win32");
    sinon.stub(os,'version').returns("Windows 10 Pro");
    sinon.stub(os,'release').returns("10.0.19043");
    sinon.stub(packageJSON,'version').value("3.11.0");
    sinon.stub(process,'version').value("v14.17.0");
    sinon.stub(auth.service,'appId').value("31359c7f-bd7e-475c-86db-fdb8c937548e");
    sinon.stub(auth.service,'tenant').value("common");
    sinon.stub(auth.service,'authType').value(2);
    sinon.stub(process, 'env').value({ 'CLIMICROSOFT365_ENV': '' });
  
    command.action(logger,{options:{debug:true}},() => {
      try{
        assert(loggerLogSpy.calledWith({
          authMode: "Certificate",
          cliAadAppId: "31359c7f-bd7e-475c-86db-fdb8c937548e",
          cliAadAppTenant: "common",
          cliEnvironment: "",
          cliVersion: "3.11.0",
          nodeVersion: "v14.17.0",
          os: {"platform":"win32","version":"Windows 10 Pro","release":"10.0.19043"},
          roles: [],
          scopes: []
        }));
        done();
      }
      catch(e){
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
});