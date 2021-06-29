import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./team-add');

describe(commands.TEAM_ADD, () => {
  let log: string[];
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
    (command as any).items = [];
  });

  afterEach(() => {
    Utils.restore([
      request.post,
      request.get,
      global.setTimeout
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
    assert.strictEqual(command.name.startsWith(commands.TEAM_ADD), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });

  it('passes validation if name and description are passed when no template is passed', (done) => {
    const actual = command.validate({
      options: {
        name: 'Architecture',
        description: 'Architecture Discussion'
      }
    });
    assert.strictEqual(actual, true);
    done();
  });

  it('passes validation if name and description are not passed when a template is supplied', (done) => {
    const actual = command.validate({
      options: {
        template: `abc`
      }
    });
    assert.strictEqual(actual, true);
    done();
  });

  it('fails validation if description is not passed when no template is supplied', (done) => {
    const actual = command.validate({
      options: {
        name: 'Architecture'
      }
    });
    assert.notStrictEqual(actual, true);
    done();
  });

  it('fails validation if name is not passed when no template is supplied', (done) => {
    const actual = command.validate({
      options: {
        description: 'Architecture Discussion'
      }
    });
    assert.notStrictEqual(actual, true);
    done();
  });

  it('creates Microsoft Teams team in the tenant when no template is supplied (verbose)', (done) => {
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        verbose: true,
        name: 'Architecture',
        description: 'Architecture Discussion'
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Architecture',
          description: 'Architecture Discussion'
        });
        assert(getRequestStub.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('creates Microsoft Teams team in the tenant when template is supplied (verbose)', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        verbose: true,
        template
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Engineering Team',
          description: 'This is a sample engineering team, used to showcase the range of properties supported by this API'
        });
        assert(getRequestStub.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('creates Microsoft Teams team in the tenant when template and name is supplied (verbose)', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        verbose: true,
        name: 'Sample Classroom Team',
        template
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Classroom Team',
          description: 'This is a sample engineering team, used to showcase the range of properties supported by this API'
        });
        assert(getRequestStub.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('creates Microsoft Teams team in the tenant when template and description is supplied (verbose)', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        verbose: true,
        description: 'This is a sample classroom team, used to showcase the range of properties supported by this API',
        template
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Engineering Team',
          description: 'This is a sample classroom team, used to showcase the range of properties supported by this API'
        });
        assert(getRequestStub.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('creates Microsoft Teams team in the tenant when template, name and description is supplied (verbose)', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        verbose: true,
        name: 'Sample Classroom Team',
        description: 'This is a sample classroom team, used to showcase the range of properties supported by this API',
        template
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Classroom Team',
          description: 'This is a sample classroom team, used to showcase the range of properties supported by this API'
        });
        assert(getRequestStub.called);
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('creates Microsoft Teams team in the tenant when template, name and description is supplied and waits for command to complete (verbose)', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get');
    getRequestStub.onCall(0)
      .callsFake((opts) => {
        if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
          return Promise.resolve({
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
            "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
            "operationType": "createTeam",
            "createdDateTime": "2020-06-15T22:28:16.3007846Z",
            "status": "inProgress",
            "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
            "attemptsCount": 1,
            "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
            "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
            "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
            "error": null
          });
        }
        return Promise.reject('Invalid request');
      });
    getRequestStub.onCall(1).callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "inProgress",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });
    getRequestStub.onCall(2).callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "succeeded",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    sinon.stub(global as NodeJS.Global, 'setTimeout').callsFake((fn) => {
      fn();
      return {} as any;
    });

    command.action(logger, {
      options: {
        verbose: true,
        wait: true,
        name: 'Sample Classroom Team',
        description: 'This is a sample classroom team, used to showcase the range of properties supported by this API',
        template
      }
    }, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Classroom Team',
          description: 'This is a sample classroom team, used to showcase the range of properties supported by this API'
        });
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles error when creating a Team', (done) => {
    sinon.stub(request, 'post').callsFake(() => {
      return Promise.reject('An error has occurred');
    });

    command.action(logger, {
      options: {
        verbose: true,
        name: 'Architecture',
        description: 'Architecture Discussion'
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

  it('correctly handles operation error when creating a Team when waiting for command to complete', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get');
    getRequestStub.onCall(0)
      .callsFake((opts) => {
        if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
          return Promise.resolve({
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
            "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
            "operationType": "createTeam",
            "createdDateTime": "2020-06-15T22:28:16.3007846Z",
            "status": "inProgress",
            "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
            "attemptsCount": 1,
            "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
            "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
            "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
            "error": null
          });
        }
        return Promise.reject('Invalid request');
      });
    getRequestStub.onCall(1).callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "failed",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": 'An error has occurred'
        });
      }
      return Promise.reject('Invalid request');
    });

    sinon.stub(global as NodeJS.Global, 'setTimeout').callsFake((fn) => {
      fn();
      return {} as any;
    });

    command.action(logger, {
      options: {
        wait: true,
        name: 'Sample Classroom Team',
        description: 'This is a sample classroom team, used to showcase the range of properties supported by this API',
        template
      }
    } as any, (err?: any) => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Classroom Team',
          description: 'This is a sample classroom team, used to showcase the range of properties supported by this API'
        });
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('correctly handles inProgress operation status when creating a Team and waiting for the command to complete', (done) => {
    const template = `
    {
      "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      "displayName": "Sample Engineering Team",
      "description": "This is a sample engineering team, used to showcase the range of properties supported by this API"
    }`;
    const requestStub = sinon.stub(request, 'post').callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams`) {
        return Promise.resolve({ statusCode: 202, headers: { location: "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')" } });
      }
      return Promise.reject('Invalid request');
    });

    const getRequestStub = sinon.stub(request, 'get');
    getRequestStub.onCall(0)
      .callsFake((opts) => {
        if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
          return Promise.resolve({
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
            "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
            "operationType": "createTeam",
            "createdDateTime": "2020-06-15T22:28:16.3007846Z",
            "status": "inProgress",
            "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
            "attemptsCount": 1,
            "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
            "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
            "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
            "error": null
          });
        }
        return Promise.reject('Invalid request');
      });
    getRequestStub.onCall(1).callsFake((opts) => {
      if (opts.url === `https://graph.microsoft.com/v1.0/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations('8ad1effa-7ed1-4d03-bd60-fe177d8d56f1')`) {
        return Promise.resolve({
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('79afc64f-c76b-4edc-87f3-a47a1264695a')/operations/$entity",
          "id": "8ad1effa-7ed1-4d03-bd60-fe177d8d56f1",
          "operationType": "createTeam",
          "createdDateTime": "2020-06-15T22:28:16.3007846Z",
          "status": "succeeded",
          "lastActionDateTime": "2020-06-15T22:28:16.3007846Z",
          "attemptsCount": 1,
          "targetResourceId": "79afc64f-c76b-4edc-87f3-a47a1264695a",
          "targetResourceLocation": "/teams('79afc64f-c76b-4edc-87f3-a47a1264695a')",
          "Value": "{\"apps\":[{\"Index\":1,\"Status\":\"Failed\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"com.microsoft.teamspace.tab.vsts\"},{\"Index\":2,\"Status\":\"InProgress\",\"UpdateTimestamp\":\"2020-06-15T22:28:16.8753199+00:00\",\"Reference\":\"1542629c-01b3-4a6d-8f76-1938b779e48d\"}],\"channels\":[{\"tabs\":[],\"Index\":1,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Class Announcements\"},{\"tabs\":[],\"Index\":2,\"Status\":\"NotStarted\",\"UpdateTimestamp\":\"2020-06-15T22:28:14.0279825+00:00\",\"Reference\":\"Homework\"}],\"WorkflowId\":\"northeurope.695866c1-c68a-435c-b707-432984ec721c\"}",
          "error": null
        });
      }
      return Promise.reject('Invalid request');
    });

    sinon.stub(global as NodeJS.Global, 'setTimeout').callsFake((fn) => {
      fn();
      return {} as any;
    });

    command.action(logger, {
      options: {
        wait: true,
        name: 'Sample Classroom Team',
        description: 'This is a sample classroom team, used to showcase the range of properties supported by this API',
        template
      }
    } as any, () => {
      try {
        assert.deepEqual(requestStub.getCall(0).args[0].data, {
          "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
          displayName: 'Sample Classroom Team',
          description: 'This is a sample classroom team, used to showcase the range of properties supported by this API'
        });
        assert(loggerLogSpy.called);
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
});