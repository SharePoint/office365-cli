import * as assert from 'assert';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
const command: Command = require('./service-message-list');

describe(commands.TENANT_SERVICE_MESSAGE_LIST, () => {
  let log: any[];
  let logger: Logger;

  let loggerSpy: sinon.SinonSpy;

  const textOutput = [
    {
      Workload: "Exchange",
      Id: "EX213379",
      Message: "Users with an ESN policy scoped by a rule using specific conditions will see unexpected delivery results."
    },
    {
      Workload: "Lync",
      Id: "LY220759",
      Message: "Users may have been unable to view Skype Meeting Broadcasts in Skype for Business."
    },
    {
      Workload: "SharePoint",
      Id: "SP220211",
      Message: "Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites."
    },
    {
      Workload: "microsoftteams",
      Id: "TM218696",
      Message: "Users may have been intermittently unable to open non-Microsoft Office file links when using the web app."
    },
    {
      Workload: "Microsoft Forms",
      Id: "MC198615",
      Message: "Updated Feature: Design update, handling repeated phishers in Forms"
    }
  ];

  const textOutputSharePoint = [
    {
      Workload: "SharePoint",
      Id: "SP220211",
      Message: "Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites."
    }
  ];

  const jsonOutput = {
    "value": [
      {
        "AffectedWorkloadDisplayNames": [],
        "AffectedWorkloadNames": [],
        "Status": "Extended recovery",
        "Workload": "Exchange",
        "WorkloadDisplayName": "Exchange Online",
        "ActionType": null,
        "AdditionalDetails": [],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Advisory",
        "EndTime": null,
        "Feature": "Provisioning",
        "FeatureDisplayName": "Management and Provisioning",
        "UserFunctionalImpact": "",
        "Id": "EX213379",
        "ImpactDescription": "Users with an ESN policy scoped by a rule using specific conditions will see unexpected delivery results.",
        "LastUpdatedTime": "2020-08-21T18:59:16.387Z",
        "MessageType": "Incident",
        "Messages": [
          {
            "MessageText": "Title: Any user with end-user spam notification (ESN) policies using specific conditions seeing unexpected delivery results\n\nUser Impact: Users with an ESN policy scoped by a rule using specific conditions will see unexpected delivery results.\n\nMore info: The affected conditions are \"SentToMemberOf\" or \"ExceptIfSentToMemberOf\". Users leveraging the conditions either won’t receive quarantine notifications or will unexpectedly receive them. \n\nRemoving the rule that leverages either of the affected conditions mitigates the problem and allows users to receive the expected quarantine notifications. Further, moving group conditions to either a domain or specific recipients will provide a better experience until the issue is resolved. \n\nCurrent status: We've determined that a code issue is causing the problem. We're developing a code fix to allow \"SentToMemberOf\" and \"ExceptIfSentToMemberOf\" ESN policies to function as expected. Our initial analysis suggests that the development and deployment cycles of the solution may take up to six weeks to complete. We'll provide an update confirming the estimated time to completion on Friday, May 22, 2020.\n\nScope of impact: Any user with a spam filtering policy scoped with a \"SentToMemberOf\" or “ExceptIfSentToMemberOf\"condition may be affected. \n\nRoot cause: The code to support spam filtering policies that are scoped to the \"SentToMemberOf\" or “ExceptIfSentToMemberOf”condition wasn't fully implemented before the option to use the affected conditions was made available. \n\nNext update by: Friday, May 22, 2020, at 11:00 PM UTC",
            "PublishedTime": "2020-05-15T18:19:08.38Z"
          },
          {
            "MessageText": "Title: Any user with end-user spam notification (ESN) policies using specific conditions seeing unexpected delivery results\n\nUser Impact: Users with an ESN policy scoped by a rule using specific conditions will see unexpected delivery results.\n\nMore info: The affected conditions are \"SentToMemberOf\" or \"ExceptIfSentToMemberOf\". Users leveraging the conditions either won’t receive quarantine notifications or will unexpectedly receive them. \n\nRemoving the rule that leverages either of the affected conditions mitigates the problem and allows users to receive the expected quarantine notifications. Further, moving group conditions to either a domain or specific recipients will provide a better experience until the issue is resolved. \n\nCurrent status: The deployment of the solution has started. The projected time for the deployment of the code update to reach full saturation is Wednesday, July 1, 2020. We’ll provide weekly updates confirming that the deployment is on track, and provide a saturation percentage if it’s available. \n\nScope of impact: Any user with a spam filtering policy scoped with a \"SentToMemberOf\" or “ExceptIfSentToMemberOf\"condition may be affected. \n\nEstimated time to resolve: Based off of the current deployment rate, we estimate that the code to support the affected spam filtering policies will be fully deployed by Wednesday, July 1, 2020. \n\nRoot cause: The code to support spam filtering policies that are scoped to the \"SentToMemberOf\" or “ExceptIfSentToMemberOf”condition wasn't fully implemented before the option to use the affected conditions was made available. \n\nNext update by: Friday, May 29, 2020, at 11:00 PM UTC",
            "PublishedTime": "2020-05-22T17:49:10.017Z"
          },
          {
            "MessageText": "Title: Any user with end-user spam notification (ESN) policies using specific conditions seeing unexpected delivery results\n\nUser Impact: Users with an ESN policy scoped by a rule using specific conditions will see unexpected delivery results.\n\nMore info: The affected conditions are \"SentToMemberOf\" or \"ExceptIfSentToMemberOf\". Users leveraging the conditions either won’t receive quarantine notifications or will unexpectedly receive them. \n \nRemoving the rule that leverages either of the affected conditions mitigates the problem and allows users to receive the expected quarantine notifications. Further, moving group conditions to either a domain or specific recipients will provide a better experience until the issue is resolved. \n \nCurrent status: Based off of our estimate, the code update is on track to complete by Wednesday, July 1, 2020. A saturation percentage isn’t currently available, but we aim to provide one with our next update on Friday, June 5, 2020. \n \nScope of impact: Any user with a spam filtering policy scoped with a \"SentToMemberOf\" or “ExceptIfSentToMemberOf\"condition may be affected. \n \nEstimated time to resolve: Based off of the current deployment rate, we estimate that the code to support the affected spam filtering policies will be fully deployed by Wednesday, July 1, 2020. \n \nRoot cause: The code to support spam filtering policies that are scoped to the \"SentToMemberOf\" or “ExceptIfSentToMemberOf” condition wasn't fully implemented before the option to use the affected conditions was made available. \n \nNext update by: Friday, June 5, 2020, at 11:00 PM UTC",
            "PublishedTime": "2020-05-29T20:55:35.743Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Sev2",
        "StartTime": "2020-05-15T18:00:32Z",
        "TenantParams": [],
        "Title": "Any user with end-user spam notification (ESN) policies using specific conditions seeing unexpected delivery results"
      },
      {
        "AffectedWorkloadDisplayNames": [],
        "AffectedWorkloadNames": [],
        "Status": "False positive",
        "Workload": "Lync",
        "WorkloadDisplayName": "Skype for Business",
        "ActionType": null,
        "AdditionalDetails": [],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Incident",
        "EndTime": "2020-08-21T20:00:00Z",
        "Feature": "AudioVideo",
        "FeatureDisplayName": "Audio and Video",
        "UserFunctionalImpact": "",
        "Id": "LY220759",
        "ImpactDescription": "Users may have been unable to view Skype Meeting Broadcasts in Skype for Business.",
        "LastUpdatedTime": "2020-08-21T21:05:16.937Z",
        "MessageType": "Incident",
        "Messages": [
          {
            "MessageText": "Title: All attendees may be unable to view Skype Meeting Broadcasts in Skype for Business\n\nUser Impact: Users may be unable to view Skype Meeting Broadcasts in Skype for Business. \n\nCurrent status: We're investigating a potential issue and checking for impact to your organization. We'll provide an update within 30 minutes.\n\nScope of impact: This issue could potentially affect any attendees attempting to view Skype Meeting Broadcasts in Skype for Business.",
            "PublishedTime": "2020-08-21T19:39:50.687Z"
          },
          {
            "MessageText": "Title: All attendees may be unable to view Skype Meeting Broadcasts in Skype for Business\n\nUser Impact: Users may be unable to view Skype Meeting Broadcasts in Skype for Business.\n\nMore info: Users may receive an error screen indicating that they are experiencing a network issue.\n\nCurrent status: We've identified a potential networking issue with a third-party provider. We're working to temporarily alleviate impact by rerouting traffic to a healthy infrastructure.\n\nScope of impact: Your organization is affected by this event and could potentially affect any attendees attempting to view Skype Meeting Broadcasts in Skype for Business.\n\nNext update by: Friday, August 21, 2020, at 9:00 PM UTC",
            "PublishedTime": "2020-08-21T20:02:35.263Z"
          },
          {
            "MessageText": "Title: All attendees may be unable to view Skype Meeting Broadcasts in Skype for Business\n\nUser Impact: Users may have been unable to view Skype Meeting Broadcasts in Skype for Business. \n\nMore info: Users may have received an error screen indicating that they were experiencing a network issue.\n\nFinal status: We've confirmed that a third-party provider networking issue caused the impact. We've rerouted traffic to healthy infrastructure and confirmed via monitoring that this action successfully mitigated the issue.\n\nScope of impact: Your organization was affected by this event and could have potentially affected any attendees attempting to view Skype Meeting Broadcasts in Skype for Business.\n\nStart time: Friday, August 21, 2020, at 6:10 PM UTC\n\nEnd time: Friday, August 21, 2020, at 8:00 PM UTC\n\nRoot cause: A third-party provider networking issue resulted in impact.\n\nNext steps:\n- We're working with the third-party provider to understand how to prevent future networking issues from causing similar impact from happening again.\n\nThis is the final update for the event.",
            "PublishedTime": "2020-08-21T21:05:16.937Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Sev2",
        "StartTime": "2020-08-21T18:10:00Z",
        "TenantParams": [],
        "Title": "All attendees may be unable to view Skype Meeting Broadcasts in Skype for Business"
      },
      {
        "AffectedWorkloadDisplayNames": [],
        "AffectedWorkloadNames": [],
        "Status": "Service restored",
        "Workload": "SharePoint",
        "WorkloadDisplayName": "SharePoint Online",
        "ActionType": null,
        "AdditionalDetails": [
          {
            "Name": "NotifyInApp",
            "Value": "True"
          }
        ],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Incident",
        "EndTime": "2020-08-12T00:15:00Z",
        "Feature": "spofeatures",
        "FeatureDisplayName": "SharePoint Features",
        "UserFunctionalImpact": "",
        "Id": "SP220211",
        "ImpactDescription": "Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites.",
        "LastUpdatedTime": "2020-08-14T17:41:03.37Z",
        "MessageType": "Incident",
        "Messages": [
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We're investigating a potential issue and checking for impact to your organization. We'll provide an update within 30 minutes.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.",
            "PublishedTime": "2020-08-11T22:15:18.187Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We're reviewing available diagnostic data to isolate the source of this issue and identify optimal troubleshooting actions.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nNext update by: Tuesday, August 11, 2020, at 11:30 PM UTC",
            "PublishedTime": "2020-08-11T22:28:48.287Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We've successfully reproduced the issue and are examining logs from the test environment we used to reproduce the issue to try to determine what is causing the problem.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nNext update by: Wednesday, August 12, 2020, at 1:30 AM UTC",
            "PublishedTime": "2020-08-11T23:20:32.067Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users were unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may have been unable to access SharePoint Online sites via sub-menu links, though the sites were accessible if browsed to directly.\n\nThis issue had no effect on structural navigation for SharePoint classic sites that have publishing enabled.\n\nFinal status: Our investigation determined that a recent change to our service infrastructure caused the second link in a nested hub navigation link chain to not be selectable, causing impact. We've disabled the change and confirmed with affected users that it has successfully mitigated impact.\n\nScope of impact: This issue could have potentially affected any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nStart time: Tuesday, August 11, 2020, at 6:08 AM UTC\n\nEnd time: Wednesday, August 12, 2020, at 12:15 AM UTC\n\nRoot cause: A recent change to our service infrastructure caused the second link in a nested hub navigation link chain to not be selectable, causing impact.\n\nNext steps:\n- We are continuing to examine the change to determine why it made the link unselectable for hub sites to help prevent similar impact in the future.\n\nThis is the final update for the event.",
            "PublishedTime": "2020-08-12T00:56:01.55Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Sev2",
        "StartTime": "2020-08-11T22:14:58Z",
        "TenantParams": [],
        "Title": "All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites"
      },
      {
        "AffectedWorkloadDisplayNames": [],
        "AffectedWorkloadNames": [],
        "Status": "Service restored",
        "Workload": "microsoftteams",
        "WorkloadDisplayName": "Microsoft Teams",
        "ActionType": null,
        "AdditionalDetails": [],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Advisory",
        "EndTime": "2020-08-07T12:34:00Z",
        "Feature": "TeamsComponents",
        "FeatureDisplayName": "Teams Components",
        "UserFunctionalImpact": "",
        "Id": "TM218696",
        "ImpactDescription": "Users may have been intermittently unable to open non-Microsoft Office file links when using the web app.",
        "LastUpdatedTime": "2020-08-07T13:16:37.037Z",
        "MessageType": "Incident",
        "Messages": [
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links.\n\nCurrent status: We're investigating a potential issue and checking for impact to your organization. We'll provide an update within 30 minutes.\n\nScope of impact: This issue may potentially affect any of your users attempting to open non-Microsoft Office file links.",
            "PublishedTime": "2020-07-16T16:52:24.08Z"
          },
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links.\n\nCurrent status: We're analyzing errors in system logs associated with the impact to better understand the underlying cause of this issue.\n\nScope of impact: This issue may potentially affect any of your users attempting to open non-Microsoft Office file links.\n\nNext update by: Thursday, July 16, 2020, at 6:30 PM UTC",
            "PublishedTime": "2020-07-16T17:20:52.023Z"
          },
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links.\n\nCurrent status: We're continuing our review of system log errors to understand where file link requests are failing so that we can determine the next troubleshooting steps.\n\nScope of impact: This issue may potentially affect any of your users attempting to open non-Microsoft Office file links.\n\n\nNext update by: Friday, June 17, 2020, at 12:00 AM UTC",
            "PublishedTime": "2020-07-16T18:30:52.6Z"
          },
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links.\n\nCurrent status: Our review of system log errors is taking longer than expected and we'll provide an update on our findings for the cause of this issue and mitigation options once available.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nNext update by: Friday, July 17, 2020, at 7:30 AM UTC",
            "PublishedTime": "2020-07-16T20:50:43.587Z"
          },
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links.\n\nMore info: Users can may succeed on opening the file links on re-attempts. Users may also open the files through SharePoint Online as another potential workaround.\n\nCurrent status: Our analysis thus far has been inconclusive in isolating the source of the issue or determining any mitigation paths. We're attempting to reproduce the issue internally so that we can gather additional logging details and help narrow our investigating paths.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nNext update by: Friday, July 17, 2020, at 2:30 PM UTC",
            "PublishedTime": "2020-07-17T06:10:18.313Z"
          },
          {
            "MessageText": "Title: Some users are intermittently unable to open non-Microsoft Office file links when using the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app.\n\nCurrent status: We've been able to reproduce the issue internally and believe that this may be caused by an incompatibility issue with a specific browser version. We're continuing to analyze logging details and are reaching out to our external partners to verify this.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app.\n\nNext update by: Monday, July 20, 2020, at 4:30 AM UTC",
            "PublishedTime": "2020-07-17T14:01:31.28Z"
          },
          {
            "MessageText": "Title: Any user may have experienced intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may have been intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may have succeeded in opening the file links on subsequent attempts. Users may have also been able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may have been able to download the file and view it through an alternate browser or native app. \n\nFinal status: We've completed monitoring the affected environment and confirmed that the issue is resolved.  \n\nScope of impact: This issue may have potentially affected any users attempting to open non-Microsoft Office file links.  \n\nStart time: Wednesday, July 15, 2020, at 2:00 PM UTC \n\nEnd time: Friday, August 7, 2020, at 12:34 PM UTC \n\nRoot cause: An incompatibility issue with a latest browser version was causing intermittent issues opening non-Microsoft Office file links when using the web app. \n\nNext steps:\n- We're reviewing our browser compatibility procedures to find ways to prevent this problem from happening again. \n\nThis is the final update for the event.",
            "PublishedTime": "2020-08-07T13:16:37.037Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app.\n\nCurrent status: We're monitoring the service and discussing next steps with our external partners to identify a mitigation plan.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app.\n\nNext update by: Tuesday, July 21, 2020, at 2:30 PM UTC",
            "PublishedTime": "2020-07-20T03:00:44.88Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app.\n\nCurrent status: While we continue to develop a mitigation strategy, our monitors indicate that the issue is happening less frequently. We're reviewing recent deployments within the affected environment to identify why the service is starting to recover, helping us gain better insight into resolving the issue.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app.\n\nNext update by: Friday, July 24, 2020, at 2:30 PM UTC",
            "PublishedTime": "2020-07-21T14:03:47.7Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app.\n\nCurrent status: Our monitoring systems continue to show that impact is happening less frequently, and we continue to review recent deployments to help identify the root cause of impact, to help determine our final steps in the mitigation plan for resolving this issue.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app.\n\nNext update by: Tuesday, July 28, 2020, at 2:30 PM UTC",
            "PublishedTime": "2020-07-24T13:16:14.547Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app. \n\nCurrent status: We're focusing our investigation into browser logs to help us better understand the compatibility issues with the web app and isolate the exact cause of the issue.  \n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.  \n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app. \n\nNext update by: Thursday, July 30, 2020, at 2:30 PM UTC ",
            "PublishedTime": "2020-07-28T13:25:01.073Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app. \n\nCurrent status: We believe that a code regression may be potentially causing impact. We're reviewing recent changes to the service to confirm this.  \n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.  \n\nRoot cause: An incompatibility issue with a latest browser version may be causing intermittent issues opening non-Microsoft Office file links when using the web app. \n\nNext update by: Wednesday, August 5, 2020, at 2:30 PM UTC ",
            "PublishedTime": "2020-07-30T13:40:26.54Z"
          },
          {
            "MessageText": "Title: Any user may experience intermittent issues when opening non-Microsoft Office file links from the web app\n\nUser Impact: Users may be intermittently unable to open non-Microsoft Office file links when using the web app.\n\nMore info: Users may succeed in opening the file links on subsequent attempts. Users may also be able to open the files through SharePoint Online or the Microsoft Teams desktop client.\n\nUsers may be able to download the file and view it through an alternate browser or native app.\n\nCurrent status: Our analysis has determined that a recent code regression within a partner's browser was unexpectedly causing impact. We've confirmed that this issue has been resolved, and we're monitoring the affected environment to ensure service health is restored.\n\nScope of impact: This issue may potentially affect any users attempting to open non-Microsoft Office file links.\n\nRoot cause: An incompatibility issue with a latest browser version was causing intermittent issues opening non-Microsoft Office file links when using the web app.\n\nNext update by: Friday, August 7, 2020, at 2:30 PM UTC",
            "PublishedTime": "2020-08-05T14:17:20.833Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Sev1",
        "StartTime": "2020-07-15T14:00:00Z",
        "TenantParams": [],
        "Title": "Any user may have experienced intermittent issues when opening non-Microsoft Office file links from the web app"
      },
      {
        "AffectedWorkloadDisplayNames": [
          "Microsoft Forms"
        ],
        "AffectedWorkloadNames": [
          "Forms"
        ],
        "Status": "",
        "Workload": null,
        "WorkloadDisplayName": null,
        "ActionType": "Awareness",
        "AdditionalDetails": [],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Advisory",
        "EndTime": "2021-02-10T08:00:00Z",
        "Feature": null,
        "FeatureDisplayName": null,
        "UserFunctionalImpact": null,
        "Id": "MC198615",
        "ImpactDescription": null,
        "LastUpdatedTime": "2019-12-19T23:26:07.72Z",
        "MessageType": "MessageCenter",
        "Messages": [
          {
            "MessageText": "<p>We are enhancing phishing protection in Microsoft Forms. This is an update to MC197185 (December 2019).</p><ul><li>We will roll out this feature in late December 2019.</li><li>The rollout will be complete in early January 2020.</li></ul><p>This message is associated with Microsoft 365 <a href=\"https://www.microsoft.com/microsoft-365/roadmap?rtc=3&amp;filters=&amp;searchterms=59216\" target=\"_blank\">Roadmap ID 59216</a>.</p><p>[How does this affect me?]</p><p>We are enhancing protection against repeated phishing offenders. The Microsoft Forms Team will block users who have two or more confirmed phishing forms from distributing forms and collecting responses.</p><p>Global and security admins will now log in to a Forms-hosted admin page that contains details about the restricted user. Admins will need to sign in before they can unblock a user who is identified on this page.</p><p><img src=\"http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mW83?ver=5734\" alt=\"Forms dashboard\" width=\"600\" /></p><p>[What do I need to do to prepare for this change?]</p><p>There is nothing you need to do to prepare for this change, but you may wish to update your training and documentation as appropriate.</p><p><a href=\"https://support.office.com/article/review-and-unblock-forms-or-users-detected-and-blocked-for-potential-phishing-879a90d7-6ef9-4145-933a-fb53a430bced\" target=\"_blank\">Learn how to review and unblock forms or users detected and blocked for potential phishing</a>.&nbsp;</p>",
            "PublishedTime": "2019-12-19T23:26:00Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Normal",
        "StartTime": "2019-12-19T23:26:00Z",
        "TenantParams": [],
        "Title": "Updated Feature: Design update, handling repeated phishers in Forms",
        "ActionRequiredByDate": null,
        "AnnouncementId": 0,
        "Category": "Stay Informed",
        "MessageTagNames": [],
        "ExternalLink": "",
        "IsDismissed": false,
        "IsRead": false,
        "IsMajorChange": false,
        "PreviewDuration": null,
        "AppliesTo": null,
        "MilestoneDate": "2019-12-19T23:26:01Z",
        "Milestone": "",
        "BlogLink": "",
        "HelpLink": "",
        "FlightName": null,
        "FeatureName": null
      }
    ]
  };

  const jsonOutputSharePoint = {
    "value": [
      {
        "AffectedWorkloadDisplayNames": [],
        "AffectedWorkloadNames": [],
        "Status": "Service restored",
        "Workload": "SharePoint",
        "WorkloadDisplayName": "SharePoint Online",
        "ActionType": null,
        "AdditionalDetails": [
          {
            "Name": "NotifyInApp",
            "Value": "True"
          }
        ],
        "AffectedTenantCount": 0,
        "AffectedUserCount": null,
        "Classification": "Incident",
        "EndTime": "2020-08-12T00:15:00Z",
        "Feature": "spofeatures",
        "FeatureDisplayName": "SharePoint Features",
        "UserFunctionalImpact": "",
        "Id": "SP220211",
        "ImpactDescription": "Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites.",
        "LastUpdatedTime": "2020-08-14T17:41:03.37Z",
        "MessageType": "Incident",
        "Messages": [
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We're investigating a potential issue and checking for impact to your organization. We'll provide an update within 30 minutes.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.",
            "PublishedTime": "2020-08-11T22:15:18.187Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We're reviewing available diagnostic data to isolate the source of this issue and identify optimal troubleshooting actions.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nNext update by: Tuesday, August 11, 2020, at 11:30 PM UTC",
            "PublishedTime": "2020-08-11T22:28:48.287Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may be unable to access SharePoint Online sites via sub-menu links, though the sites are accessible if browsed to directly.\n\nCurrent status: We've successfully reproduced the issue and are examining logs from the test environment we used to reproduce the issue to try to determine what is causing the problem.\n\nScope of impact: This issue could potentially affect any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nNext update by: Wednesday, August 12, 2020, at 1:30 AM UTC",
            "PublishedTime": "2020-08-11T23:20:32.067Z"
          },
          {
            "MessageText": "Title: All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites\n\nUser Impact: Users were unable to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nMore info: Users may have been unable to access SharePoint Online sites via sub-menu links, though the sites were accessible if browsed to directly.\n\nThis issue had no effect on structural navigation for SharePoint classic sites that have publishing enabled.\n\nFinal status: Our investigation determined that a recent change to our service infrastructure caused the second link in a nested hub navigation link chain to not be selectable, causing impact. We've disabled the change and confirmed with affected users that it has successfully mitigated impact.\n\nScope of impact: This issue could have potentially affected any user attempting to access second level sub-menu links in the navigation bar of SharePoint Online hub sites.\n\nStart time: Tuesday, August 11, 2020, at 6:08 AM UTC\n\nEnd time: Wednesday, August 12, 2020, at 12:15 AM UTC\n\nRoot cause: A recent change to our service infrastructure caused the second link in a nested hub navigation link chain to not be selectable, causing impact.\n\nNext steps:\n- We are continuing to examine the change to determine why it made the link unselectable for hub sites to help prevent similar impact in the future.\n\nThis is the final update for the event.",
            "PublishedTime": "2020-08-12T00:56:01.55Z"
          }
        ],
        "PostIncidentDocumentUrl": null,
        "Severity": "Sev2",
        "StartTime": "2020-08-11T22:14:58Z",
        "TenantParams": [],
        "Title": "All users may be unable to access second level sub-menu links in the navigation bar of SharePoint Online sites"
      }
    ]
  };

  before(() => {
    sinon.stub(auth, 'restoreAuth').callsFake(() => Promise.resolve());
    sinon.stub(appInsights, 'trackEvent').callsFake(() => { });
    auth.service.connected = true;
    auth.service.tenantId = '48526e9f-60c5-3000-31d7-aa1dc75ecf3c|908bel80-a04a-4422-b4a0-883d9847d110:c8e761e2-d528-34d1-8776-dc51157d619a&#xA;Tenant';
  });

  beforeEach(() => {
    log = [];
    logger = {
      log: (msg: string) => {
        log.push(msg);
      }
    };
    loggerSpy = sinon.spy(logger, 'log');
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
    auth.service.tenantId = undefined;
  });

  it('has correct name', () => {
    assert.strictEqual(command.name.startsWith(commands.TENANT_SERVICE_MESSAGE_LIST), true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
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

  it('handles promise error while getting service messages available in Microsoft 365', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
        return Promise.reject('An error has occurred');
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, { options: {} } as any, (err?: any) => {
      try {
        assert.strictEqual(JSON.stringify(err), JSON.stringify(new CommandError('An error has occurred')));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages available in Microsoft 365', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'json',
        debug: false
      }
    }, () => {
      try {
        assert(loggerSpy.calledWith(jsonOutput));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages available in Microsoft 365 (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
        return Promise.resolve(jsonOutput);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        output: 'json',
        debug: true
      }
    }, () => {
      try {
        assert(loggerSpy.calledWith(jsonOutput));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages for only one particular service available in Microsoft 365', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
        return Promise.resolve(jsonOutputSharePoint);
      }
      return Promise.reject('Invalid request');
    });

    command.action(logger, {
      options: {
        workload: 'SharePoint',
        output: 'json',
        debug: false
      }
    } as any, () => {
      try {
        assert(loggerSpy.calledWith(jsonOutputSharePoint));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages available in Microsoft 365 as text', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
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
        assert(loggerSpy.calledWith(textOutput));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages available in Microsoft 365 as text (debug)', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
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
        assert(loggerSpy.calledWith(textOutput));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });

  it('gets the service messages for only one particular service available in Microsoft 365 as text', (done) => {
    sinon.stub(request, 'get').callsFake((opts) => {
      if ((opts.url as string).indexOf('ServiceComms/Messages') > -1) {
        return Promise.resolve(jsonOutputSharePoint);
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
        assert(loggerSpy.calledWith(textOutputSharePoint));
        done();
      }
      catch (e) {
        done(e);
      }
    });
  });
});