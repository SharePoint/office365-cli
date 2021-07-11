# Release notes

## [v4.0.0](https://github.com/pnp/cli-microsoft365/releases/tag/v4.0.0)

### Changes

- removed duplicate ID in 'spo listitem' commands [#2024](https://github.com/pnp/cli-microsoft365/issues/2024)
- removed the 'value' wrapper in the output [#2292](https://github.com/pnp/cli-microsoft365/issues/2292)
- updated JMESPath docs [#2553](https://github.com/pnp/cli-microsoft365/issues/2553)
- removed obsolete file path options [#2309](https://github.com/pnp/cli-microsoft365/issues/2309)

## [v3.12.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.12.0)

### New commands

**OneDrive:**

- [onedrive list](../cmd/onedrive/onedrive-list.md) - retrieves a list of OneDrive sites [#2230](https://github.com/pnp/cli-microsoft365/issues/2230)

**Planner:**

- [planner bucket add](../cmd/planner/bucket/bucket-add.md) - adds a new Microsoft Planner bucket [#2254](https://github.com/pnp/cli-microsoft365/issues/2254)
- [planner bucket list](../cmd/planner/bucket/bucket-list.md) - lists the Microsoft Planner buckets in a plan [#2556](https://github.com/pnp/cli-microsoft365/issues/2556)
- [planner plan list](../cmd/planner/plan/plan-list.md) - returns a list of plans associated with a specified group [#2499](https://github.com/pnp/cli-microsoft365/issues/2499)

### Changes

- added the 'Add multiple lists in multiple sites' sample [#2562](https://github.com/pnp/cli-microsoft365/pull/2562)
- updated 'teams user app list' to Graph v1.0 [#2510](https://github.com/pnp/cli-microsoft365/issues/2510)
- added the 'List failed site designs' sample [#2539](https://github.com/pnp/cli-microsoft365/issues/2539)
- extended 'spo web get' with groups [#2493](https://github.com/pnp/cli-microsoft365/issues/2493)
- fixed 'yammer message add' [#2557](https://github.com/pnp/cli-microsoft365/issues/2557)
- fixed 'spo site set' code coverage [#2586](https://github.com/pnp/cli-microsoft365/issues/2586)
- updated 'teams channel get' to Graph v1.0 [#2505](https://github.com/pnp/cli-microsoft365/issues/2505)
- added missing 'chalk' dependency [#2592](https://github.com/pnp/cli-microsoft365/issues/2592)
- extended Teams channel ID validation with - and _ [#2594](https://github.com/pnp/cli-microsoft365/issues/2594)

## [v3.11.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.11.0)

### New commands

**Azure Active Directory:**

- [aad app role delete](../cmd/aad/app/app-role-delete.md) - deletes role from the specified Azure AD app registration [#2150](https://github.com/pnp/cli-microsoft365/issues/2150)
- [aad app set](../cmd/aad/app/app-set.md) - updates Azure AD app registration [#2448](https://github.com/pnp/cli-microsoft365/issues/2448)
- [aad o365group recyclebinitem clear](../cmd/aad/o365group/o365group-recyclebinitem-clear.md) - clears Microsoft 365 Groups from the recycle bin in the current tenant [#2033](https://github.com/pnp/cli-microsoft365/issues/2033)

**CLI:**

- [cli config reset](../cmd/cli/config/config-reset.md) - resets the specified CLI configuration option to its default value [#2344](https://github.com/pnp/cli-microsoft365/issues/2344)
- [cli issue](../cmd/cli/cli-issue.md) - returns, or opens a URL that takes the user to the right place in the CLI GitHub repo to create a new issue reporting bug, feedback, ideas, etc. [#1490](https://github.com/pnp/cli-microsoft365/issues/1490)

**Microsoft 365:**

- [tenant report office365activationcounts](../cmd/tenant/report/report-office365activationcounts.md) - gets the count of Microsoft 365 activations on desktops and devices [#2257](https://github.com/pnp/cli-microsoft365/issues/2257)
- [tenant report office365activationsusercounts](../cmd/tenant/report/report-office365activationsusercounts.md) - gets the count of users that are enabled and those that have activated the Office subscription on desktop or devices or shared computers [#2258](https://github.com/pnp/cli-microsoft365/issues/2258)
- [tenant report office365activationsuserdetail](../cmd/tenant/report/report-office365activationsuserdetail.md) - Get details about users who have activated Microsoft 365 [#2256](https://github.com/pnp/cli-microsoft365/issues/2256)

**SharePoint Framework:**

- [spfx package generate](../cmd/spfx/package/package-generate.md) - generates SharePoint Framework solution package with a no-framework web part rendering the specified HTML snippet [#2367](https://github.com/pnp/cli-microsoft365/issues/2367)

### Changes

- added encoding password for login [#2466](https://github.com/pnp/cli-microsoft365/issues/2466)
- added JMESPath docs [#2293](https://github.com/pnp/cli-microsoft365/issues/2293)
- added sample script to resubmit failed flow runs [#2440](https://github.com/pnp/cli-microsoft365/issues/2440)
- added sample script to cancel running flow runs [#2441](https://github.com/pnp/cli-microsoft365/issues/2441)
- fixed 'spfx doctor' on Windows [#2299](https://github.com/pnp/cli-microsoft365/issues/2299)
- updated 'spfx doctor' to support SPFx v1.12.1
- fixed adding channels via team's name [#2419](https://github.com/pnp/cli-microsoft365/issues/2419)
- extended 'file add' to handle empty files [#2433](https://github.com/pnp/cli-microsoft365/issues/2433)
- fixed docs for 'spo listitem remove' command [#2474](https://github.com/pnp/cli-microsoft365/pull/2474)
- centralized converting csv to json [#2481](https://github.com/pnp/cli-microsoft365/issues/2481)
- extended 'spo file list' with the `recursive` option [#2376](https://github.com/pnp/cli-microsoft365/issues/2376)
- added the Get-SPOUser CLI equivalents to the docs [#2485](https://github.com/pnp/cli-microsoft365/issues/2485)
- removed the deprecated Get-TeamHelp cmdlet from the docs [#2486](https://github.com/pnp/cli-microsoft365/issues/2486)
- added the Remove-PowerApp CLI equivalent to the docs [#2491](https://github.com/pnp/cli-microsoft365/issues/2491)
- excluded /assets/ path from loading commands [#2512](https://github.com/pnp/cli-microsoft365/issues/2512)
- fixed the 'o365group user list' command [#2374](https://github.com/pnp/cli-microsoft365/issues/2374)
- added the 'Remove pending SharePoint API permission requests' sample script [#2478](https://github.com/pnp/cli-microsoft365/issues/2478)
- added the 'Remove SharePoint API permissions' sample script [#2487](https://github.com/pnp/cli-microsoft365/issues/2487)
- extended 'pa app get' to allow retrieving apps by their display name [#2174](https://github.com/pnp/cli-microsoft365/issues/2174)
- removed double `JSON.stringify` [#2534](https://github.com/pnp/cli-microsoft365/issues/2534)
- updated sample and removes double / [#2449](https://github.com/pnp/cli-microsoft365/issues/2449)
- updated 'todo list add' to Graph v1.0 [#2515](https://github.com/pnp/cli-microsoft365/issues/2515)
- updated 'todo list list' to Graph v1.0 [#2516](https://github.com/pnp/cli-microsoft365/issues/2516)
- updated 'todo list remove' to Graph v1.0 [#2517](https://github.com/pnp/cli-microsoft365/issues/2517)
- updated 'todo list set' to Graph v1.0 [#2518](https://github.com/pnp/cli-microsoft365/issues/2518)
- updated 'teams user app remove' to Graph v1.0 [#2514](https://github.com/pnp/cli-microsoft365/issues/2514)
- updated 'teams user app add' to Graph v1.0 [#2513](https://github.com/pnp/cli-microsoft365/issues/2513)
- updated 'teams team set' to Graph v1.0 [#2511](https://github.com/pnp/cli-microsoft365/issues/2511)
- added documentation for JMESPath sort [#2536](https://github.com/pnp/cli-microsoft365/issues/2536)
- updated 'teams message reply list' to Graph v1.0 [#2509](https://github.com/pnp/cli-microsoft365/issues/2509)
- added remarks to 'spo theme set' docs [#1633](https://github.com/pnp/cli-microsoft365/issues/1633)
- extended 'spo site set' and 'spo site classic set' with description [#2334](https://github.com/pnp/cli-microsoft365/issues/2334)

## [v3.10.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.10.0)

### New commands

**Azure Active Directory:**

- [aad app role list](../cmd/aad/app/app-role-list.md) - gets Azure AD app registration roles [#2144](https://github.com/pnp/cli-microsoft365/issues/2144)

**CLI:**

- [cli config get](../cmd/cli/config/config-get.md) - gets value of a CLI for Microsoft 365 configuration option [#2343](https://github.com/pnp/cli-microsoft365/issues/2343)

**File:**

- [file add](../cmd/file/file-add.md) - uploads file to the specified site using Microsoft Graph [#2384](https://github.com/pnp/cli-microsoft365/issues/2384)

**Power Apps:**

- [pa app remove](../cmd/pa/app/app-remove.md) - removes the specified Power App [#2133](https://github.com/pnp/cli-microsoft365/issues/2133)

**SharePoint:**

- [spo site apppermission set](../cmd/spo/site/site-apppermission-set.md) - updates a specific application permission for a site [#2210](https://github.com/pnp/cli-microsoft365/issues/2210)

### Changes

- added the 'Replace membership in group or team' sample [#2372](https://github.com/pnp/cli-microsoft365/issues/2372)
- added the 'Monitor Site Collections Storage Usage' sample script [#2224](https://github.com/pnp/cli-microsoft365/issues/2224)
- added support for printing errors as JSON in JSON output [#2298](https://github.com/pnp/cli-microsoft365/issues/2298)
- extended 'spo site apppermission list' with roles [#2412](https://github.com/pnp/cli-microsoft365/issues/2412)
- fixed removing users from O365 groups [#2368](https://github.com/pnp/cli-microsoft365/issues/2368)
- fixed printing validation errors as json [#2429](https://github.com/pnp/cli-microsoft365/issues/2429)
- added the 'Add multiple folders in libraries using a csv file' sample script [#2415](https://github.com/pnp/cli-microsoft365/issues/2415)
- updated PowerShell samples to use simplified CLI config [#2428](https://github.com/pnp/cli-microsoft365/issues/2428)
- updated 'aad user list' docs [#2434](https://github.com/pnp/cli-microsoft365/issues/2434)
- added the 'Replace spo site collection admin' sample [#2221](https://github.com/pnp/cli-microsoft365/issues/2221)
- extended 'spo site apppermission get' with roles [#2409](https://github.com/pnp/cli-microsoft365/issues/2409)
- added 'Search flows for connection' sample [#2444](https://github.com/pnp/cli-microsoft365/issues/2444)
- extended 'spo list get' with properties [#2443](https://github.com/pnp/cli-microsoft365/issues/2443)
- changed 'flow run list' to return all runs [#2458](https://github.com/pnp/cli-microsoft365/issues/2458)

## [v3.9.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.9.0)

### New commands

**Azure Active Directory:**

- [aad app role add](../cmd/aad/app/app-role-add.md) - Adds role to the specified Azure AD app registration [#2145](https://github.com/pnp/cli-microsoft365/issues/2145)

**Planner:**

- [planner plan add](../cmd/planner/plan/plan-add.md) - adds a new Microsoft Planner plan [#2253](https://github.com/pnp/cli-microsoft365/issues/2253)

**SharePoint:**

- [spo site apppermission add](../cmd/spo/site/site-apppermission-add.md) - adds a specific application permissions to the site [#2208](https://github.com/pnp/cli-microsoft365/issues/2208)
- [spo userprofile get](../cmd/spo/userprofile/userprofile-get.md) - gets SharePoint user profile properties for the specified user [#1670](https://github.com/pnp/cli-microsoft365/issues/1670)

**Microsoft Viva:**

- [viva connections app create](../cmd/viva/connections/connections-app-create.md) - creates a Viva Connections desktop app package to upload to Microsoft Teams

### Changes

- moved from adal-node to msal-node [#2156](https://github.com/pnp/cli-microsoft365/issues/2156)
- added eslint. Fixed code to align with eslint config [#2058](https://github.com/pnp/cli-microsoft365/issues/2058)
- updated command examples to use long options [#2319](https://github.com/pnp/cli-microsoft365/issues/2319)
- fixed broken list of command options [#2320](https://github.com/pnp/cli-microsoft365/issues/2320)
- added support for using relative URLs in spo commands [#2313](https://github.com/pnp/cli-microsoft365/issues/2313)
- added support for configuring error output [#2325](https://github.com/pnp/cli-microsoft365/issues/2325)
- fixed docs for 'spo list set' [#2332](https://github.com/pnp/cli-microsoft365/issues/2332)
- added 'Cleanup completed Microsoft To Do tasks' sample script [#2339](https://github.com/pnp/cli-microsoft365/issues/2339)
- added the 'Create a Microsoft Teams team and bulk add members from CSV file' sample [#2288](https://github.com/pnp/cli-microsoft365/issues/2288)
- added the 'Setup example site' sample script [#2328](https://github.com/pnp/cli-microsoft365/issues/2328)
- added ESLint extension to Remote Development Container [#2327](https://github.com/pnp/cli-microsoft365/issues/2327)
- fixed MKDocs Tab rendering issue in Remote Development Container [#2341](https://github.com/pnp/cli-microsoft365/issues/2341)
- added eslint rule to check command's class name [#1819](https://github.com/pnp/cli-microsoft365/issues/1819)
- added new sample script 'Upload local files and folders to SharePoint Online' [#2302](https://github.com/pnp/cli-microsoft365/issues/2302)
- added support for upgrading SPFx projects to beta versions of SPFx [#2354](https://github.com/pnp/cli-microsoft365/issues/2354)
- added support for upgrading SPFx projects to v1.12.1-rc.0 [#2355](https://github.com/pnp/cli-microsoft365/issues/2355)
- changed order of commands for upgrading SPFx projects [#2358](https://github.com/pnp/cli-microsoft365/issues/2358)
- added support for creating AAD apps from manifest [#2316](https://github.com/pnp/cli-microsoft365/issues/2316)
- added support for tracking help usage in telemetry [#2336](https://github.com/pnp/cli-microsoft365/issues/2336)
- added returning human-readable error on invalid JMESPath queries [#2279](https://github.com/pnp/cli-microsoft365/issues/2279)
- added support for upgrading SPFx projects to v1.12.1-rc.1 [#2363](https://github.com/pnp/cli-microsoft365/issues/2363)
- fixed the conflicting documentation around the --withSecret command option in aad app add [#2365](https://github.com/pnp/cli-microsoft365/pull/2365)
- added the 'Bulk add members to Microsoft Teams team from CSV file' sample script [#2285](https://github.com/pnp/cli-microsoft365/issues/2285)
- added the 'Copy files to another SharePoint Library in another site' sample script [#2370](https://github.com/pnp/cli-microsoft365/pull/2370)
- added support for upgrading SPFx projects to v1.12.1-rc.2 [#2378](https://github.com/pnp/cli-microsoft365/issues/2378)
- extended the `spo contenttype get` command with `name` [#2335](https://github.com/pnp/cli-microsoft365/issues/2335)
- added the 'Remove a Site Collection Admin User from all Site Collections' sample script [#2223](https://github.com/pnp/cli-microsoft365/issues/2223)
- added support for upgrading SPFx projects to v1.12.1-rc.3 [#2387](https://github.com/pnp/cli-microsoft365/issues/2387)
- added the 'Replace an owner in a Microsoft 365 Group or Microsoft Team' sample script [#2348](https://github.com/pnp/cli-microsoft365/issues/2348)
- fixed typo in docs for 'teams tab get' [#2390](https://github.com/pnp/cli-microsoft365/pull/2390)
- added the 'Add a site collection admin using csv file' sample [#2220](https://github.com/pnp/cli-microsoft365/issues/2220)
- fixed API change in 'flow export' [#2398](https://github.com/pnp/cli-microsoft365/issues/2398)
- added support for upgrading SPFx projects to v1.12.1 [#2401](https://github.com/pnp/cli-microsoft365/issues/2401)

## [v3.8.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.8.0)

### New commands

**Azure Active Directory:**

- [aad policy list](../cmd/aad/policy/policy-list.md) - returns policies from Azure AD [#2164](https://github.com/pnp/cli-microsoft365/issues/2164)

### Changes

- added support for configuring default output [#2246](https://github.com/pnp/cli-microsoft365/issues/2246)
- restored showing original API errors [#2138](https://github.com/pnp/cli-microsoft365/issues/2138)
- added new sample script for granting API permissions to SharePoint AAD App [#2243](https://github.com/pnp/cli-microsoft365/issues/2243)
- added the 'List all Microsoft Teams team's Owners and Members' sample [#2284](https://github.com/pnp/cli-microsoft365/issues/2284)
- fixed the 'spo tenant appcatalog add' command [#2300](https://github.com/pnp/cli-microsoft365/issues/2300)
- added the 'M365 health status' sample script [#2107](https://github.com/pnp/cli-microsoft365/issues/2107)
- fixed broken tests when default output configured to JSON [#2305](https://github.com/pnp/cli-microsoft365/issues/2305)

## [v3.7.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.7.0)

### New commands

**CLI:**

- [cli config set](../cmd/cli/config/config-set.md) - sets CLI for Microsoft 365 configuration options [#1945](https://github.com/pnp/cli-microsoft365/issues/1945)

**SharePoint:**

- [spo site apppermission get](../cmd/spo/site/site-apppermission-get.md) - gets a specific application permissions for the site [#2207](https://github.com/pnp/cli-microsoft365/issues/2207)
- [spo site apppermission list](../cmd/spo/site/site-apppermission-list.md) - lists application permissions for a site [#2206](https://github.com/pnp/cli-microsoft365/issues/2206)

**Teams:**

- [teams conversationmember add](../cmd/teams/conversationmember/conversationmember-add.md) - adds a conversation member in a private channel [#1986](https://github.com/pnp/cli-microsoft365/issues/1986)

### Changes

- added conditionally saving page in 'spo page set' [#2211](https://github.com/pnp/cli-microsoft365/issues/2211)
- fixed issue in `spo page control set` discarding data on save [#2216](https://github.com/pnp/cli-microsoft365/issues/2216)
- added missing `includeOndriveSites` option to `spo site classic list` docs [#2234](https://github.com/pnp/cli-microsoft365/issues/2234)
- added Remote Development container [#1832](https://github.com/pnp/cli-microsoft365/issues/1832)
- moved `spo page list` to use pages API [#2241](https://github.com/pnp/cli-microsoft365/issues/2241)
- added support for configuring auto showing help on failure [#1945](https://github.com/pnp/cli-microsoft365/issues/1945)
- added the 'Provision a Team with channels and assign a custom icon' sample [#2148](https://github.com/pnp/cli-microsoft365/issues/2148)
- extended `aad o365group remove` with `skipRecycleBin` [#1986](https://github.com/pnp/cli-microsoft365/issues/1986)
- updated product name from 'Microsoft Flow' to 'Power Automate' in docs [#2259](https://github.com/pnp/cli-microsoft365/issues/2259)
- added the 'List site collections and their lists' sample script [#2272](https://github.com/pnp/cli-microsoft365/issues/2272)
- added site external users report sample [#2277](https://github.com/pnp/cli-microsoft365/issues/2277)
- added the 'Delete all Microsoft 365 groups and SharePoint sites' sample [#2278](https://github.com/pnp/cli-microsoft365/issues/2278)
- added support for upgrading SPFx projects to v1.12 [#2154](https://github.com/pnp/cli-microsoft365/issues/2154)
- extended spfx doctor with support for SPFx v1.12 [#2173](https://github.com/pnp/cli-microsoft365/issues/2173)

## [v3.6.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.6.0)

### New commands

**Power Apps:**

- [pa app get](../cmd/pa/app/app-get.md) - gets information about the specified Microsoft Power App [#2110](https://github.com/pnp/cli-microsoft365/issues/2110)
- [pa environment get](../cmd/pa/environment/environment-get.md) - gets information about the specified Microsoft Power Apps environment [#2109](https://github.com/pnp/cli-microsoft365/issues/2109)
- [pa environment list](../cmd/pa/environment/environment-list.md) - lists Microsoft Power Apps environments in the current tenant [#2108](https://github.com/pnp/cli-microsoft365/issues/2108)

**SharePoint:**

- [spo page copy](../cmd/spo/page/page-copy.md) - creates a copy of a modern page or template [#2088](https://github.com/pnp/cli-microsoft365/issues/2088)
- [spo site chrome set](../cmd/spo/site/site-chrome-set.md) - sets the chrome header and footer for the specified site [#2161](https://github.com/pnp/cli-microsoft365/issues/2161)
- [spo site ensure](../cmd/spo/site/site-ensure.md) - ensures that the particular site collection exists and updates its properties if necessary [#1404](https://github.com/pnp/cli-microsoft365/issues/1404)

### Changes

- fixed broken tests in 'tenant auditlog report' on Node@10 [#2125](https://github.com/pnp/cli-microsoft365/issues/2125)
- fixed uploading large files [#2120](https://github.com/pnp/cli-microsoft365/issues/2120)
- implemented browser-based login [#1979](https://github.com/pnp/cli-microsoft365/issues/1979)
- fixed bug in 'spo tenant appcatalog add' [#2129](https://github.com/pnp/cli-microsoft365/issues/2129)
- changed the logic to keep original value if @-value is not a valid file path [#2134](https://github.com/pnp/cli-microsoft365/issues/2134)
- removed 'description' property from command option [#2112](https://github.com/pnp/cli-microsoft365/issues/2112)
- extended 'spo page set' with title [#2140](https://github.com/pnp/cli-microsoft365/issues/2140)
- moved 'DONE' out of the `commandAction` [#2045](https://github.com/pnp/cli-microsoft365/issues/2045)
- simplified returning command name [#2123](https://github.com/pnp/cli-microsoft365/issues/2123)
- extended 'util accesstoken get' with `sharepoint` as resource [#2096](https://github.com/pnp/cli-microsoft365/issues/2096)
- updated command option in readme.md
- improved `environment get` commands with text results [#2153](https://github.com/pnp/cli-microsoft365/issues/2153)
- extended 'spo web set' with the ability to reset the logo [#2177](https://github.com/pnp/cli-microsoft365/issues/2177)
- added PowerShell examples to 'adaptivecard send' docs [#2167](https://github.com/pnp/cli-microsoft365/pull/2167)
- added 'm365' prefix to sample in 'pa app list' docs [#2182](https://github.com/pnp/cli-microsoft365/pull/2182)
- added 'm365' prefix in 'version' docs [#2183](https://github.com/pnp/cli-microsoft365/pull/2183)
- added 'Export Teams conversations' sample script [#2104](https://github.com/pnp/cli-microsoft365/issues/2104)
- extended test script with checking Node version [#2181](https://github.com/pnp/cli-microsoft365/issues/2181)
- extended `spo site set` with setting site logo [#2175](https://github.com/pnp/cli-microsoft365/issues/2175)
- extended `spo page get` with support for loading only metadata [#2184](https://github.com/pnp/cli-microsoft365/pull/2184)
- fixed control and section parsing in 'spo page get' [#2179](https://github.com/pnp/cli-microsoft365/issues/2179)
- fixed bug in uploading large files [#2199](https://github.com/pnp/cli-microsoft365/issues/2199)
- extended `aad app add` with returning tenantId [#2187](https://github.com/pnp/cli-microsoft365/issues/2187)
- extended output of `spo page get` with canvasContentJson [#2193](https://github.com/pnp/cli-microsoft365/issues/2193)
- fixed looking up service principals with trailing slash in `aad app add` [#2188](https://github.com/pnp/cli-microsoft365/issues/2188)
- changed `spo page control list` to use the pages API [#2198](https://github.com/pnp/cli-microsoft365/issues/2198)
- fixed issue with character encoding in `spo page control set` [#2195](https://github.com/pnp/cli-microsoft365/issues/2195)
- fixed issue with character encoding in `spo page control get` [#2202](https://github.com/pnp/cli-microsoft365/issues/2202)
- extended `spo page control list` with empty CanvasContent1 check [#2204](https://github.com/pnp/cli-microsoft365/issues/2204)
- added the `List all tabs in Teams` sample script [#2075](https://github.com/pnp/cli-microsoft365/issues/2075)
- extended `aad o365group get` with `teams team get` alias [#2214](https://github.com/pnp/cli-microsoft365/issues/2214)
- added the `List all sites' owners` sample script [#2168](https://github.com/pnp/cli-microsoft365/issues/2168)

## [v3.5.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.5.0)

### New commands

**Adaptive Cards:**

- [adaptivecard send](../cmd/adaptivecard/adaptivecard-send.md) - sends adaptive card to the specified URL [#2005](https://github.com/pnp/cli-microsoft365/issues/2005)

**Azure Active Directory:**

- [aad app add](../cmd/aad/app/app-add.md) - creates new Azure AD app registration [#1962](https://github.com/pnp/cli-microsoft365/issues/1962)
- [aad o365group recyclebinitem list](../cmd/aad/o365group/o365group-recyclebinitem-list.md) - lists Groups from the recycle bin in the current tenant [#2032](https://github.com/pnp/cli-microsoft365/issues/2032)

**Microsoft 365:**

- [tenant auditlog report](../cmd/tenant/auditlog/auditlog-report.md) - gets audit logs from the Office 365 Management API [#1739](https://github.com/pnp/cli-microsoft365/issues/1739)

**File:**

- [file convert pdf](../cmd/file/convert/convert-pdf.md) - converts the specified file to PDF using Microsoft Graph [#2010](https://github.com/pnp/cli-microsoft365/issues/2010)

**Power Automate:**

- [flow run resubmit](../cmd/flow/run/run-resubmit.md) - resubmits a specific flow run for the specified Microsoft Flow [#1871](https://github.com/pnp/cli-microsoft365/issues/1871)

**SharePoint:**

- [spo list view field set](../cmd/spo/list/list-view-field-set.md) - updates existing column in an existing view (eg. move to a specific position) [#2059](https://github.com/pnp/cli-microsoft365/issues/2059)
- [spo page template list](../cmd/spo/page/page-template-list.md) - lists all page templates in the given site [#2065](https://github.com/pnp/cli-microsoft365/issues/2065)

### Changes

- updated 'teams team add' to use Microsoft Graph v1.0 API [#2020](https://github.com/pnp/cli-microsoft365/issues/2020)
- applied multiple performance improvements [#2047](https://github.com/pnp/cli-microsoft365/pull/2047)
- fixed 'page header set' command [#2049](https://github.com/pnp/cli-microsoft365/issues/2049), [#2050](https://github.com/pnp/cli-microsoft365/issues/2050)
- added wait-npm-publish script to CI/CD [#2053](https://github.com/pnp/cli-microsoft365/pull/2053)
- added support for passing complex content from files [#2042](https://github.com/pnp/cli-microsoft365/issues/2042)
- added support for adding page description to 'spo page add' and 'spo page set' [#2044](https://github.com/pnp/cli-microsoft365/issues/2044)
- added new sample script for exporting a flow to Logic app [#2067](https://github.com/pnp/cli-microsoft365/issues/2067)
- added new sample script for emptying the tenant recycle bin [#1142](https://github.com/pnp/cli-microsoft365/issues/1142)
- updated sample script changing CLI command name to m365 [#2063](https://github.com/pnp/cli-microsoft365/issues/2063)
- added new sample script 'Export all Flows in environment' [#2082](https://github.com/pnp/cli-microsoft365/pull/2082)
- added new sample script 'List all application customizers' [#2074](https://github.com/pnp/cli-microsoft365/issues/2074)
- changed secret expiration to 1 year in `aad app add` [#2064](https://github.com/pnp/cli-microsoft365/issues/2064)
- added support for setting authors and checks in page in 'spo page header set' [#2069](https://github.com/pnp/cli-microsoft365/issues/2069), [#2070](https://github.com/pnp/cli-microsoft365/issues/2070)
- fixed removing previous values and checks in page in 'spo page clientsidewebpart add' [#2068](https://github.com/pnp/cli-microsoft365/issues/2068), [#2069](https://github.com/pnp/cli-microsoft365/issues/2069)
- checking in page if not published in 'spo page add' and 'spo page set' [#2069](https://github.com/pnp/cli-microsoft365/issues/2069)
- fixed bug in 'spo app add' returning an object instead of just the app ID [#2080](https://github.com/pnp/cli-microsoft365/issues/2080)
- fixed 'spo listitem get' doc [#2093](https://github.com/pnp/cli-microsoft365/issues/2093)
- fixed bug in exporting flows [#2091](https://github.com/pnp/cli-microsoft365/issues/2091)
- fixed logging output when using JMESPath queries [#2095](https://github.com/pnp/cli-microsoft365/issues/2095)
- updated guidance for escaping quotes in bash [#2043](https://github.com/pnp/cli-microsoft365/issues/2043)
- replaces `rmSync` with `unlinkSync` in 'file convert pdf' [#2106](https://github.com/pnp/cli-microsoft365/issues/2106)
- fixed escaping backslash in 'spo page get' [#2114](https://github.com/pnp/cli-microsoft365/issues/2114)

## [v3.4.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.4.0)

### New commands

**SharePoint:**

- [spo list contenttype default set](../cmd/spo/list/list-contenttype-default-set.md) - sets the default content type for a list [#674](https://github.com/pnp/cli-microsoft365/issues/674)

**Teams:**

- [teams report directroutingcalls](../cmd/teams/report/report-directroutingcalls.md) - gets details about direct routing calls made within a given time period [#1772](https://github.com/pnp/cli-microsoft365/issues/1772)
- [teams report pstncalls](../cmd/teams/report/report-pstncalls.md) - gets details about PSTN calls made within a given time period [#1771](https://github.com/pnp/cli-microsoft365/issues/1771)

**Yammer:**

- [yammer search](../cmd/yammer/yammer-search.md) - returns a list of messages, users, topics and groups that match the specified query [#1454](https://github.com/pnp/cli-microsoft365/issues/1454)

### Changes

- updated docs for the login command with links to more info [#1966](https://github.com/pnp/cli-microsoft365/pull/1966)
- moved global options in docs to a separate file [#1852](https://github.com/pnp/cli-microsoft365/issues/1889), [#1969](https://github.com/pnp/cli-microsoft365/issues/1969)
- extended `login` with support for passing base64-encoded certificate [#1971](https://github.com/pnp/cli-microsoft365/issues/1971)
- extended `login` with calculating thumbprint from the certificate [#1973](https://github.com/pnp/cli-microsoft365/issues/1973)
- fixed 'spo listitem set' command [#1984](https://github.com/pnp/cli-microsoft365/issues/1984)
- changed loading optional dependencies to lazy to speed up CLI [#1990](https://github.com/pnp/cli-microsoft365/pull/1990)
- extended `login` with support for .pfx certificates not protected with a password [#1974](https://github.com/pnp/cli-microsoft365/issues/1974)
- fixed the `outlook mail send` command [#1991](https://github.com/pnp/cli-microsoft365/issues/1991)
- extended the `login` command with appId and tenant [#1975](https://github.com/pnp/cli-microsoft365/issues/1975)
- fixed the `spo apppage add` command [#2000](https://github.com/pnp/cli-microsoft365/issues/2000)
- removed short options from args passed to commands [#1992](https://github.com/pnp/cli-microsoft365/issues/1992)
- extended `spo sitedesign get` to include `title` [#1884](https://github.com/pnp/cli-microsoft365/issues/1884)
- removed unnecessary request digest from `spo sitedesign list` [#2006](https://github.com/pnp/cli-microsoft365/issues/2006)
- fixed issue with resolving uppercase URLs [#2011](https://github.com/pnp/cli-microsoft365/issues/2011)
- added Dockerfile [#1786](https://github.com/pnp/cli-microsoft365/issues/1786)
- added line information to JSON-based rules in 'spfx project upgrade' [#1602](https://github.com/pnp/cli-microsoft365/issues/1602)
- removed the 'started' telemetry event [#2018](https://github.com/pnp/cli-microsoft365/pull/2018)
- clarified SPFx project upgrade actions [#1857](https://github.com/pnp/cli-microsoft365/issues/1857), [#1569](https://github.com/pnp/cli-microsoft365/issues/1569)
- added preserving page content to `spo page header set` [#2019](https://github.com/pnp/cli-microsoft365/issues/2019)

## [v3.3.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.3.0)

### New commands

**Power Automate:**

- [flow run cancel](../cmd/flow/run/run-cancel.md) - cancels the specified Microsoft Flow [#1870](https://github.com/pnp/cli-microsoft365/issues/1870)

**SharePoint:**

- [spo file sharinginfo get](../cmd/spo/file/file-sharinginfo-get.md) - generates a sharing information report for the specified file [#1659](https://github.com/pnp/cli-microsoft365/issues/1659)
- [spo page control set](../cmd/spo/page/page-control-set.md) - updates web part data or properties of a control on a modern page [#1934](https://github.com/pnp/cli-microsoft365/issues/1934)
- [spo tenant recyclebinitem remove](../cmd/spo/tenant/tenant-recyclebinitem-remove.md) - removes the specified deleted Site Collection from Tenant Recycle Bin [#1145](https://github.com/pnp/cli-microsoft365/issues/1145)
- [spo tenant recyclebinitem restore](../cmd/spo/tenant/tenant-recyclebinitem-restore.md) - restores the specified deleted Site Collection from Tenant Recycle Bin [#1362](https://github.com/pnp/cli-microsoft365/issues/1362)

**Teams:**

- [teams conversationmember list](../cmd/teams/conversationmember/conversationmember-list.md) - lists all conversational members of a channel [#1880](https://github.com/pnp/cli-microsoft365/issues/1880)

**To Do:**

- [todo task add](../cmd/todo/task/task-add.md) - adds a task to a Microsoft To Do list [#1898](https://github.com/pnp/cli-microsoft365/issues/1898)
- [todo task list](../cmd/todo/task/task-list.md) - lists tasks in a Microsoft To Do task list [#1901](https://github.com/pnp/cli-microsoft365/issues/1901)
- [todo task remove](../cmd/todo/task/task-remove.md) - removes the specified Microsoft To Do task [#1900](https://github.com/pnp/cli-microsoft365/issues/1900)
- [todo task set](../cmd/todo/task/task-set.md) - sets a task in a Microsoft To Do list [#1899](https://github.com/pnp/cli-microsoft365/issues/1899)

### Changes

- extended channel list with teamName [#1889](https://github.com/pnp/cli-microsoft365/issues/1889)
- extended 'teams channel get' command with support for teamName and channelName options [#1887](https://github.com/pnp/cli-microsoft365/issues/1887)
- extended 'spo tenant settings set' with DisableCustomAppAuthentication [#1829](https://github.com/pnp/cli-microsoft365/issues/1829)
- added the 'Analyze Microsoft 365 User Profile Photos using Azure Computer Vision API' sample script [#1894](https://github.com/pnp/cli-microsoft365/issues/1894)
- fixed displaying command groups in alphabetical order in help [#1922](https://github.com/pnp/cli-microsoft365/issues/1922)
- fixed excluding command and arguments as field values in 'spo file add' [#1936](https://github.com/pnp/cli-microsoft365/issues/1936)
- refactored processing command output [#1552](https://github.com/pnp/cli-microsoft365/issues/1552), [#1823](https://github.com/pnp/cli-microsoft365/issues/1823) and [#1875](https://github.com/pnp/cli-microsoft365/issues/1875)
- fixed displaying help for command's alias [#1907](https://github.com/pnp/cli-microsoft365/issues/1907)
- added tracking output mode to telemetry [#1946](https://github.com/pnp/cli-microsoft365/pull/1946)
- fixed retrieving unknown options [#1947](https://github.com/pnp/cli-microsoft365/issues/1947)
- renamed `query` to `camlQuery` in `spo listitem list` [#1948](https://github.com/pnp/cli-microsoft365/issues/1948)
- fixed user-agent header [#1951](https://github.com/pnp/cli-microsoft365/issues/1951)
- fixed user guide env. variable naming [#1954](https://github.com/pnp/cli-microsoft365/issues/1954)
- made 'console.log()' synchronous [#1266](https://github.com/pnp/cli-microsoft365/issues/1266)
- extended `todo task list` with id [#1943](https://github.com/pnp/cli-microsoft365/issues/1943)

## [v3.2.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.2.0)

### New commands

**Azure Active Directory:**

- [aad approleassignment remove](../cmd/aad/approleassignment/approleassignment-remove.md) - deletes an app role assignment for the specified Azure AD Application Registration [#1872](https://github.com/pnp/cli-microsoft365/issues/1872)

**Microsoft Teams:**

- [teams tab get](../cmd/teams/tab/tab-get.md) - gets information about the specified Microsoft Teams tab [#1804](https://github.com/pnp/cli-microsoft365/issues/1804)
- [teams user app list](../cmd/teams/user/user-app-list.md) - lists the apps installed in the personal scope of the specified user [#1866](https://github.com/pnp/cli-microsoft365/issues/1866)

**SharePoint:**

- [spo knowledgehub get](../cmd/spo/knowledgehub/knowledgehub-get.md) - gets the Knowledge Hub Site URL for your tenant [#1575](https://github.com/pnp/cli-microsoft365/issues/1575)

### Changes

- removed Vorpal [#1737](https://github.com/pnp/cli-microsoft365/issues/1737)
- extended 'todo list set' with name [#1806](https://github.com/pnp/cli-microsoft365/issues/1806)
- updated 'aad approleassignment list' to v1.0 graph API [#1604](https://github.com/pnp/cli-microsoft365/issues/1604)
- removed `CommandInstance` and simplifies `validate()` [#1821](https://github.com/pnp/cli-microsoft365/issues/1821)
- replaced request with Axios [#1363](https://github.com/pnp/cli-microsoft365/issues/1363)
- added quotes to paths in shell commands [#1849](https://github.com/pnp/cli-microsoft365/issues/1849)
- fixed 'flow export' command [#1845](https://github.com/pnp/cli-microsoft365/issues/1845)
- extended 'spo site remove' with support for M365 groups [#1561](https://github.com/pnp/cli-microsoft365/issues/1561)
- added the 'Deploy a Microsoft Teams personal app and add it to users' sample script [#1867](https://github.com/pnp/cli-microsoft365/pull/1867)
- added Teams scope to the list of default permissions in the docs [#1860](https://github.com/pnp/cli-microsoft365/issues/1860)
- updated 'aad approleassignment add' to use Microsoft Graph [#1858](https://github.com/pnp/cli-microsoft365/issues/1858)
- added the 'Removes Microsoft Teams personal app from users and Microsoft Teams app catalog' sample script [#1883](https://github.com/pnp/cli-microsoft365/pull/1883)
- extended 'teams app list' with support for using Team's name [#1861](https://github.com/pnp/cli-microsoft365/issues/1861)
- excluded missing global options in 'spo tenant settings set' [#1903](https://github.com/pnp/cli-microsoft365/issues/1903)
- added support for specifying Team name in `teams channel add` [#1888](https://github.com/pnp/cli-microsoft365/issues/1888)
- excluded missing global options in 'aad user list' [#1909](https://github.com/pnp/cli-microsoft365/issues/1909)
- fixed 'spo file get' for large files [#1796](https://github.com/pnp/cli-microsoft365/issues/1796)

## [v3.1.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.1.0)

### New commands

**Microsoft 365:**

- [tenant service list](../cmd/tenant/service/service-list.md) - gets services available in Microsoft 365 [#1740](https://github.com/pnp/cli-microsoft365/issues/1740)
- [tenant service message list](../cmd/tenant/service/service-message-list.md) - gets service messages Microsoft 365 [#1741](https://github.com/pnp/cli-microsoft365/issues/1741)
- [tenant service report historicalservicestatus](../cmd/tenant/service/service-report-historicalservicestatus.md) - gets the historical service status of Microsoft 365 Services of the last 7 days [#1742](https://github.com/pnp/cli-microsoft365/issues/1742)

**Outlook:**

- [outlook message list](../cmd/outlook/message/message-list.md) - gets all mail messages from the specified folder [#1764](https://github.com/pnp/cli-microsoft365/issues/1764)
- [outlook message move](../cmd/outlook/message/message-move.md) - moves message to the specified folder [#1765](https://github.com/pnp/cli-microsoft365/issues/1765)

**Power Apps:**

- [pa app list](../cmd/pa/app/app-list.md) - lists all Power Apps apps [#1789](https://github.com/pnp/cli-microsoft365/issues/1789)

**SharePoint:**

- [spo knowledgehub remove](../cmd/spo/knowledgehub/knowledgehub-remove.md) - removes the Knowledge Hub Site setting for your tenant [#1577](https://github.com/pnp/cli-microsoft365/issues/1577)

### Changes

- added the 'Remove orphaned redirect sites' sample script [#1717](https://github.com/pnp/cli-microsoft365/issues/1717)
- extended 'spo page get' json output to include all returned properties [#1729](https://github.com/pnp/cli-microsoft365/issues/1729)
- extended 'spfx doctor' with support for SPFx v1.11 [#1721](https://github.com/pnp/cli-microsoft365/issues/1721)
- extended 'tenant status list' with filtering by workload [#1743](https://github.com/pnp/cli-microsoft365/issues/1743)
- fixed long running copy and move operations [#1698](https://github.com/pnp/cli-microsoft365/issues/1698)
- added 'm365' alias to examples in docs and help [#1694](https://github.com/pnp/cli-microsoft365/issues/1694)
- added support for parsing JSON with BOM to 'spfx project upgrade' [#1723](https://github.com/pnp/cli-microsoft365/issues/1723)
- renamed token file use the new CLI name [#1810](https://github.com/pnp/cli-microsoft365/pull/1810)

## [v3.0.0](https://github.com/pnp/cli-microsoft365/releases/tag/v3.0.0)

### New commands

**Microsoft Teams:**

- [teams app user remove](../cmd/teams/user/user-app-remove.md) - uninstall an app from the personal scope of the specified user [#1711](https://github.com/pnp/cli-microsoft365/issues/1711)

**Microsoft To Do:**

- [todo list list](../cmd/todo/list/list-list.md) - returns a list of Microsoft To Do task lists [#1609](https://github.com/pnp/cli-microsoft365/issues/1609)
- [todo list remove](../cmd/todo/list/list-remove.md) - removes a Microsoft To Do task list [#1611](https://github.com/pnp/cli-microsoft365/issues/1611)
- [todo list set](../cmd/todo/list/list-set.md) - updates a Microsoft To Do task list [#1612](https://github.com/pnp/cli-microsoft365/issues/1612)

**SharePoint:**

- [spo group list](../cmd/spo/group/group-list.md) - lists groups from specific web [#1691](https://github.com/pnp/cli-microsoft365/issues/1691)
- [spo knowledgehub set](../cmd/spo/knowledgehub/knowledgehub-set.md) - sets the Knowledge Hub Site for your tenant [#1576](https://github.com/pnp/cli-microsoft365/issues/1576)

### Changes

- fixed 'spo search' command [#1696](https://github.com/pnp/cli-microsoft365/issues/1696)
- added the 'Export Configurations of Tenant Wide Extensions' sample script [#1440](https://github.com/pnp/cli-microsoft365/issues/1440)
- extended 'spo site set' with sharing capabilities [#1713](https://github.com/pnp/cli-microsoft365/issues/1713)
- removed deprecated 'id' option in 'spo site set' [#1536](https://github.com/pnp/cli-microsoft365/issues/1536)
- removed deprecated exit code in 'spfx project upgrade' [#1418](https://github.com/pnp/cli-microsoft365/issues/1418)
- removed immersive mode [#1600](https://github.com/pnp/cli-microsoft365/issues/1600)
- removed '-h' as option [#1680](https://github.com/pnp/cli-microsoft365/issues/1680)
- removed deprecated 'accesstoken get' alias [#1368](https://github.com/pnp/cli-microsoft365/issues/1368)
- removed '--pretty' global option [#1338](https://github.com/pnp/cli-microsoft365/issues/1338)
- removed deprecated aliases [#1339](https://github.com/pnp/cli-microsoft365/issues/1339)
- renamed 'Office 365 CLI' to 'CLI for Microsoft 365' [#1635](https://github.com/pnp/cli-microsoft365/issues/1635)
- added 'owners' option for CommunicationSite creation using 'spo site add' [#1734](https://github.com/pnp/cli-microsoft365/issues/1734)
- added LCID validation to 'spo site add' [#1749](https://github.com/pnp/cli-microsoft365/issues/1749)
- added "Caveats when certificate login" doc [#1734](https://github.com/pnp/cli-microsoft365/issues/1734), [#1738](https://github.com/pnp/cli-microsoft365/issues/1738)
- removed obsolete `outputFile` option [#1769](https://github.com/pnp/cli-microsoft365/issues/1769)
- renamed environment variables from `OFFICE365CLI` to `CLIMICROSOFT365` [#1787](https://github.com/pnp/cli-microsoft365/pull/1787)
- extended 'spo web set' with welcomePage [#1730](https://github.com/pnp/cli-microsoft365/pull/1730)

## [v2.13.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.13.0)

### New commands

**SharePoint:**

- [spo group remove](../cmd/spo/group/group-remove.md) - removes group from specific web [#1693](https://github.com/pnp/cli-microsoft365/issues/1693)
- [spo user list](../cmd/spo/user/user-list.md) - lists all the users within specific web [#1672](https://github.com/pnp/cli-microsoft365/issues/1672)
- [spo userprofile set](../cmd/spo/userprofile/userprofile-set.md) - sets user profile property for a SharePoint user [#1671](https://github.com/pnp/cli-microsoft365/issues/1671)

### Changes

- added the 'List app usage in Microsoft Teams' sample script [#1640](https://github.com/pnp/cli-microsoft365/issues/1640)
- fixed the 'Get user with login name' example for 'spo user get' command [#1707](https://github.com/pnp/cli-microsoft365/pull/1707)
- updated CodeTour SPFx upgrade report schema [#1708](https://github.com/pnp/cli-microsoft365/pull/1708)
- consolidated 'spo site add' and 'spo site classic add' commands [#1493](https://github.com/pnp/cli-microsoft365/issues/1493)

## [v2.12.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.12.0)

### New commands

**Microsoft Graph:**

- [graph schemaextension list](../cmd/graph/schemaextension/schemaextension-list.md) - gets a list of schemaExtension objects created in the current tenant [#12](https://github.com/pnp/cli-microsoft365/issues/12)

**SharePoint:**

- [spo group get](../cmd/spo/group/group-get.md) - gets site group [#1692](https://github.com/pnp/cli-microsoft365/issues/1692)
- [spo tenant appcatalog add](../cmd/spo/tenant/tenant-appcatalog-add.md) - creates new tenant app catalog site [#1646](https://github.com/pnp/cli-microsoft365/issues/1646)
- [spo user get](../cmd/spo/user/user-get.md) - gets a site user within specific web [#1673](https://github.com/pnp/cli-microsoft365/issues/1673)
- [spo user remove](../cmd/spo/user/user-remove.md) - removes user from specific web [#1674](https://github.com/pnp/cli-microsoft365/issues/1674)

**SharePoint Framework:**

- [spfx project rename](../cmd/spfx/project/project-rename.md) - renames SharePoint Framework project [#1349](https://github.com/pnp/cli-microsoft365/issues/1349)

### Changes

- added the 'Sync SharePoint Document Library Documents with Azure Storage Container' sample script [#1685](https://github.com/pnp/cli-microsoft365/issues/1685)
- added support for upgrading projects built using SharePoint Framework v1.11.0 [#1714](https://github.com/pnp/cli-microsoft365/issues/1714)

## [v2.11.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.11.0)

### Changes

- added the 'remove wiki tab from a Microsoft Teams channel' sample script [#1506](https://github.com/pnp/cli-microsoft365/issues/1506)
- fixed suggesting incorrect componentType [#1574](https://github.com/pnp/cli-microsoft365/issues/1574)
- added `m365` and `microsoft365` executables [#1637](https://github.com/pnp/cli-microsoft365/issues/1637)
- consolidated `spo site remove` and `spo site classic remove` commands [#1494](https://github.com/pnp/cli-microsoft365/issues/1494)
- added suggesting upgrading dependency @microsoft/sp-page-context [#1521](https://github.com/pnp/cli-microsoft365/issues/1521)
- added suggesting upgrading dependency @microsoft/sp-odata-types [#1520](https://github.com/pnp/cli-microsoft365/issues/1520)
- added suggesting upgrading dependency @microsoft/sp-module-interfaces [#1519](https://github.com/pnp/cli-microsoft365/issues/1519)
- added suggesting upgrading dependency @microsoft/sp-loader [#1518](https://github.com/pnp/cli-microsoft365/issues/1518)
- added suggesting upgrading dependency @microsoft/sp-list-subscription [#1517](https://github.com/pnp/cli-microsoft365/issues/1517)
- fixed detecting onprem SPFx projects' versions [#1647](https://github.com/pnp/cli-microsoft365/issues/1647)
- extended 'teams team add' with support for Teams templates [#916](https://github.com/pnp/cli-microsoft365/issues/916)
- extended 'spo field remove' with removing all fields from a group [#1381](https://github.com/pnp/cli-microsoft365/issues/1381)
- fixed incorrect path in FN018001 [#1661](https://github.com/pnp/cli-microsoft365/issues/1661)
- fixed incorrect path in FN018003 and FN018004 [#1662](https://github.com/pnp/cli-microsoft365/issues/1662)
- fixed resolution of paths on Windows in 'spfx project upgrade'
- added the 'Insert pictures in a SharePoint Document Library into a Word document' sample script [#1653](https://github.com/pnp/cli-microsoft365/issues/1653)
- extended 'teams team add' with support for returning team information [#1654](https://github.com/pnp/cli-microsoft365/issues/1654)
- fixes bug in returning lists [#1667](https://github.com/pnp/cli-microsoft365/issues/1667)

## [v2.10.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.10.0)

### New commands

**Azure Active Directory:**

- [aad approleassignment add](../cmd/aad/approleassignment/approleassignment-add.md) - adds service principal permissions also known as scopes and app role assignments for specified Azure AD application registration [#1581](https://github.com/pnp/cli-microsoft365/issues/1581)

**Microsoft Teams:**

- [teams user app add](../cmd/teams/user/user-app-add.md) - install an app in the personal scope of the specified user [#1450](https://github.com/pnp/cli-microsoft365/issues/1450)

**Microsoft To Do:**

- [todo list add](../cmd/todo/list/list-add.md) - adds a Microsoft To Do task list [#1610](https://github.com/pnp/cli-microsoft365/issues/1610)

**Yammer:**

- [yammer group user add](../cmd/yammer/group/group-user-add.md) - adds a user to a Yammer Group [#1456](https://github.com/pnp/cli-microsoft365/issues/1456)
- [yammer group user remove](../cmd/yammer/group/group-user-remove.md) - removes a user from a Yammer group [#1457](https://github.com/pnp/cli-microsoft365/issues/1457)
- [yammer message like set](../cmd/yammer/message/message-like-set.md) - likes or unlikes a Yammer message [#1455](https://github.com/pnp/cli-microsoft365/issues/1455)

### Changes

- added support for more module types in spfx project externalize [#1192](https://github.com/pnp/cli-microsoft365/issues/1192)
- fixed indentation of resolution for FN012010 [#1467](https://github.com/pnp/cli-microsoft365/issues/1467)
- fixes description of FN003003 [#1469](https://github.com/pnp/cli-microsoft365/issues/1469)
- updated MPA docs with Docker image version [#1531](https://github.com/pnp/cli-microsoft365/issues/1531)
- simplified persisting login information [#1313](https://github.com/pnp/cli-microsoft365/issues/1313)
- updated the Authenticate with Microsoft Graph sample replacing the deprecated method [#1548](https://github.com/pnp/cli-microsoft365/pull/1548)
- included PowerShell completion script in the package [#1551](https://github.com/pnp/cli-microsoft365/issues/1551)
- added Flow inventory sample script [#1522](https://github.com/pnp/cli-microsoft365/issues/1522)
- added managed identity authentication [#1314](https://github.com/pnp/cli-microsoft365/issues/1314)
- fixed 'teams team add' command [#1497](https://github.com/pnp/cli-microsoft365/issues/1497)
- extended 'spo site set' with additional options [#1478](https://github.com/pnp/cli-microsoft365/issues/1478)
- added the 'Bulk add/remove users to Microsoft Teams and Microsoft 365 Groups' sample script [#1540](https://github.com/pnp/cli-microsoft365/issues/1540)
- updates the 'cli consent' command references [#1542](https://github.com/pnp/cli-microsoft365/issues/1542)
- fixed 'aad user list' command [#1553](https://github.com/pnp/cli-microsoft365/issues/1553)
- ensured all global options are ignored in request bodies [#1563](https://github.com/pnp/cli-microsoft365/issues/1563)
- fixed windows builds [#1544](https://github.com/pnp/cli-microsoft365/issues/1544)
- added missing '}' in FN011008 resolution [#1509](https://github.com/pnp/cli-microsoft365/issues/1509)
- fixed issue with logging out after running tests [#1570](https://github.com/pnp/cli-microsoft365/issues/1570)
- fixed incorrect import suggestions in FN016004 [#1484](https://github.com/pnp/cli-microsoft365/issues/1484)
- fixed indentation of FN011010 resolution [#1485](https://github.com/pnp/cli-microsoft365/issues/1485)
- moved SPFx test projects to a common location [#1507](https://github.com/pnp/cli-microsoft365/issues/1507)
- added suggesting upgrading dependency @microsoft/sp-component-base [#1512](https://github.com/pnp/cli-microsoft365/issues/1512)
- made FN011008 supersede FN011009 [#1510](https://github.com/pnp/cli-microsoft365/issues/1510)
- added FN017001 to the summary [#1511](https://github.com/pnp/cli-microsoft365/issues/1511)
- added suggesting upgrading dependency @microsoft/sp-diagnostics [#1513](https://github.com/pnp/cli-microsoft365/issues/1513)
- added suggesting upgrading dependency @microsoft/sp-dynamic-data [#1514](https://github.com/pnp/cli-microsoft365/issues/1514)
- added suggesting upgrading dependency @microsoft/sp-extension-base [#1515](https://github.com/pnp/cli-microsoft365/issues/1515)
- extended 'aad approleassignment list' with --objectId option [#1579](https://github.com/pnp/cli-microsoft365/issues/1579)
- added 'Using your own Azure AD identity' to docs [#1496](https://github.com/pnp/cli-microsoft365/issues/1496)
- added the 'Disable the specified tenant-wide extension' sample script [#1444](https://github.com/pnp/cli-microsoft365/issues/1444)
- added suggesting upgrading dependency @microsoft/sp-http [#1516](https://github.com/pnp/cli-microsoft365/issues/1516)
- added the 'Add custom client-side web part to modern page' sample script [#1438](https://github.com/pnp/cli-microsoft365/issues/1438)
- added CodeTour report for spfx project upgrade [#1592](https://github.com/pnp/cli-microsoft365/issues/1592)
- extended 'aad sp get' with --objectId option [#1567](https://github.com/pnp/cli-microsoft365/issues/1567)
- removed reserved shortcut from 'aad approleassignment list' objectId option [#1607](https://github.com/pnp/cli-microsoft365/issues/1607)

## [v2.9.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.9.0)

### New commands

**Azure Active Directory:**

- [aad o365group report activitystorage](../cmd/aad/o365group/o365group-report-activitystorage.md) - get the total storage used across all group mailboxes and group sites [#1286](https://github.com/pnp/cli-microsoft365/issues/1286)

**Microsoft Teams:**

- [teams tab remove](../cmd/teams/tab/tab-remove.md) - removes a tab from the specified channel [#1449](https://github.com/pnp/cli-microsoft365/issues/1449)

**Microsoft 365:**

- [tenant status list](../cmd/tenant/status/status-list.md) - gets health status of the different services in Microsoft 365 [#1272](https://github.com/pnp/cli-microsoft365/issues/1272)

**SharePoint:**

- [spo orgassetslibrary add](../cmd/spo/orgassetslibrary/orgassetslibrary-add.md) - promotes an existing library to become an organization assets library [#1040](https://github.com/pnp/cli-microsoft365/issues/1040)

**Yammer:**

- [yammer report activitycounts](../cmd/yammer/report/report-activitycounts.md) - gets the trends on the amount of Yammer activity in your organization by how many messages were posted, read, and liked [#1383](https://github.com/pnp/cli-microsoft365/issues/1383)
- [yammer report activityusercounts](../cmd/yammer/report/report-activityusercounts.md) - gets the trends on the number of unique users who posted, read, and liked Yammer messages [#1384](https://github.com/pnp/cli-microsoft365/issues/1384)
- [yammer report activityuserdetail](../cmd/yammer/report/report-activityuserdetail.md) - gets details about Yammer activity by user [#1382](https://github.com/pnp/cli-microsoft365/issues/1382)
- [yammer report deviceusagedistributionusercounts](../cmd/yammer/report/report-deviceusagedistributionusercounts.md) - gets the number of users by device type [#1386](https://github.com/pnp/cli-microsoft365/issues/1386)
- [yammer report deviceusageusercounts](../cmd/yammer/report/report-deviceusageusercounts.md) - gets the number of daily users by device type [#1387](https://github.com/pnp/cli-microsoft365/issues/1387)
- [yammer report deviceusageuserdetail](../cmd/yammer/report/report-deviceusageuserdetail.md) - gets details about Yammer device usage by user [#1287](https://github.com/pnp/cli-microsoft365/issues/1287)
- [yammer report groupsactivitydetail](../cmd/yammer/report/report-groupsactivitydetail.md) - gets details about Yammer groups activity by group [#1388](https://github.com/pnp/cli-microsoft365/issues/1388)
- [yammer report groupsactivitygroupcounts](../cmd/yammer/report/report-groupsactivitygroupcounts.md) - gets the total number of groups that existed and how many included group conversation activity [#1389](https://github.com/pnp/cli-microsoft365/issues/1389)

### Changes

- added 'Scan Microsoft 365 Groups created with User's First or Last Name' sample [#1342](https://github.com/pnp/cli-microsoft365/issues/1342)
- extended `tenant id get` with retrieving the ID of the current tenant [#1378](https://github.com/pnp/cli-microsoft365/issues/1378)
- changed communicating no need to upgrade spfx project as a non-error [#1407](https://github.com/pnp/cli-microsoft365/issues/1407)
- moved the 'consent' command to the 'cli' namespace [#1336](https://github.com/pnp/cli-microsoft365/issues/1336)
- implemented '--reconsent' as a CLI command [#1337](https://github.com/pnp/cli-microsoft365/issues/1337)
- updated docs wrapping file names in quotes [#1410](https://github.com/pnp/cli-microsoft365/issues/1410)
- replaced `|` (pipe) with `,` (comma) in the docs [#1420](https://github.com/pnp/cli-microsoft365/issues/1420)
- added conditionally suggesting upgrading Office UI Fabric scss files [#1468](https://github.com/pnp/cli-microsoft365/issues/1468)
- added the 'Ensure site assets library is created' sample script [#1447](https://github.com/pnp/cli-microsoft365/pull/1447)
- added the 'List all tenant-wide extensions' sample script [#1443](https://github.com/pnp/cli-microsoft365/pull/1443)
- fixed guidance for upgrading teams piece in `spfx project upgrade` [#1471](https://github.com/pnp/cli-microsoft365/pull/1471)
- extended `spo theme set` command with support for theme validation [#1466](https://github.com/pnp/cli-microsoft365/pull/1466)
- fixed resolution of `FN003005_CFG_localizedResource_pathLib` in `spfx project upgrade` [#1470](https://github.com/pnp/cli-microsoft365/pull/1470)
- updated Theme Generator URL on `spo theme set` & `spo theme  apply` commands [#1465](https://github.com/pnp/cli-microsoft365/pull/1465)

## [v2.8.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.8.0)

### New commands

**Microsoft Graph:**

- [graph subscription add](../cmd/graph/subscription/subscription-add.md) - creates a Microsoft Graph subscription [#1100](https://github.com/pnp/cli-microsoft365/issues/1100)

**Microsoft 365:**

- [tenant report activeuserdetail](../cmd/tenant/report/report-activeuserdetail.md) - gets details about Microsoft 365 active users [#1300](https://github.com/pnp/cli-microsoft365/issues/1300)
- [tenant report servicesusercounts](../cmd/tenant/report/report-servicesusercounts.md) - gets the count of users by activity type and service [#1299](https://github.com/pnp/cli-microsoft365/issues/1299)

**SharePoint:**

- [spo sitedesign task remove](../cmd/spo/sitedesign/sitedesign-task-remove.md) - removes the specified site design scheduled for execution [#783](https://github.com/pnp/cli-microsoft365/issues/783)

**SharePoint Framework:**

- [spfx doctor](../cmd/spfx/spfx-doctor.md) - verifies environment configuration for using the specific version of the SharePoint Framework [#1353](https://github.com/pnp/cli-microsoft365/issues/1353)

**Skype:**

- [skype report activitycounts](../cmd/skype/report/report-activitycounts.md) - gets the trends on how many users organized and participated in conference sessions held in your organization through Skype for Business. The report also includes the number of peer-to-peer sessions [#1302](https://github.com/pnp/cli-microsoft365/issues/1302)
- [skype report activityusercounts](../cmd/skype/report/report-activityusercounts.md) - gets the trends on how many unique users organized and participated in conference sessions held in your organization through Skype for Business. The report also includes the number of peer-to-peer sessions [#1303](https://github.com/pnp/cli-microsoft365/issues/1303)
- [skype report activityuserdetail](../cmd/skype/report/report-activityuserdetail.md) - gets details about Skype for Business activity by user [#1301](https://github.com/pnp/cli-microsoft365/issues/1301)

**Yammer:**

- [yammer report groupsactivitycounts](../cmd/yammer/report/report-groupsactivitycounts.md) - gets the number of Yammer messages posted, read, and liked in groups [#1390](https://github.com/pnp/cli-microsoft365/issues/1390)

### Changes

- added 'Add App Catalog to SharePoint site' sample [#1413](https://github.com/pnp/cli-microsoft365/pull/1413)
- added 'Delete all Microsoft 365 groups' sample [#1140](https://github.com/pnp/cli-microsoft365/issues/1140)
- added 'Delete custom SharePoint site scripts' sample [#1139](https://github.com/pnp/cli-microsoft365/issues/1139)
- added 'Hide SharePoint list from Site Contents' sample [#1413](https://github.com/pnp/cli-microsoft365/pull/1413)
- extended team channel name validation to allow 'tacv2'. [#1401](https://github.com/pnp/cli-microsoft365/issues/1401)

## [v2.7.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.7.0)

### New commands

**Azure Active Directory:**

- [aad approleassignment list](../cmd/aad/approleassignment/approleassignment-list.md) - lists app role assignments for the specified application registration [#1270](https://github.com/pnp/cli-microsoft365/issues/1270)
- [aad o365group report activityfilecounts](../cmd/aad/o365group/o365group-report-activityfilecounts.md) - get the total number of files and how many of them were active across all group sites associated with an Microsoft 365 Group [#1285](https://github.com/pnp/cli-microsoft365/issues/1285)

**Microsoft Graph:**

- [graph schemaextension set](../cmd/graph/schemaextension/schemaextension-set.md) - updates a Microsoft Graph schema extension [#15](https://github.com/pnp/cli-microsoft365/issues/15)

**Microsoft 365:**

- [tenant report activeusercounts](../cmd/tenant/report/report-activeusercounts.md) - gets the count of daily active users in the reporting period by product [#1298](https://github.com/pnp/cli-microsoft365/issues/1298)

**SharePoint:**

- [spo orgassetslibrary remove](../cmd/spo/orgassetslibrary/orgassetslibrary-remove.md) - removes a library that was designated as a central location for organization assets across the tenant [#1042](https://github.com/pnp/cli-microsoft365/issues/1042)
- [spo tenant recyclebinitem list](../cmd/spo/tenant/tenant-recyclebinitem-list.md) - returns all modern and classic site collections in the tenant scoped recycle bin [#1144](https://github.com/pnp/cli-microsoft365/issues/1144)

**Microsoft Teams:**

- [teams tab add](../cmd/teams/tab/tab-add.md) - add a tab to the specified channel [#850](https://github.com/pnp/cli-microsoft365/issues/850)

**Yammer:**

- [yammer message add](../cmd/yammer/message/message-add.md) - posts a Yammer network message on behalf of the current user [#1101](https://github.com/pnp/cli-microsoft365/issues/1101)

### Changes

- added PowerShell command completion [#261](https://github.com/pnp/cli-microsoft365/issues/261)
- added 'since' option to 'teams message list' command [#1125](https://github.com/pnp/cli-microsoft365/issues/1125)
- extended 'spo file add' with chunked uploads [#1052](https://github.com/pnp/cli-microsoft365/issues/1052)
- added support for prettifying json output [#1324](https://github.com/pnp/cli-microsoft365/issues/1324)
- fixed bug in retrieving modern pages from root site [#1328](https://github.com/pnp/cli-microsoft365/issues/1328)
- extended 'spo site list' command with support for returning deleted sites [#1335](https://github.com/pnp/cli-microsoft365/issues/1335)
- exposed completion commands as CLI commands [#1329](https://github.com/pnp/cli-microsoft365/issues/1329)
- fixed bug in retrieving files with special characters [#1358](https://github.com/pnp/cli-microsoft365/issues/1358)
- added alias to 'accesstoken get' [#1369](https://github.com/pnp/cli-microsoft365/issues/1369)

## [v2.6.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.6.0)

### New commands

**Microsoft Graph:**

- [graph schemaextension remove](../cmd/graph/schemaextension/schemaextension-remove.md) - removes specified Microsoft Graph schema extension [#16](https://github.com/pnp/cli-microsoft365/issues/16)

**Power Apps:**

- [pa connector export](../cmd/pa/connector/connector-export.md) - exports the specified power automate or power apps custom connector [#1084](https://github.com/pnp/cli-microsoft365/issues/1084)

**SharePoint:**

- [spo report activityfilecounts](../cmd/spo/report/report-activityfilecounts.md) - gets the number of unique, licensed users who interacted with files stored on SharePoint sites [#1243](https://github.com/pnp/cli-microsoft365/issues/1243)
- [spo report activitypages](../cmd/spo/report/report-activitypages.md) - gets the number of unique pages visited by users [#1245](https://github.com/pnp/cli-microsoft365/issues/1245)
- [spo report activityuserdetail](../cmd/spo/report/report-activityuserdetail.md) - gets details about SharePoint activity by user [#1242](https://github.com/pnp/cli-microsoft365/issues/1242)
- [spo report activityusercounts](../cmd/spo/report/report-activityusercounts.md) - gets the trend in the number of active users [#1244](https://github.com/pnp/cli-microsoft365/issues/1244)
- [spo report siteusagedetail](../cmd/spo/report/report-siteusagedetail.md) - gets details about SharePoint site usage [#1246](https://github.com/pnp/cli-microsoft365/issues/1246)

**Yammer:**

- [yammer group list](../cmd/yammer/group/group-list.md) - returns the list of groups in a Yammer network or the groups for a specific user [#1185](https://github.com/pnp/cli-microsoft365/issues/1185)

### Changes

- added support for file edit suggestions [#1190](https://github.com/pnp/cli-microsoft365/issues/1190)
- added support for JMESPath [#1315](https://github.com/pnp/cli-microsoft365/issues/1315)
- made non-immersive mode completion standalone [#1316](https://github.com/pnp/cli-microsoft365/issues/1316)
- added GitHub Actions documentation [#1094](https://github.com/pnp/cli-microsoft365/issues/1094)
- added the 'Delete all non group connected SharePoint sites' example [#1141](https://github.com/pnp/cli-microsoft365/issues/1141)

## [v2.5.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.5.0)

### New commands

**OneDrive:**

- [onedrive report activityuserdetail](../cmd/onedrive/report/report-activityuserdetail.md) - gets details about OneDrive activity by user [#1255](https://github.com/pnp/cli-microsoft365/issues/1255)
- [onedrive report usageaccountdetail](../cmd/onedrive/report/report-usageaccountdetail.md) - gets details about OneDrive usage by account [#1251](https://github.com/pnp/cli-microsoft365/issues/1251)

**SharePoint:**

- [spo report siteusagefilecounts](../cmd/spo/report/report-siteusagefilecounts.md) - get the total number of files across all sites and the number of active files [#1247](https://github.com/pnp/cli-microsoft365/issues/1247)
- [spo report siteusagepages](../cmd/spo/report/report-siteusagepages.md) - gets the number of pages viewed across all sites [#1250](https://github.com/pnp/cli-microsoft365/issues/1250)
- [spo report siteusagesitecounts](../cmd/spo/report/report-siteusagesitecounts.md) - gets the total number of files across all sites and the number of active files [#1248](https://github.com/pnp/cli-microsoft365/issues/1248)
- [spo report siteusagestorage](../cmd/spo/report/report-siteusagestorage.md) - gets the trend of storage allocated and consumed during the reporting period [#1249](https://github.com/pnp/cli-microsoft365/issues/1249)

### Changes

- fixed error using command spo listitem add when text field value only contains numbers [#1297](https://github.com/pnp/cli-microsoft365/issues/1297)
- added support for upgrading projects built using SharePoint Framework v1.9.1 [#1310](https://github.com/pnp/cli-microsoft365/pull/1310)

## [v2.4.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.4.0)

### New commands

**OneDrive:**

- [onedrive report activityfilecounts](../cmd/onedrive/report/report-activityfilecounts.md) - gets the number of unique, licensed users that performed file interactions against any OneDrive account [#1257](https://github.com/pnp/cli-microsoft365/issues/1257)
- [onedrive report activityusercounts](../cmd/onedrive/report/report-activityusercounts.md) - gets the trend in the number of active OneDrive users [#1256](https://github.com/pnp/cli-microsoft365/issues/1256)
- [onedrive report usageaccountcounts](../cmd/onedrive/report/report-usageaccountcounts.md) - gets the trend in the number of active OneDrive for Business sites [#1252](https://github.com/pnp/cli-microsoft365/issues/1252)
- [onedrive report usagefilecounts](../cmd/onedrive/report/report-usagefilecounts.md) - gets the total number of files across all sites and how many are active files [#1253](https://github.com/pnp/cli-microsoft365/issues/1253)
- [onedrive report usagestorage](../cmd/onedrive/report/report-usagestorage.md) - gets the trend on the amount of storage you are using in OneDrive for Business [#1254](https://github.com/pnp/cli-microsoft365/issues/1254)

**Outlook:**

- [outlook report mailappusageversionsusercounts](../cmd/outlook/report/report-mailappusageversionsusercounts.md) - gets the count of unique users by Outlook desktop version [#1215](https://github.com/pnp/cli-microsoft365/issues/1215)
- [outlook report mailboxusagemailboxcount](../cmd/outlook/report/report-mailboxusagemailboxcount.md) - gets the total number of user mailboxes in your organization and how many are active each day of the reporting period [#1217](https://github.com/pnp/cli-microsoft365/issues/1217)
- [outlook report mailboxusagequotastatusmailboxcounts](../cmd/outlook/report/report-mailboxusagequotastatusmailboxcounts.md) - gets the count of user mailboxes in each quota category [#1218](https://github.com/pnp/cli-microsoft365/issues/1218)
- [outlook report mailboxusagestorage](../cmd/outlook/report/report-mailboxusagestorage.md) - gets the amount of mailbox storage used in your organization [#1219](https://github.com/pnp/cli-microsoft365/issues/1219)
- [outlook report mailappusageusercounts](../cmd/outlook/report/report-mailappusageusercounts.md) - gets the count of unique users that connected to Exchange Online using any email app [#1214](https://github.com/pnp/cli-microsoft365/issues/1214)
- [outlook report mailactivityusercounts](../cmd/outlook/report/report-mailactivityusercounts.md) - enables you to understand trends on the number of unique users who are performing email activities like send, read, and receive [#1211](https://github.com/pnp/cli-microsoft365/issues/1211)
- [outlook report mailactivitycounts](../cmd/outlook/report/report-mailactivitycounts.md) - enables you to understand the trends of email activity (like how many were sent, read, and received) in your organization [#1210](https://github.com/pnp/cli-microsoft365/issues/1210)
- [outlook report mailboxusagedetail](../cmd/outlook/report/report-mailboxusagedetail.md) - gets details about mailbox usage [#1216](https://github.com/pnp/cli-microsoft365/issues/1216) 
- [outlook report mailappusageuserdetail](../cmd/outlook/report/report-mailappusageuserdetail.md) - gets details about which activities users performed on the various email apps [#1212](https://github.com/pnp/cli-microsoft365/issues/1212)
- [outlook report mailactivityuserdetail](../cmd/outlook/report/report-mailactivityuserdetail.md) - gets details about email activity users have performed [#1209](https://github.com/pnp/cli-microsoft365/issues/1209)
- [outlook report mailappusageappsusercounts](../cmd/outlook/report/report-mailappusageappsusercounts.md) - gets the count of unique users per email app [#1213](https://github.com/pnp/cli-microsoft365/issues/1213)

**SharePoint:**

- [spo feature disable](../cmd/spo/feature/feature-disable.md) - disables feature for the specified site or web [#676](https://github.com/pnp/cli-microsoft365/issues/676)
- [spo site rename](../cmd/spo/site/site-rename.md) - renames the URL and title of a site collection [#1197](https://github.com/pnp/cli-microsoft365/issues/1197)

**Yammer:**

- [yammer message remove](../cmd/yammer/message/message-remove.md) - removes a Yammer message [#1106](https://github.com/pnp/cli-microsoft365/issues/1106)

**Power Apps:**

- [pa connector list](../cmd/pa/connector/connector-list.md) - lists Power Apps and Power Automate (Flow) connectors [#1237](https://github.com/pnp/cli-microsoft365/issues/1237)

### Changes

- added support for setting CSOM properties on web [#1202](https://github.com/pnp/cli-microsoft365/issues/1202)
- Rush stack compiler made optional for 1.9.1 upgrade [#1222](https://github.com/pnp/cli-microsoft365/issues/1222)

## [v2.3.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.3.0)

### New commands

**SharePoint Framework:**

- [spfx project externalize](../cmd/spfx/project/project-externalize.md) - externalizes SharePoint Framework project dependencies [#571](https://github.com/pnp/cli-microsoft365/issues/571)

**Yammer:**

- [yammer message get](../cmd/yammer/message/message-get.md) - returns a Yammer message [#1105](https://github.com/pnp/cli-microsoft365/issues/1105)
- [yammer message list](../cmd/yammer/message/message-list.md) - returns all accessible messages from the user's Yammer network [#1104](https://github.com/pnp/cli-microsoft365/issues/1104)
- [yammer user list](../cmd/yammer/user/user-list.md) - returns users from the current network [#1113](https://github.com/pnp/cli-microsoft365/issues/1113)

### Changes

- added the 'Authenticate with and call the Microsoft Graph' example [#1186](https://github.com/pnp/cli-microsoft365/issues/1186)
- fixed the 'spo hubsite list' command [#1180](https://github.com/pnp/cli-microsoft365/issues/1180)
- fixed the 'spo file add' command [#1179](https://github.com/pnp/cli-microsoft365/issues/1179)
- added case-sensitive option parsing [#1182](https://github.com/pnp/cli-microsoft365/issues/1182)
- added 'Lists active SharePoint site collection application catalogs' sample [#1194](https://github.com/pnp/cli-microsoft365/issues/1194)
- extended the 'yammer message list' command [#1184](https://github.com/pnp/cli-microsoft365/issues/1184)
- excluded unsupported modules in 'spfx project externalize' [#1191](https://github.com/pnp/cli-microsoft365/issues/1191)

## [v2.2.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.2.0)

### New commands

**Azure Active Directory:**

- [aad o365group report activitydetail](../cmd/aad/o365group/o365group-report-activitydetail.md) - get details about Microsoft 365 Groups activity by group [#1130](https://github.com/pnp/cli-microsoft365/issues/1130)
- [aad o365group report activitycounts](../cmd/aad/o365group/o365group-report-activitycounts.md) - get the number of group activities across group workloads [#1159](https://github.com/pnp/cli-microsoft365/issues/1159)
- [aad o365group report activitygroupcounts](../cmd/aad/o365group/o365group-report-activitygroupcounts.md) - get the daily total number of groups and how many of them were active based on email conversations, Yammer posts, and SharePoint file activities [#1160](https://github.com/pnp/cli-microsoft365/issues/1160)

**Flow:**

- [flow remove](../cmd/flow/flow-remove.md) - removes the specified Microsoft Flow [#1063](https://github.com/pnp/cli-microsoft365/issues/1063)

**PowerApps:**

- [pa solution reference add](../cmd/pa/solution/solution-reference-add.md) - adds a project reference to the solution in the current directory [#954](https://github.com/pnp/cli-microsoft365/issues/954)

**SharePoint Online:**

- [spo apppage set](../cmd/spo/apppage/apppage-set.md) - updates the single-part app page [#875](https://github.com/pnp/cli-microsoft365/issues/875)
- [spo feature enable](../cmd/spo/feature/feature-enable.md) - enables feature for the specified site or web [#675](https://github.com/pnp/cli-microsoft365/issues/675)

**Microsoft Teams:**

- [teams message reply list](../cmd/teams/message/message-reply-list.md) - retrieves replies to a message from a channel in a Microsoft Teams team [#1109](https://github.com/pnp/cli-microsoft365/issues/1109)

**Yammer:**

- [yammer network list](../cmd/yammer/network/network-list.md) - returns a list of networks to which the current user has access [#1115](https://github.com/pnp/cli-microsoft365/issues/1115)
- [yammer user get](../cmd/yammer/user/user-get.md) - retrieves the current user or searches for a user by ID or e-mail [#1107](https://github.com/pnp/cli-microsoft365/issues/1107)

### Changes

- updated pa commands to reflect official pac cli v1.0.6 [#1129](https://github.com/pnp/cli-microsoft365/pull/1129)
- added the 'Govern orphaned Microsoft Teams' example [#1147](https://github.com/pnp/cli-microsoft365/issues/1147)
- added the 'remove custom themes' example [#1137](https://github.com/pnp/cli-microsoft365/issues/1137)
- corrected 'aad o365group user list' alias [#1149](https://github.com/pnp/cli-microsoft365/issues/1149)
- updated 'spo storageentity set' docs about handling trailing slash [#1153](https://github.com/pnp/cli-microsoft365/issues/1153)
- updated vorpal to 1.11.7 [#1150](https://github.com/pnp/cli-microsoft365/issues/1150)
- added versions to deps for building docs in CI [#1157](https://github.com/pnp/cli-microsoft365/issues/1157)
- added the 'consent' command [#1162](https://github.com/pnp/cli-microsoft365/issues/1162)
- added the 'Delete custom SharePoint site designs' example [#1138](https://github.com/pnp/cli-microsoft365/issues/1138)

## [v2.1.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.1.0)

### New commands

**SharePoint Online:**

- [spo contenttypehub get](../cmd/spo/contenttypehub/contenttypehub-get.md) - returns the URL of the SharePoint Content Type Hub of the Tenant [#905](https://github.com/pnp/cli-microsoft365/issues/905)

**Microsoft Teams:**

- [teams channel remove](../cmd/teams/channel/channel-remove.md) - removes the specified channel in the Microsoft Teams team [#814](https://github.com/pnp/cli-microsoft365/issues/814)

**PowerApps:**

- [pa pcf init](../cmd/pa/pcf/pcf-init.md) - Creates new PowerApps component framework project [#952](https://github.com/pnp/cli-microsoft365/issues/952)
- [pa solution init](../cmd/pa/solution/solution-init.md) - initializes a directory with a new CDS solution project [#953](https://github.com/pnp/cli-microsoft365/issues/953)

**Global:**

- [util accesstoken get](../cmd/util/accesstoken/accesstoken-get.md) - gets access token for the specified resource [#1072](https://github.com/pnp/cli-microsoft365/issues/1072)

### Changes

- updated vorpal to 1.11.6 [#1092](https://github.com/pnp/cli-microsoft365/issues/1092)
- removed spo-specific action implementation [#1092](https://github.com/pnp/cli-microsoft365/issues/1092)
- implemented passing AAD error during device code auth [#1095](https://github.com/pnp/cli-microsoft365/issues/1095)
- added handling forbidden errors [#1096](https://github.com/pnp/cli-microsoft365/issues/1096)
- fixed handling Flow nextLink [#1114](https://github.com/pnp/cli-microsoft365/issues/1114)
- added support for multi-shell [#887](https://github.com/pnp/cli-microsoft365/issues/887)
- renamed the outlook sendmail command [#1103](https://github.com/pnp/cli-microsoft365/issues/1103)
- extended teams report commands with support for specifying output file [#1075](https://github.com/pnp/cli-microsoft365/issues/1075)
- added support for adding web parts to empty pages [#740](https://github.com/pnp/cli-microsoft365/issues/740)

## [v2.0.0](https://github.com/pnp/cli-microsoft365/releases/tag/v2.0.0)

### New commands

**SharePoint Online:**

- [spo apppage add](../cmd/spo/apppage/apppage-add.md) - creates a single-part app page [#874](https://github.com/pnp/cli-microsoft365/issues/874)
- [spo homesite remove](../cmd/spo/homesite/homesite-remove.md) - removes the current Home Site [#1002](https://github.com/pnp/cli-microsoft365/issues/1002)
- [spo orgassetslibrary list](../cmd/spo/orgassetslibrary/orgassetslibrary-list.md) - lists all libraries that are assigned as org asset library [#1041](https://github.com/pnp/cli-microsoft365/issues/1041)
- [spo get](../cmd/spo/spo-get.md) - gets the context URL for the root SharePoint site collection and SharePoint tenant admin site [#1071](https://github.com/pnp/cli-microsoft365/issues/1071)
- [spo set](../cmd/spo/spo-set.md) - sets the URL of the root SharePoint site collection for use in SPO commands [#1070](https://github.com/pnp/cli-microsoft365/issues/1070)

**Microsoft Teams:**

- [teams report deviceusagedistributionusercounts](../cmd/teams/report/report-deviceusagedistributionusercounts) - gets the number of Microsoft Teams unique users by device type [#1012](https://github.com/pnp/cli-microsoft365/issues/1012)
- [teams report deviceusageusercounts](../cmd/teams/report/report-deviceusageusercounts.md) - gets the number of Microsoft Teams daily unique users by device type [#1011](https://github.com/pnp/cli-microsoft365/issues/1011)
- [teams report useractivityusercounts](../cmd/teams/report/report-useractivityusercounts.md) - gets the number of Microsoft Teams users by activity type [#1027](https://github.com/pnp/cli-microsoft365/issues/1027)
- [teams report useractivitycounts](../cmd/teams/report/report-useractivitycounts.md) - gets the number of Microsoft Teams activities by activity type [#1028](https://github.com/pnp/cli-microsoft365/issues/1028)
- [teams report useractivityuserdetail](../cmd/teams/report/report-useractivityuserdetail.md) - gets details about Microsoft Teams user activity by user [#1029](https://github.com/pnp/cli-microsoft365/issues/1029)

**Microsoft Flow:**

- [flow disable](../cmd/flow/flow-disable.md) - disables Microsoft Flow [#1055](https://github.com/pnp/cli-microsoft365/issues/1055)
- [flow enable](../cmd/flow/flow-enable.md) - enables Microsoft Flow [#1054](https://github.com/pnp/cli-microsoft365/issues/1054)

**Microsoft 365 groups:**

- [aad o365group teamify](../cmd/aad/o365group/o365group-teamify.md) - creates a new Microsoft Teams team under existing Microsoft 365 group [#872](https://github.com/pnp/cli-microsoft365/issues/872)

**Microsoft Graph:**

- [graph schemaextension get](../cmd/graph/schemaextension/schemaextension-get.md) - gets the properties of the specified schema extension definition [#14](https://github.com/pnp/cli-microsoft365/issues/14)

### Changes

- simplified login [#889](https://github.com/pnp/cli-microsoft365/issues/889)
- API name removed from the command name [#890](https://github.com/pnp/cli-microsoft365/issues/890)
- extended 'spo web set' with searchScope option [#947](https://github.com/pnp/cli-microsoft365/issues/947)
- fixed 'Access token is empty' error for 'teams report deviceusageuserdetail' [#1025](https://github.com/pnp/cli-microsoft365/issues/1025)
- updated documentation on connecting the CLI when protected cert [#1023](https://github.com/pnp/cli-microsoft365/issues/1023)
- extended 'spfx project upgrade' with outputFile option [#984](https://github.com/pnp/cli-microsoft365/issues/984)
- login extended with support for authentication using Personal Information Exchange (.pfx) file [#1030](https://github.com/pnp/cli-microsoft365/issues/1030)

## [v1.23.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.23.0)

- added support for upgrading projects built using SharePoint Framework v1.8.2 [#1044](https://github.com/pnp/cli-microsoft365/issues/1044)

## [v1.22.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.22.0)

### New commands

**SharePoint Online:**

- [spo homesite get](../cmd/spo/homesite/homesite-get.md) - gets information about the Home Site [#1000](https://github.com/pnp/cli-microsoft365/issues/1000)
- [spo homesite set](../cmd/spo/homesite/homesite-set.md) - sets the specified site as the Home Site [#1001](https://github.com/pnp/cli-microsoft365/issues/1001)
- [spo listitem isrecord](../cmd/spo/listitem/listitem-isrecord.md) - checks if the specified list item is a record [#771](https://github.com/pnp/cli-microsoft365/issues/771)

**Microsoft Graph:**

- [graph o365group user set](../cmd/aad/o365group/o365group-user-set.md) - updates role of the specified user in the specified Microsoft 365 Group or Microsoft Teams team [#982](https://github.com/pnp/cli-microsoft365/issues/982)
- [graph planner task list](../cmd/planner/task/task-list.md) - lists Planner tasks for the currently logged in user [#990](https://github.com/pnp/cli-microsoft365/issues/990)
- [graph report teamsdeviceusageuserdetail](../cmd/teams/report/report-deviceusageuserdetail.md) - gets information about Microsoft Teams device usage by user [#960](https://github.com/pnp/cli-microsoft365/issues/960)
- [graph teams funsettings set](../cmd/teams/funsettings/funsettings-set.md) - updates fun settings of a Microsoft Teams team [#817](https://github.com/pnp/cli-microsoft365/issues/817)

**Microsoft 365:**

- [tenant id get](../cmd/tenant/id/id-get.md) - gets Microsoft 365 tenant ID for the specified domain [#998](https://github.com/pnp/cli-microsoft365/issues/998)

### Changes

- extended 'spo site add' with support for specifying owners [#823](https://github.com/pnp/cli-microsoft365/issues/823)
- extended 'graph o365group list' with support for orphaned groups [#959](https://github.com/pnp/cli-microsoft365/issues/959)
- added support for superseding SPFx project upgrade findings [#970](https://github.com/pnp/cli-microsoft365/issues/970)
- added support for package managers [#617](https://github.com/pnp/cli-microsoft365/issues/617)
- extended 'spo page set' with support for promoting as template [#978](https://github.com/pnp/cli-microsoft365/issues/978)
- extended 'spo page add' with support for promoting as template [#977](https://github.com/pnp/cli-microsoft365/issues/977)

## [v1.21.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.21.0)

### New commands

**SharePoint Online:**

- [spo orgnewssite list](../cmd/spo/orgnewssite/orgnewssite-list.md) - lists all organizational news sites [#975](https://github.com/pnp/cli-microsoft365/issues/975)
- [spo orgnewssite remove](../cmd/spo/orgnewssite/orgnewssite-remove.md) - removes a site from the list of organizational news sites [#976](https://github.com/pnp/cli-microsoft365/issues/976)
- [spo orgnewssite set](../cmd/spo/orgnewssite/orgnewssite-set.md) - marks site as an organizational news site [#974](https://github.com/pnp/cli-microsoft365/issues/974)

**Microsoft Graph:**

- [graph teams set](../cmd/teams/team/team-set.md) - updates settings of a Microsoft Teams team [#815](https://github.com/pnp/cli-microsoft365/issues/815)

## [v1.20.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.20.0)

### New commands

**SharePoint Online:**

- [spo contenttype remove](../cmd/spo/contenttype/contenttype-remove.md) - deletes site content type [#904](https://github.com/pnp/cli-microsoft365/issues/904)

**Microsoft Graph:**

- [graph o365group user list](../cmd/aad/o365group/o365group-user-list.md) - lists users for the specified Microsoft 365 group or Microsoft Teams team [#802](https://github.com/pnp/cli-microsoft365/issues/802)
- [graph teams clone](../cmd/teams/team/team-clone.md) - creates a clone of a Microsoft Teams team [#924](https://github.com/pnp/cli-microsoft365/issues/924)

### Changes

- extended 'spo theme apply' with support for applying standard themes [#920](https://github.com/pnp/cli-microsoft365/issues/920)
- improved detecting SPFx React projects solving [#968](https://github.com/pnp/cli-microsoft365/issues/968)

## [v1.19.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.19.0)

### Changes

- added support for upgrading projects built using SharePoint Framework v1.8.1 [#934](https://github.com/pnp/cli-microsoft365/issues/934)

## [v1.18.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.18.0)

### New commands

**SharePoint Online:**

- [spo site commsite enable](../cmd/spo/site/site-commsite-enable.md) - enables communication site features on the specified site [#937](https://github.com/pnp/cli-microsoft365/issues/937)

**Microsoft Graph:**

- [graph o365group renew](../cmd/aad/o365group/o365group-renew.md) - renews Microsoft 365 group's expiration [#870](https://github.com/pnp/cli-microsoft365/issues/870)
- [graph o365group user remove](../cmd/aad/o365group/o365group-user-remove.md) - removes the specified user from specified Microsoft 365 Group or Microsoft Teams team [#846](https://github.com/pnp/cli-microsoft365/issues/846)

### Changes

- centralized executing HTTP requests solving [#888](https://github.com/pnp/cli-microsoft365/issues/888)
- fixed bug in loading commands [#942](https://github.com/pnp/cli-microsoft365/issues/942)
- fixed saving files in 'spo file get' [#931](https://github.com/pnp/cli-microsoft365/issues/931)
- extended 'spo web set' to control footer visibility [#946](https://github.com/pnp/cli-microsoft365/issues/946)

## [v1.17.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.17.0)

### New commands

**SharePoint Online:**

- [spo contenttype field remove](../cmd/spo/contenttype/contenttype-field-remove.md) - removes a column from a site- or list content type [#673](https://github.com/pnp/cli-microsoft365/issues/673)
- [spo mail send](../cmd/spo/mail/mail-send.md) - sends an e-mail from SharePoint [#753](https://github.com/pnp/cli-microsoft365/issues/753)

**Microsoft Graph:**

- [graph teams archive](../cmd/teams/team/team-archive.md) - archives specified Microsoft Teams team [#899](https://github.com/pnp/cli-microsoft365/issues/899)
- [graph teams channel get](../cmd/teams/channel/channel-get.md) - gets information about the specific Microsoft Teams team channel [#808](https://github.com/pnp/cli-microsoft365/issues/808)
- [graph teams messagingsettings set](../cmd/teams/messagingsettings/messagingsettings-set.md) - updates messaging settings of a Microsoft Teams team [#820](https://github.com/pnp/cli-microsoft365/issues/820)
- [graph teams remove](../cmd/teams/team/team-remove.md) - removes the specified Microsoft Teams team [#813](https://github.com/pnp/cli-microsoft365/issues/813)
- [graph teams unarchive](../cmd/teams/team/team-unarchive.md) - restores an archived Microsoft Teams team [#900](https://github.com/pnp/cli-microsoft365/issues/900)

### Changes

- updated documentation on using custom AAD app [#895](https://github.com/pnp/cli-microsoft365/issues/895)
- added validation for Teams channel IDs [#909](https://github.com/pnp/cli-microsoft365/issues/909)
- fixed the 'spo page clientsidewebpart add' command [#913](https://github.com/pnp/cli-microsoft365/issues/913)
- fixed typo in the 'spo tenant settings set' command options [#923](https://github.com/pnp/cli-microsoft365/issues/923)
- updated commands to use MS Graph v1.0 endpoint [#865](https://github.com/pnp/cli-microsoft365/issues/865)
- added support for upgrading projects built using SharePoint Framework v1.8.0 [#932](https://github.com/pnp/cli-microsoft365/issues/932)

## [v1.16.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.16.0)

### New commands

**SharePoint Online:**

- [spo listitem record declare](../cmd/spo/listitem/listitem-record-declare.md) - declares the specified list item as a record [#769](https://github.com/pnp/cli-microsoft365/issues/769)

**Microsoft Graph:**

- [graph o365group user add](../cmd/aad/o365group/o365group-user-add.md) - adds user to specified Microsoft 365 Group or Microsoft Teams team [#847](https://github.com/pnp/cli-microsoft365/issues/847)
- [graph schemaextension add](../cmd/graph/schemaextension/schemaextension-add.md) - creates a Microsoft Graph schema extension [#13](https://github.com/pnp/cli-microsoft365/issues/13)
- [graph teams add](../cmd/teams/team/team-add.md) - adds a new Microsoft Teams team [#615](https://github.com/pnp/cli-microsoft365/issues/615)
- [graph teams app uninstall](../cmd/teams/app/app-uninstall.md) - uninstalls an app from a Microsoft Team team [#843](https://github.com/pnp/cli-microsoft365/issues/843)
- [graph teams channel set](../cmd/teams/channel/channel-set.md) - updates properties of the specified channel in the given Microsoft Teams team [#816](https://github.com/pnp/cli-microsoft365/issues/816)
- [graph teams guestsettings set](../cmd/teams/guestsettings/guestsettings-set.md) - updates guest settings of a Microsoft Teams team [#818](https://github.com/pnp/cli-microsoft365/issues/818)
- [graph teams tab list](../cmd/teams/tab/tab-list.md) - lists tabs in the specified Microsoft Teams channel [#849](https://github.com/pnp/cli-microsoft365/issues/849)

### Changes

- extended 'graph teams app list' [#859](https://github.com/pnp/cli-microsoft365/issues/859)
- added 'spo site groupify' alias [#873](https://github.com/pnp/cli-microsoft365/issues/873)
- fixed the 'spo page section add' command [#908](https://github.com/pnp/cli-microsoft365/issues/908)
- fixed the 'spo page header set' command [#911](https://github.com/pnp/cli-microsoft365/issues/911)

## [v1.15.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.15.0)

### New commands

**SharePoint Online:**

- [spo field remove](../cmd/spo/field/field-remove.md) - removes the specified list- or site column [#738](https://github.com/pnp/cli-microsoft365/issues/738)
- [spo listitem record undeclare](../cmd/spo/listitem/listitem-record-undeclare.md) - undeclares list item as a record [#770](https://github.com/pnp/cli-microsoft365/issues/770)
- [spo web reindex](../cmd/spo/web/web-reindex.md) - requests reindexing the specified subsite [#822](https://github.com/pnp/cli-microsoft365/issues/822)

**Microsoft Graph:**

- [graph teams app install](../cmd/teams/app/app-install.md) - installs an app from the catalog to a Microsoft Teams team [#842](https://github.com/pnp/cli-microsoft365/issues/842)
- [graph teams funsettings list](../cmd/teams/funsettings/funsettings-list.md) - lists fun settings for the specified Microsoft Teams team [#809](https://github.com/pnp/cli-microsoft365/issues/809)
- [graph teams guestsettings list](../cmd/teams/guestsettings/guestsettings-list.md) - lists guests settings for a Microsoft Teams team [#810](https://github.com/pnp/cli-microsoft365/issues/810)
- [graph teams membersettings list](../cmd/teams/membersettings/membersettings-list.md) - lists member settings for a Microsoft Teams team [#811](https://github.com/pnp/cli-microsoft365/issues/811)
- [graph teams membersettings set](../cmd/teams/membersettings/membersettings-set.md) - updates member settings of a Microsoft Teams team [#819](https://github.com/pnp/cli-microsoft365/issues/819)
- [graph teams messagingsettings list](../cmd/teams/messagingsettings/messagingsettings-list.md) - lists messaging settings for a Microsoft Teams team [#812](https://github.com/pnp/cli-microsoft365/issues/812)

### Changes

- fixed ID of the FN002009 SPFx project upgrade rule [#854](https://github.com/pnp/cli-microsoft365/issues/854)
- fixed issue with updating the header of non-en-US pages [#851](https://github.com/pnp/cli-microsoft365/issues/851)
- added support for upgrading projects built using SharePoint Framework v1.7.1 [#848](https://github.com/pnp/cli-microsoft365/issues/848)

## [v1.14.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.14.0)

### New commands

**SharePoint Online:**

- [spo list label get](../cmd/spo/list/list-label-get.md) - gets label set on the specified list [#773](https://github.com/pnp/cli-microsoft365/issues/773)
- [spo list label set](../cmd/spo/list/list-label-set.md) - sets classification label on the specified list [#772](https://github.com/pnp/cli-microsoft365/issues/772)
- [spo list view field add](../cmd/spo/list/list-view-field-add.md) - adds the specified field to list view [#735](https://github.com/pnp/cli-microsoft365/issues/735)
- [spo list view field remove](../cmd/spo/list/list-view-field-remove.md) - removes the specified field from list view [#736](https://github.com/pnp/cli-microsoft365/issues/736)
- [spo site inplacerecordsmanagement set](../cmd/spo/site/site-inplacerecordsmanagement-set.md) - activates or deactivates in-place records management for a site collection [#774](https://github.com/pnp/cli-microsoft365/issues/774)
- [spo sitedesign run list](../cmd/spo/sitedesign/sitedesign-run-list.md) - lists information about site designs applied to the specified site [#779](https://github.com/pnp/cli-microsoft365/issues/779)
- [spo sitedesign run status get](../cmd/spo/sitedesign/sitedesign-run-status-get.md) - gets information about the site scripts executed for the specified site design [#780](https://github.com/pnp/cli-microsoft365/issues/780)
- [spo sitedesign task get](../cmd/spo/sitedesign/sitedesign-task-get.md) - gets information about the specified site design scheduled for execution [#782](https://github.com/pnp/cli-microsoft365/issues/782)
- [spo sitedesign task list](../cmd/spo/sitedesign/sitedesign-task-list.md) - lists site designs scheduled for execution on the specified site [#781](https://github.com/pnp/cli-microsoft365/issues/781)

**Microsoft Graph:**

- [graph teams app list](../cmd/teams/app/app-list.md) - lists apps from the Microsoft Teams app catalog [#826](https://github.com/pnp/cli-microsoft365/issues/826)
- [graph teams app publish](../cmd/teams/app/app-publish.md) - publishes Teams app to the organization's app catalog [#824](https://github.com/pnp/cli-microsoft365/issues/824)
- [graph teams app remove](../cmd/teams/app/app-remove.md) - removes a Teams app from the organization's app catalog [#825](https://github.com/pnp/cli-microsoft365/issues/825)
- [graph teams app update](../cmd/teams/app/app-update.md) - updates Teams app in the organization's app catalog [#827](https://github.com/pnp/cli-microsoft365/issues/827)
- [graph teams channel list](../cmd/teams/channel/channel-list.md) - lists channels in the specified Microsoft Teams team [#586](https://github.com/pnp/cli-microsoft365/issues/586)
- [graph teams user remove](../cmd/aad/o365group/o365group-user-remove.md) - removes the specified user from the specified Microsoft Teams team [#757](https://github.com/pnp/cli-microsoft365/issues/757)
- [graph teams user set](../cmd/aad/o365group/o365group-user-set.md) - updates role of the specified user in the given Microsoft Teams team [#760](https://github.com/pnp/cli-microsoft365/issues/760)

### Changes

- updated 'spo list webhook list' parameters [#747](https://github.com/pnp/cli-microsoft365/issues/747)
- updated 'azmgmt flow list' to support paged content [#776](https://github.com/pnp/cli-microsoft365/issues/776)
- added fieldTitle, listId and listUrl options to 'spo file get' [#754](https://github.com/pnp/cli-microsoft365/issues/754)
- extended 'spo sitedesign apply' with large site designs [#714](https://github.com/pnp/cli-microsoft365/issues/714)
- added support for dynamic data [#751](https://github.com/pnp/cli-microsoft365/issues/751)
- extended 'spo web set' with modern UI options [#798](https://github.com/pnp/cli-microsoft365/issues/798)

## [v1.13.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.13.0)

### New commands

**SharePoint Online:**

- [spo feature list](../cmd/spo/feature/feature-list.md) - lists Features activated in the specified site or site collection [#677](https://github.com/pnp/cli-microsoft365/issues/677)
- [spo file move](../cmd/spo/file/file-move.md) - moves a file to another location [#671](https://github.com/pnp/cli-microsoft365/issues/671)
- [spo list view list](../cmd/spo/list/list-view-list.md) - lists views configured on the specified list [#732](https://github.com/pnp/cli-microsoft365/issues/732)
- [spo list sitescript get](../cmd/spo/list/list-sitescript-get.md) - extracts a site script from a SharePoint list [#713](https://github.com/pnp/cli-microsoft365/issues/713)
- [spo list view get](../cmd/spo/list/list-view-get.md) - gets information about specific list view [#730](https://github.com/pnp/cli-microsoft365/issues/730)
- [spo list view remove](../cmd/spo/list/list-view-remove.md) - deletes the specified view from the list [#731](https://github.com/pnp/cli-microsoft365/issues/731)

**Microsoft Graph:**

- [graph teams message list](../cmd/teams/message/message-list.md) - lists all messages from a channel in a Microsoft Teams team [#588](https://github.com/pnp/cli-microsoft365/issues/588)
- [graph teams user add](../cmd/aad/o365group/o365group-user-add.md) - adds user to the specified Microsoft Teams team [#690](https://github.com/pnp/cli-microsoft365/issues/690)
- [graph teams user list](../cmd/aad/o365group/o365group-user-list.md) - lists users for the specified Microsoft Teams team [#689](https://github.com/pnp/cli-microsoft365/issues/689)

### Changes

- added support for specifying language when creating site [#728](https://github.com/pnp/cli-microsoft365/issues/728)
- fixed bug in setting client-side web part order [#712](https://github.com/pnp/cli-microsoft365/issues/712)
- added support for authentication using certificate [#389](https://github.com/pnp/cli-microsoft365/issues/389)
- renamed 'graph teams channel message get' to 'graph teams message get'
- extended 'spo folder copy' with support for schema mismatch [#706](https://github.com/pnp/cli-microsoft365/pull/706)
- extended 'spo file copy' with support for schema mismatch [#705](https://github.com/pnp/cli-microsoft365/pull/705)
- updated showing scope in 'spo customaction list' [#742](https://github.com/pnp/cli-microsoft365/issues/742)
- extended 'spo hubsite list' with info about associated sites [#709](https://github.com/pnp/cli-microsoft365/pull/709)
- added support for SPO-D URLs solving [#759](https://github.com/pnp/cli-microsoft365/pull/759)

## [v1.12.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.12.0)

### New commands

**SharePoint Online:**

- [spo folder move](../cmd/spo/folder/folder-move.md) - moves a folder to another location [#672](https://github.com/pnp/cli-microsoft365/issues/672)
- [spo page text add](../cmd/spo/page/page-text-add.md) - adds text to a modern page [#365](https://github.com/pnp/cli-microsoft365/issues/365)

### Changes

- added support for site collection app catalog in the spo app install, -retract, -uninstall and -upgrade commands [#405](https://github.com/pnp/cli-microsoft365/issues/405)
- fixed bug with caching tokens for SPO commands [#719](https://github.com/pnp/cli-microsoft365/issues/719)

## [v1.11.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.11.0)

### New commands

**SharePoint Online:**

- [spo list webhook add](../cmd/spo/list/list-webhook-add.md) - adds a new webhook to the specified list [#652](https://github.com/pnp/cli-microsoft365/issues/652)
- [spo page header set](../cmd/spo/page/page-header-set.md) - sets modern page header [#697](https://github.com/pnp/cli-microsoft365/issues/697)

### Changes

- added support for setting page title [#693](https://github.com/pnp/cli-microsoft365/issues/693)
- added support for adding child navigation nodes [#695](https://github.com/pnp/cli-microsoft365/issues/695)
- added support for specifying web part data and fixed web parts lookup [#701](https://github.com/pnp/cli-microsoft365/issues/701), [#703](https://github.com/pnp/cli-microsoft365/issues/703)
- removed treating values of unknown options as numbers [#702](https://github.com/pnp/cli-microsoft365/issues/702)
- added support for site collection app catalog in the spo app add, -deploy, -get, -list and -remove commands [#405](https://github.com/pnp/cli-microsoft365/issues/405) (partially)
- added support for upgrading projects built using SharePoint Framework v1.7.0 [#716](https://github.com/pnp/cli-microsoft365/pull/716)

## [v1.10.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.10.0)

### New commands

**SharePoint Online:**

- [spo field set](../cmd/spo/field/field-set.md) - updates existing list or site column [#661](https://github.com/pnp/cli-microsoft365/issues/661)
- [spo file add](../cmd/spo/file/file-add.md) - uploads file to the specified folder [#283](https://github.com/pnp/cli-microsoft365/issues/283)
- [spo list contenttype add](../cmd/spo/list/list-contenttype-add.md) - adds content type to list [#594](https://github.com/pnp/cli-microsoft365/issues/594)
- [spo list contenttype list](../cmd/spo/list/list-contenttype-list.md) - lists content types configured on the list [#595](https://github.com/pnp/cli-microsoft365/issues/595)
- [spo list contenttype remove](../cmd/spo/list/list-contenttype-remove.md) - removes content type from list [#668](https://github.com/pnp/cli-microsoft365/issues/668)
- [spo list view set](../cmd/spo/list/list-view-set.md) - updates existing list view [#662](https://github.com/pnp/cli-microsoft365/issues/662)
- [spo list webhook remove](../cmd/spo/list/list-webhook-remove.md) - removes the specified webhook from the list [#650](https://github.com/pnp/cli-microsoft365/issues/650)
- [spo list webhook set](../cmd/spo/list/list-webhook-set.md) - updates the specified webhook [#651](https://github.com/pnp/cli-microsoft365/issues/651)
- [spo search](../cmd/spo/spo-search.md) - executes a search query [#316](https://github.com/pnp/cli-microsoft365/issues/316)
- [spo serviceprincipal grant add](../cmd/spo/serviceprincipal/serviceprincipal-grant-add.md) - grants the service principal permission to the specified API [#590](https://github.com/pnp/cli-microsoft365/issues/590)

**Microsoft Graph:**

- [graph siteclassification set](../cmd/aad/siteclassification/siteclassification-set.md) - updates site classification configuration [#304](https://github.com/pnp/cli-microsoft365/issues/304)
- [graph teams channel message get](../cmd/teams/message/message-get.md) - retrieves a message from a channel in a Microsoft Teams team [#589](https://github.com/pnp/cli-microsoft365/issues/589)

### Changes

- added support for adding child terms [#686](https://github.com/pnp/cli-microsoft365/issues/686)

## [v1.9.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.9.0)

### Changes

- added support for upgrading projects built using SharePoint Framework v1.6.0 [#663](https://github.com/pnp/cli-microsoft365/issues/663)

## [v1.8.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.8.0)

### New commands

**SharePoint Online:**

- [spo list webhook get](../cmd/spo/list/list-webhook-get.md) - gets information about the specific webhook [#590](https://github.com/pnp/cli-microsoft365/issues/590)
- [spo tenant settings set](../cmd/spo/tenant/tenant-settings-set.md) - sets tenant global settings [#549](https://github.com/pnp/cli-microsoft365/issues/549)
- [spo term add](../cmd/spo/term/term-add.md) - adds taxonomy term [#605](https://github.com/pnp/cli-microsoft365/issues/605)
- [spo term get](../cmd/spo/term/term-get.md) - gets information about the specified taxonomy term [#604](https://github.com/pnp/cli-microsoft365/issues/604)
- [spo term list](../cmd/spo/term/term-list.md) - lists taxonomy terms from the given term set [#603](https://github.com/pnp/cli-microsoft365/issues/603)
- [spo term group add](../cmd/spo/term/term-group-add.md) - adds taxonomy term group [#598](https://github.com/pnp/cli-microsoft365/issues/598)
- [spo term set add](../cmd/spo/term/term-set-add.md) - adds taxonomy term set [#602](https://github.com/pnp/cli-microsoft365/issues/602)
- [spo term set get](../cmd/spo/term/term-set-get.md) - gets information about the specified taxonomy term set [#601](https://github.com/pnp/cli-microsoft365/issues/601)
- [spo term set list](../cmd/spo/term/term-set-list.md) - lists taxonomy term sets from the given term group [#600](https://github.com/pnp/cli-microsoft365/issues/600)

**Microsoft Graph:**

- [graph siteclassification disable](../cmd/aad/siteclassification/siteclassification-disable.md) - disables site classification [#302](https://github.com/pnp/cli-microsoft365/issues/302)
- [graph siteclassification enable](../cmd/aad/siteclassification/siteclassification-enable.md) - enables site classification [#301](https://github.com/pnp/cli-microsoft365/issues/301)
- [graph teams channel add](../cmd/teams/channel/channel-add.md) - adds a channel to the specified Microsoft Teams team [#587](https://github.com/pnp/cli-microsoft365/issues/587)

### Changes

- improved SPFx project upgrade text report [#591](https://github.com/pnp/cli-microsoft365/issues/591)
- updated the 'spo tenant settings list' command [#623](https://github.com/pnp/cli-microsoft365/issues/623)
- changed commands to be lazy-loaded [#624](https://github.com/pnp/cli-microsoft365/issues/624)
- added error codes to the 'spfx project upgrade' command [#630](https://github.com/pnp/cli-microsoft365/issues/630)
- changed vorpal dependency to https [#637](https://github.com/pnp/cli-microsoft365/issues/637)
- added retrieving GuestUsageGuidelinesUrl [#640](https://github.com/pnp/cli-microsoft365/issues/640)

## [v1.7.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.7.0)

### New commands

**SharePoint Online:**

- [spo list webhook list](../cmd/spo/list/list-webhook-list.md) - lists all webhooks for the specified list [#579](https://github.com/pnp/cli-microsoft365/issues/579)
- [spo listitem list](../cmd/spo/listitem/listitem-list.md) - gets a list of items from the specified list [#268](https://github.com/pnp/cli-microsoft365/issues/268)
- [spo page column get](../cmd/spo/page/page-column-get.md) - get information about a specific column of a modern page [#412](https://github.com/pnp/cli-microsoft365/issues/412)
- [spo page remove](../cmd/spo/page/page-remove.md) - removes a modern page [#363](https://github.com/pnp/cli-microsoft365/issues/363)
- [spo page section add](../cmd/spo/page/page-section-add.md) - adds section to modern page [#364](https://github.com/pnp/cli-microsoft365/issues/364)
- [spo site classic remove](../cmd/spo/site/site-remove.md) - removes the specified site [#125](https://github.com/pnp/cli-microsoft365/issues/125)
- [spo tenant settings list](../cmd/spo/tenant/tenant-settings-list.md) - lists the global tenant settings [#548](https://github.com/pnp/cli-microsoft365/issues/548)
- [spo term group get](../cmd/spo/term/term-group-get.md) - gets information about the specified taxonomy term group [#597](https://github.com/pnp/cli-microsoft365/issues/597)
- [spo term group list](../cmd/spo/term/term-group-list.md) - lists taxonomy term groups [#596](https://github.com/pnp/cli-microsoft365/issues/596)

**Microsoft Graph:**

- [graph groupsetting remove](../cmd/aad/groupsetting/groupsetting-remove.md) - removes the particular group setting [#452](https://github.com/pnp/cli-microsoft365/pull/452)
- [graph groupsetting set](../cmd/aad/groupsetting/groupsetting-set.md) - removes the particular group setting [#451](https://github.com/pnp/cli-microsoft365/pull/451)

**Azure Management Service:**

- [azmgmt flow export](../cmd/flow/flow-export.md) - exports the specified Microsoft Flow as a file [#383](https://github.com/pnp/cli-microsoft365/issues/383)
- [azmgmt flow run get](../cmd/flow/run/run-get.md) - gets information about a specific run of the specified Microsoft Flow [#400](https://github.com/pnp/cli-microsoft365/issues/400)
- [azmgmt flow run list](../cmd/flow/run/run-list.md) - lists runs of the specified Microsoft Flow [#399](https://github.com/pnp/cli-microsoft365/issues/399)

### Changes

- added support for upgrading projects built using SharePoint Framework v1.5.1 [#569](https://github.com/pnp/cli-microsoft365/issues/569)
- added support for setting debug and verbose mode using an environment variable [#54](https://github.com/pnp/cli-microsoft365/issues/54)
- extended the 'spo cdn set' command, solving. Added support for managing both CDNs. Added support for enabling CDNs without provisioning default origins [#230](https://github.com/pnp/cli-microsoft365/issues/230)
- fixed bug in reporting SPFx project upgrade findings solving [#582](https://github.com/pnp/cli-microsoft365/issues/582)
- fixed upgrade SPFx 1.6.0 FN012012 always returns a finding [#580](https://github.com/pnp/cli-microsoft365/issues/580)
- combined npm commands in SPFx project upgrade summary solving [#508](https://github.com/pnp/cli-microsoft365/issues/508)
- renamed 'connect' commands to 'login' [#574](https://github.com/pnp/cli-microsoft365/issues/574)
- updated docs on escaping objectId in aad oauth2grant set and remove [#606](https://github.com/pnp/cli-microsoft365/issues/606)
- added 'npm dedupe' SPFx project upgrade rule [#612](https://github.com/pnp/cli-microsoft365/issues/612)

## [v1.6.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.6.0)

### New commands

**SharePoint Online:**

- [spo contenttype field set](../cmd/spo/contenttype/contenttype-field-set.md) - adds or updates a site column reference in a site content type [#520](https://github.com/pnp/cli-microsoft365/issues/520)
- [spo page section get](../cmd/spo/page/page-section-get.md) - gets information about the specified modern page section [#410](https://github.com/pnp/cli-microsoft365/issues/410)
- [spo page section list](../cmd/spo/page/page-section-list.md) - lists sections in the specific modern page [#409](https://github.com/pnp/cli-microsoft365/issues/409)

**Microsoft Graph:**

- [graph teams list](../cmd/teams/team/team-list.md) - lists Microsoft Teams in the current tenant [#558](https://github.com/pnp/cli-microsoft365/pull/558)

### Changes

- added support for upgrading projects built using SharePoint Framework v1.1.3 [#485](https://github.com/pnp/cli-microsoft365/issues/485)
- added support for upgrading projects built using SharePoint Framework v1.1.1 [#487](https://github.com/pnp/cli-microsoft365/issues/487)
- added support for upgrading projects built using SharePoint Framework v1.1.0 [#488](https://github.com/pnp/cli-microsoft365/issues/488)
- added support for upgrading projects built using SharePoint Framework v1.0.2 [#537](https://github.com/pnp/cli-microsoft365/issues/537)
- added support for upgrading projects built using SharePoint Framework v1.0.1 [#536](https://github.com/pnp/cli-microsoft365/issues/536)
- added support for upgrading projects built using SharePoint Framework v1.0.0 [#535](https://github.com/pnp/cli-microsoft365/issues/535)
- fixed created content type have different ID than specified [#550](https://github.com/pnp/cli-microsoft365/issues/550)

## [v1.5.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.5.0)

### New commands

**SharePoint Online:**

- [spo contenttype add](../cmd/spo/contenttype/contenttype-add.md) - adds a new list or site content type [#519](https://github.com/pnp/cli-microsoft365/issues/519)
- [spo contenttype get](../cmd/spo/contenttype/contenttype-get.md) - retrieves information about the specified list or site content type [#532](https://github.com/pnp/cli-microsoft365/issues/532)
- [spo field add](../cmd/spo/field/field-add.md) - adds a new list or site column using the CAML field definition [#518](https://github.com/pnp/cli-microsoft365/issues/518)
- [spo field get](../cmd/spo/field/field-get.md) - retrieves information about the specified list or site column [#528](https://github.com/pnp/cli-microsoft365/issues/528)
- [spo navigation node add](../cmd/spo/navigation/navigation-node-add.md) - adds a navigation node to the specified site navigation [#521](https://github.com/pnp/cli-microsoft365/issues/521)
- [spo navigation node list](../cmd/spo/navigation/navigation-node-list.md) - lists nodes from the specified site navigation [#522](https://github.com/pnp/cli-microsoft365/issues/522)
- [spo navigation node remove](../cmd/spo/navigation/navigation-node-remove.md) - removes the specified navigation node [#523](https://github.com/pnp/cli-microsoft365/issues/523)
- [spo page clientsidewebpart add](../cmd/spo/page/page-clientsidewebpart-add.md) - adds a client-side web part to a modern page [#366](https://github.com/pnp/cli-microsoft365/issues/366)
- [spo page column list](../cmd/spo/page/page-column-list.md) - lists columns in the specific section of a modern page [#411](https://github.com/pnp/cli-microsoft365/issues/411)
- [spo web set](../cmd/spo/web/web-set.md) - updates subsite properties [#191](https://github.com/pnp/cli-microsoft365/issues/191)

### Changes

- fixed exit code on error in the 'spo site add' command [#511](https://github.com/pnp/cli-microsoft365/issues/511)
- Added support for retrieving apps by their name [#516](https://github.com/pnp/cli-microsoft365/issues/516)

## [v1.4.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.4.0)

### New commands

**SharePoint Online:**

- [spo file checkin](../cmd/spo/file/file-checkin.md) - checks in specified file [#284](https://github.com/pnp/cli-microsoft365/issues/284)
- [spo file checkout](../cmd/spo/file/file-checkout.md) - checks out specified file [#285](https://github.com/pnp/cli-microsoft365/issues/285)
- [spo folder rename](../cmd/spo/folder/folder-rename.md) - renames a folder [#429](https://github.com/pnp/cli-microsoft365/issues/429)
- [spo listitem get](../cmd/spo/listitem/listitem-get.md) - gets a list item from the specified list [#269](https://github.com/pnp/cli-microsoft365/issues/269)
- [spo listitem set](../cmd/spo/listitem/listitem-set.md) - updates a list item in the specified list [#271](https://github.com/pnp/cli-microsoft365/issues/271)

**SharePoint Framework:**

- [spfx project upgrade](../cmd/spfx/project/project-upgrade.md) - upgrades SharePoint Framework project to the specified version [#471](https://github.com/pnp/cli-microsoft365/issues/471)

### Changes

- refactored to return non-zero error code on error [#468](https://github.com/pnp/cli-microsoft365/issues/468)
- fixed adding item to list referenced by id [#473](https://github.com/pnp/cli-microsoft365/issues/473)
- added support for upgrading projects built using SharePoint Framework v1.4.0 [#478](https://github.com/pnp/cli-microsoft365/issues/478)
- added support for upgrading projects built using SharePoint Framework v1.3.4 [#479](https://github.com/pnp/cli-microsoft365/issues/479)
- added support for upgrading projects built using SharePoint Framework v1.3.2 [#481](https://github.com/pnp/cli-microsoft365/issues/481)
- added support for upgrading projects built using SharePoint Framework v1.3.1 [#482](https://github.com/pnp/cli-microsoft365/issues/482)
- added support for upgrading projects built using SharePoint Framework v1.3.0 [#483](https://github.com/pnp/cli-microsoft365/issues/483)
- added support for upgrading projects built using SharePoint Framework v1.2.0 [#484](https://github.com/pnp/cli-microsoft365/issues/484)
- clarified usage of the [spo file get](../cmd/spo/file/file-get.md) command [#497](https://github.com/pnp/cli-microsoft365/pull/497)
- added support for upgrading projects built using SharePoint Framework v1.5.0 [#505](https://github.com/pnp/cli-microsoft365/issues/505)

## [v1.3.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.3.0)

### New commands

**SharePoint Online:**

- [spo file copy](../cmd/spo/file/file-copy.md) - copies a file to another location [#286](https://github.com/pnp/cli-microsoft365/issues/286)
- [spo folder add](../cmd/spo/folder/folder-add.md) - creates a folder within a parent folder [#425](https://github.com/pnp/cli-microsoft365/issues/425)
- [spo folder copy](../cmd/spo/folder/folder-copy.md) - copies a folder to another location [#424](https://github.com/pnp/cli-microsoft365/issues/424)
- [spo folder get](../cmd/spo/folder/folder-get.md) - gets information about the specified folder [#427](https://github.com/pnp/cli-microsoft365/issues/427)
- [spo folder list](../cmd/spo/folder/folder-list.md) - returns all folders under the specified parent folder [#428](https://github.com/pnp/cli-microsoft365/issues/428)
- [spo folder remove](../cmd/spo/folder/folder-remove.md) - deletes the specified folder [#426](https://github.com/pnp/cli-microsoft365/issues/426)
- [spo hidedefaultthemes get](../cmd/spo/hidedefaultthemes/hidedefaultthemes-get.md) - gets the current value of the HideDefaultThemes setting [#341](https://github.com/pnp/cli-microsoft365/issues/341)
- [spo hidedefaultthemes set](../cmd/spo/hidedefaultthemes/hidedefaultthemes-set.md) - sets the value of the HideDefaultThemes setting [#342](https://github.com/pnp/cli-microsoft365/issues/342)
- [spo site o365group set](../cmd/spo/site/site-groupify.md) - connects site collection to an Microsoft 365 Group [#431](https://github.com/pnp/cli-microsoft365/issues/431)
- [spo theme apply](../cmd/spo/theme/theme-apply.md) - applies theme to the specified site [#343](https://github.com/pnp/cli-microsoft365/issues/343)

**Microsoft Graph:**

- [graph groupsetting add](../cmd/aad/groupsetting/groupsetting-add.md) - creates a group setting [#443](https://github.com/pnp/cli-microsoft365/issues/443)
- [graph groupsetting get](../cmd/aad/groupsetting/groupsetting-get.md) - gets information about the particular group setting [#450](https://github.com/pnp/cli-microsoft365/issues/450)
- [graph groupsetting list](../cmd/aad/groupsetting/groupsetting-list.md) - lists Azure AD group settings [#449](https://github.com/pnp/cli-microsoft365/issues/449)
- [graph groupsettingtemplate get](../cmd/aad/groupsettingtemplate/groupsettingtemplate-get.md) - gets information about the specified Azure AD group settings template [#442](https://github.com/pnp/cli-microsoft365/issues/442)
- [graph groupsettingtemplate list](../cmd/aad/groupsettingtemplate/groupsettingtemplate-list.md) - lists Azure AD group settings templates [#441](https://github.com/pnp/cli-microsoft365/issues/441)
- [graph user sendmail](../cmd/outlook/mail/mail-send.md) - sends e-mail on behalf of the current user [#328](https://github.com/pnp/cli-microsoft365/issues/328)

### Changes

- added support for re-consenting the AAD app [#421](https://github.com/pnp/cli-microsoft365/issues/421)
- added update notification [#200](https://github.com/pnp/cli-microsoft365/issues/200)
- extended the 'spo app deploy' command to support specifying app using its name [#404](https://github.com/pnp/cli-microsoft365/issues/404)
- extended the 'spo app add' command to return the information about the added app [#463](https://github.com/pnp/cli-microsoft365/issues/463)

## [v1.2.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.2.0)

### New commands

**SharePoint Online:**

- [spo file remove](../cmd/spo/file/file-remove.md) - removes the specified file [#287](https://github.com/pnp/cli-microsoft365/issues/287)
- [spo hubsite data get](../cmd/spo/hubsite/hubsite-data-get.md) - gets hub site data for the specified site [#394](https://github.com/pnp/cli-microsoft365/issues/394)
- [spo hubsite theme sync](../cmd/spo/hubsite/hubsite-theme-sync.md) - applies any theme updates from the parent hub site [#401](https://github.com/pnp/cli-microsoft365/issues/401)
- [spo listitem add](../cmd/spo/listitem/listitem-add.md) - creates a list item in the specified list [#270](https://github.com/pnp/cli-microsoft365/issues/270)
- [spo listitem remove](../cmd/spo/listitem/listitem-remove.md) - removes the specified list item [#272](https://github.com/pnp/cli-microsoft365/issues/272)
- [spo page control get](../cmd/spo/page/page-control-get.md) - gets information about the specific control on a modern page [#414](https://github.com/pnp/cli-microsoft365/issues/414)
- [spo page control list](../cmd/spo/page/page-control-list.md) - lists controls on the specific modern page [#413](https://github.com/pnp/cli-microsoft365/issues/413)
- [spo page get](../cmd/spo/page/page-get.md) - gets information about the specific modern page [#360](https://github.com/pnp/cli-microsoft365/issues/360)
- [spo propertybag set](../cmd/spo/propertybag/propertybag-set.md) - sets the value of the specified property in the property bag [#393](https://github.com/pnp/cli-microsoft365/issues/393)
- [spo web clientsidewebpart list](../cmd/spo/web/web-clientsidewebpart-list.md) - lists available client-side web parts [#367](https://github.com/pnp/cli-microsoft365/issues/367)

**Microsoft Graph:**

- [graph user get](../cmd/aad/user/user-get.md) - gets information about the specified user [#326](https://github.com/pnp/cli-microsoft365/issues/326)
- [graph user list](../cmd/aad/user/user-list.md) - lists users matching specified criteria [#327](https://github.com/pnp/cli-microsoft365/issues/327)

### Changes

- added support for authenticating using credentials solving [#388](https://github.com/pnp/cli-microsoft365/issues/388)

## [v1.1.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.1.0)

### New commands

**SharePoint Online:**

- [spo file get](../cmd/spo/file/file-get.md) - gets information about the specified file [#282](https://github.com/pnp/cli-microsoft365/issues/282)
- [spo page add](../cmd/spo/page/page-add.md) - creates modern page [#361](https://github.com/pnp/cli-microsoft365/issues/361)
- [spo page list](../cmd/spo/page/page-list.md) - lists all modern pages in the given site [#359](https://github.com/pnp/cli-microsoft365/issues/359)
- [spo page set](../cmd/spo/page/page-set.md) - updates modern page properties [#362](https://github.com/pnp/cli-microsoft365/issues/362)
- [spo propertybag remove](../cmd/spo/propertybag/propertybag-remove.md) - removes specified property from the property bag [#291](https://github.com/pnp/cli-microsoft365/issues/291)
- [spo sitedesign apply](../cmd/spo/sitedesign/sitedesign-apply.md) - applies a site design to an existing site collection [#339](https://github.com/pnp/cli-microsoft365/issues/339)
- [spo theme get](../cmd/spo/theme/theme-get.md) - gets custom theme information [#349](https://github.com/pnp/cli-microsoft365/issues/349)
- [spo theme list](../cmd/spo/theme/theme-list.md) - retrieves the list of custom themes [#332](https://github.com/pnp/cli-microsoft365/issues/332)
- [spo theme remove](../cmd/spo/theme/theme-remove.md) - removes existing theme [#331](https://github.com/pnp/cli-microsoft365/issues/331)
- [spo theme set](../cmd/spo/theme/theme-set.md) - add or update a theme [#330](https://github.com/pnp/cli-microsoft365/issues/330), [#340](https://github.com/pnp/cli-microsoft365/issues/340)
- [spo web get](../cmd/spo/web/web-get.md) - retrieve information about the specified site [#188](https://github.com/pnp/cli-microsoft365/issues/188)

**Microsoft Graph:**

- [graph o365group remove](../cmd/aad/o365group/o365group-remove.md) - removes an Microsoft 365 Group [#309](https://github.com/pnp/cli-microsoft365/issues/309)
- [graph o365group restore](../cmd/aad/o365group/o365group-restore.md) - restores a deleted Microsoft 365 Group [#346](https://github.com/pnp/cli-microsoft365/issues/346)
- [graph siteclassification get](../cmd/aad/siteclassification/siteclassification-get.md) - gets site classification configuration [#303](https://github.com/pnp/cli-microsoft365/issues/303)

**Azure Management Service:**

- azmgmt login - log in to the Azure Management Service [#378](https://github.com/pnp/cli-microsoft365/issues/378)
- azmgmt logout - log out from the Azure Management Service [#378](https://github.com/pnp/cli-microsoft365/issues/378)
- azmgmt status - shows Azure Management Service login status [#378](https://github.com/pnp/cli-microsoft365/issues/378)
- [azmgmt flow environment get](../cmd/flow/environment/environment-get.md) - gets information about the specified Microsoft Flow environment [#380](https://github.com/pnp/cli-microsoft365/issues/380)
- [azmgmt flow environment list](../cmd/flow/environment/environment-list.md) - lists Microsoft Flow environments in the current tenant [#379](https://github.com/pnp/cli-microsoft365/issues/379)
- [azmgmt flow get](../cmd/flow/flow-get.md) - gets information about the specified Microsoft Flow [#382](https://github.com/pnp/cli-microsoft365/issues/382)
- [azmgmt flow list](../cmd/flow/flow-list.md) - lists Microsoft Flows in the given environment [#381](https://github.com/pnp/cli-microsoft365/issues/381)

### Updated commands

**Microsoft Graph:**

- [graph o365group list](../cmd/aad/o365group/o365group-list.md) - added support for listing deleted Microsoft 365 Groups [#347](https://github.com/pnp/cli-microsoft365/issues/347)

### Changes

- fixed bug in retrieving Microsoft 365 groups in immersive mode solving [#351](https://github.com/pnp/cli-microsoft365/issues/351)

## [v1.0.0](https://github.com/pnp/cli-microsoft365/releases/tag/v1.0.0)

### Breaking changes

- switched to a custom Azure AD application for communicating with Microsoft 365. After installing this version you have to reconnect to Microsoft 365

### New commands

**SharePoint Online:**

- [spo file list](../cmd/spo/file/file-list.md) - lists all available files in the specified folder and site [#281](https://github.com/pnp/cli-microsoft365/issues/281)
- [spo list add](../cmd/spo/list/list-add.md) - creates list in the specified site [#204](https://github.com/pnp/cli-microsoft365/issues/204)
- [spo list remove](../cmd/spo/list/list-remove.md) - removes the specified list [#206](https://github.com/pnp/cli-microsoft365/issues/206)
- [spo list set](../cmd/spo/list/list-set.md) - updates the settings of the specified list [#205](https://github.com/pnp/cli-microsoft365/issues/205)
- [spo customaction clear](../cmd/spo/customaction/customaction-clear.md) - deletes all custom actions in the collection [#231](https://github.com/pnp/cli-microsoft365/issues/231)
- [spo propertybag get](../cmd/spo/propertybag/propertybag-get.md) - gets the value of the specified property from the property bag [#289](https://github.com/pnp/cli-microsoft365/issues/289)
- [spo propertybag list](../cmd/spo/propertybag/propertybag-list.md) - gets property bag values [#288](https://github.com/pnp/cli-microsoft365/issues/288)
- [spo site set](../cmd/spo/site/site-set.md) - updates properties of the specified site [#121](https://github.com/pnp/cli-microsoft365/issues/121)
- [spo site classic add](../cmd/spo/site/site-classic-add.md) - creates new classic site [#123](https://github.com/pnp/cli-microsoft365/issues/123)
- [spo site classic set](../cmd/spo/site/site-classic-set.md) - change classic site settings [#124](https://github.com/pnp/cli-microsoft365/issues/124)
- [spo sitedesign set](../cmd/spo/sitedesign/sitedesign-set.md) - updates a site design with new values [#251](https://github.com/pnp/cli-microsoft365/issues/251)
- [spo tenant appcatalogurl get](../cmd/spo/tenant/tenant-appcatalogurl-get.md) - gets the URL of the tenant app catalog [#315](https://github.com/pnp/cli-microsoft365/issues/315)
- [spo web add](../cmd/spo/web/web-add.md) - create new subsite [#189](https://github.com/pnp/cli-microsoft365/issues/189)
- [spo web list](../cmd/spo/web/web-list.md) - lists subsites of the specified site [#187](https://github.com/pnp/cli-microsoft365/issues/187)
- [spo web remove](../cmd/spo/web/web-remove.md) - delete specified subsite [#192](https://github.com/pnp/cli-microsoft365/issues/192)

**Microsoft Graph:**

- graph - log in to the Microsoft Graph [#10](https://github.com/pnp/cli-microsoft365/issues/10)
- graph - log out from the Microsoft Graph [#10](https://github.com/pnp/cli-microsoft365/issues/10)
- graph - shows Microsoft Graph login status [#10](https://github.com/pnp/cli-microsoft365/issues/10)
- [graph o365group add](../cmd/aad/o365group/o365group-add.md) - creates Microsoft 365 Group [#308](https://github.com/pnp/cli-microsoft365/issues/308)
- [graph o365group get](../cmd/aad/o365group/o365group-get.md) - gets information about the specified Microsoft 365 Group [#306](https://github.com/pnp/cli-microsoft365/issues/306)
- [graph o365group list](../cmd/aad/o365group/o365group-list.md) - lists Microsoft 365 Groups in the current tenant [#305](https://github.com/pnp/cli-microsoft365/issues/305)
- [graph o365group set](../cmd/aad/o365group/o365group-set.md) - updates Microsoft 365 Group properties [#307](https://github.com/pnp/cli-microsoft365/issues/307)

### Changes

- fixed bug in logging dates [#317](https://github.com/pnp/cli-microsoft365/issues/317)
- fixed typo in the example of the [spo cdn origin add](../cmd/spo/cdn/cdn-origin-add.md) command [#338](https://github.com/pnp/cli-microsoft365/issues/338)

## [v0.5.0](https://github.com/pnp/cli-microsoft365/releases/tag/v0.5.0)

### Breaking changes

- changed the [spo site get](../cmd/spo/site/site-get.md) command to return SPSite properties [#293](https://github.com/pnp/cli-microsoft365/issues/293)

### New commands

**SharePoint Online:**

- [spo sitescript add](../cmd/spo/sitescript/sitescript-add.md) - adds site script for use with site designs [#65](https://github.com/pnp/cli-microsoft365/issues/65)
- [spo sitescript list](../cmd/spo/sitescript/sitescript-list.md) - lists site script available for use with site designs [#66](https://github.com/pnp/cli-microsoft365/issues/66)
- [spo sitescript get](../cmd/spo/sitescript/sitescript-get.md) - gets information about the specified site script [#67](https://github.com/pnp/cli-microsoft365/issues/67)
- [spo sitescript remove](../cmd/spo/sitescript/sitescript-remove.md) - removes the specified site script [#68](https://github.com/pnp/cli-microsoft365/issues/68)
- [spo sitescript set](../cmd/spo/sitescript/sitescript-set.md) - updates existing site script [#216](https://github.com/pnp/cli-microsoft365/issues/216)
- [spo sitedesign add](../cmd/spo/sitedesign/sitedesign-add.md) - adds site design for creating modern sites [#69](https://github.com/pnp/cli-microsoft365/issues/69)
- [spo sitedesign get](../cmd/spo/sitedesign/sitedesign-get.md) - gets information about the specified site design [#86](https://github.com/pnp/cli-microsoft365/issues/86)
- [spo sitedesign list](../cmd/spo/sitedesign/sitedesign-list.md) - lists available site designs for creating modern sites [#85](https://github.com/pnp/cli-microsoft365/issues/85)
- [spo sitedesign remove](../cmd/spo/sitedesign/sitedesign-remove.md) - removes the specified site design [#87](https://github.com/pnp/cli-microsoft365/issues/87)
- [spo sitedesign rights grant](../cmd/spo/sitedesign/sitedesign-rights-grant.md) - grants access to a site design for one or more principals [#88](https://github.com/pnp/cli-microsoft365/issues/88)
- [spo sitedesign rights revoke](../cmd/spo/sitedesign/sitedesign-rights-revoke.md) - revokes access from a site design for one or more principals [#89](https://github.com/pnp/cli-microsoft365/issues/89)
- [spo sitedesign rights list](../cmd/spo/sitedesign/sitedesign-rights-list.md) - gets a list of principals that have access to a site design [#90](https://github.com/pnp/cli-microsoft365/issues/90)
- [spo list get](../cmd/spo/list/list-get.md) - gets information about the specific list [#199](https://github.com/pnp/cli-microsoft365/issues/199)
- [spo customaction remove](../cmd/spo/customaction/customaction-remove.md) - removes the specified custom action [#21](https://github.com/pnp/cli-microsoft365/issues/21)
- [spo site classic list](../cmd/spo/site/site-classic-list.md) - lists sites of the given type [#122](https://github.com/pnp/cli-microsoft365/issues/122)
- [spo list list](../cmd/spo/list/list-list.md) - lists all available list in the specified site [#198](https://github.com/pnp/cli-microsoft365/issues/198)
- [spo hubsite list](../cmd/spo/hubsite/hubsite-list.md) - lists hub sites in the current tenant [#91](https://github.com/pnp/cli-microsoft365/issues/91)
- [spo hubsite get](../cmd/spo/hubsite/hubsite-get.md) - gets information about the specified hub site [#92](https://github.com/pnp/cli-microsoft365/issues/92)
- [spo hubsite register](../cmd/spo/hubsite/hubsite-register.md) - registers the specified site collection as a hub site [#94](https://github.com/pnp/cli-microsoft365/issues/94)
- [spo hubsite unregister](../cmd/spo/hubsite/hubsite-unregister.md) - unregisters the specified site collection as a hub site [#95](https://github.com/pnp/cli-microsoft365/issues/95)
- [spo hubsite set](../cmd/spo/hubsite/hubsite-set.md) - updates properties of the specified hub site [#96](https://github.com/pnp/cli-microsoft365/issues/96)
- [spo hubsite connect](../cmd/spo/hubsite/hubsite-connect.md) - connects the specified site collection to the given hub site [#97](https://github.com/pnp/cli-microsoft365/issues/97)
- [spo hubsite disconnect](../cmd/spo/hubsite/hubsite-disconnect.md) - disconnects the specifies site collection from its hub site [#98](https://github.com/pnp/cli-microsoft365/issues/98)
- [spo hubsite rights grant](../cmd/spo/hubsite/hubsite-rights-grant.md) - grants permissions to join the hub site for one or more principals [#99](https://github.com/pnp/cli-microsoft365/issues/99)
- [spo hubsite rights revoke](../cmd/spo/hubsite/hubsite-rights-revoke.md) - revokes rights to join sites to the specified hub site for one or more principals [#100](https://github.com/pnp/cli-microsoft365/issues/100)
- [spo customaction set](../cmd/spo/customaction/customaction-set.md) - updates a user custom action for site or site collection [#212](https://github.com/pnp/cli-microsoft365/issues/212)

### Changes

- fixed issue with prompts in non-interactive mode [#142](https://github.com/pnp/cli-microsoft365/issues/142)
- added information about the current user to status commands [#202](https://github.com/pnp/cli-microsoft365/issues/202)
- fixed issue with completing input that doesn't match commands [#222](https://github.com/pnp/cli-microsoft365/issues/222)
- fixed issue with escaping numeric input [#226](https://github.com/pnp/cli-microsoft365/issues/226)
- changed the [aad oauth2grant list](../cmd/aad/oauth2grant/oauth2grant-list.md), [spo app list](../cmd/spo/app/app-list.md), [spo customaction list](../cmd/spo/customaction/customaction-list.md), [spo site list](../cmd/spo/site/site-list.md) commands to list all properties for output type JSON [#232](https://github.com/pnp/cli-microsoft365/issues/232), [#233](https://github.com/pnp/cli-microsoft365/issues/233), [#234](https://github.com/pnp/cli-microsoft365/issues/234), [#235](https://github.com/pnp/cli-microsoft365/issues/235)
- fixed issue with generating clink completion file [#252](https://github.com/pnp/cli-microsoft365/issues/252)
- added [user guide](../user-guide/installing-cli.md) [#236](https://github.com/pnp/cli-microsoft365/issues/236), [#237](https://github.com/pnp/cli-microsoft365/issues/237), [#238](https://github.com/pnp/cli-microsoft365/issues/238), [#239](https://github.com/pnp/cli-microsoft365/issues/239)

## [v0.4.0](https://github.com/pnp/cli-microsoft365/releases/tag/v0.4.0)

### Breaking changes

- renamed the `spo cdn origin set` command to [spo cdn origin add](../cmd/spo/cdn/cdn-origin-add.md) [#184](https://github.com/pnp/cli-microsoft365/issues/184)

### New commands

**SharePoint Online:**

- [spo customaction list](../cmd/spo/customaction/customaction-list.md) - lists user custom actions for site or site collection [#19](https://github.com/pnp/cli-microsoft365/issues/19)
- [spo site get](../cmd/spo/site/site-get.md) - gets information about the specific site collection [#114](https://github.com/pnp/cli-microsoft365/issues/114)
- [spo site list](../cmd/spo/site/site-list.md) - lists modern sites of the given type [#115](https://github.com/pnp/cli-microsoft365/issues/115)
- [spo site add](../cmd/spo/site/site-add.md) - creates new modern site [#116](https://github.com/pnp/cli-microsoft365/issues/116)
- [spo app remove](../cmd/spo/app/app-remove.md) - removes the specified app from the tenant app catalog [#9](https://github.com/pnp/cli-microsoft365/issues/9)
- [spo site appcatalog add](../cmd/spo/site/site-appcatalog-add.md) - creates a site collection app catalog in the specified site [#63](https://github.com/pnp/cli-microsoft365/issues/63)
- [spo site appcatalog remove](../cmd/spo/site/site-appcatalog-remove.md) - removes site collection scoped app catalog from site [#64](https://github.com/pnp/cli-microsoft365/issues/64)
- [spo serviceprincipal permissionrequest list](../cmd/spo/serviceprincipal/serviceprincipal-permissionrequest-list.md) - lists pending permission requests [#152](https://github.com/pnp/cli-microsoft365/issues/152)
- [spo serviceprincipal permissionrequest approve](../cmd/spo/serviceprincipal/serviceprincipal-permissionrequest-approve.md) - approves the specified permission request [#153](https://github.com/pnp/cli-microsoft365/issues/153)
- [spo serviceprincipal permissionrequest deny](../cmd/spo/serviceprincipal/serviceprincipal-permissionrequest-deny.md) - denies the specified permission request [#154](https://github.com/pnp/cli-microsoft365/issues/154)
- [spo serviceprincipal grant list](../cmd/spo/serviceprincipal/serviceprincipal-grant-list.md) - lists permissions granted to the service principal [#155](https://github.com/pnp/cli-microsoft365/issues/155)
- [spo serviceprincipal grant revoke](../cmd/spo/serviceprincipal/serviceprincipal-grant-revoke.md) - revokes the specified set of permissions granted to the service principal [#155](https://github.com/pnp/cli-microsoft365/issues/156)
- [spo serviceprincipal set](../cmd/spo/serviceprincipal/serviceprincipal-set.md) - enable or disable the service principal [#157](https://github.com/pnp/cli-microsoft365/issues/157)
- [spo customaction add](../cmd/spo/customaction/customaction-add.md) - adds a user custom action for site or site collection [#18](https://github.com/pnp/cli-microsoft365/issues/18)
- [spo externaluser list](../cmd/spo/externaluser/externaluser-list.md) - lists external users in the tenant [#27](https://github.com/pnp/cli-microsoft365/issues/27)

**Azure Active Directory Graph:**

- aad login - log in to the Azure Active Directory Graph [#160](https://github.com/pnp/cli-microsoft365/issues/160)
- aad logout - log out from Azure Active Directory Graph [#161](https://github.com/pnp/cli-microsoft365/issues/161)
- aad status - shows Azure Active Directory Graph login status [#162](https://github.com/pnp/cli-microsoft365/issues/162)
- [aad sp get](../cmd/aad/sp/sp-get.md) - gets information about the specific service principal [#158](https://github.com/pnp/cli-microsoft365/issues/158)
- [aad oauth2grant list](../cmd/aad/oauth2grant/oauth2grant-list.md) - lists OAuth2 permission grants for the specified service principal [#159](https://github.com/pnp/cli-microsoft365/issues/159)
- [aad oauth2grant add](../cmd/aad/oauth2grant/oauth2grant-add.md) - grant the specified service principal OAuth2 permissions to the specified resource [#164](https://github.com/pnp/cli-microsoft365/issues/164)
- [aad oauth2grant set](../cmd/aad/oauth2grant/oauth2grant-set.md) - update OAuth2 permissions for the service principal [#163](https://github.com/pnp/cli-microsoft365/issues/163)
- [aad oauth2grant remove](../cmd/aad/oauth2grant/oauth2grant-remove.md) - remove specified service principal OAuth2 permissions [#165](https://github.com/pnp/cli-microsoft365/issues/165)

### Changes

- added support for persisting connection [#46](https://github.com/pnp/cli-microsoft365/issues/46)
- fixed authentication bug in `spo app install`, `spo app uninstall` and `spo app upgrade` commands when connected to the tenant admin site [#118](https://github.com/pnp/cli-microsoft365/issues/118)
- fixed authentication bug in the `spo customaction get` command when connected to the tenant admin site [#113](https://github.com/pnp/cli-microsoft365/issues/113)
- fixed bug in rendering help for commands when using the `--help` option [#104](https://github.com/pnp/cli-microsoft365/issues/104)
- added detailed output to the `spo customaction get` command [#93](https://github.com/pnp/cli-microsoft365/issues/93)
- improved collecting telemetry [#130](https://github.com/pnp/cli-microsoft365/issues/130), [#131](https://github.com/pnp/cli-microsoft365/issues/131), [#132](https://github.com/pnp/cli-microsoft365/issues/132), [#133](https://github.com/pnp/cli-microsoft365/issues/133)
- added support for the `skipFeatureDeployment` flag to the [spo app deploy](../cmd/spo/app/app-deploy.md) command [#134](https://github.com/pnp/cli-microsoft365/issues/134)
- wrapped executing commands in `try..catch` [#109](https://github.com/pnp/cli-microsoft365/issues/109)
- added serializing objects in log [#108](https://github.com/pnp/cli-microsoft365/issues/108)
- added support for autocomplete in Zsh, Bash and Fish and Clink (cmder) on Windows [#141](https://github.com/pnp/cli-microsoft365/issues/141), [#190](https://github.com/pnp/cli-microsoft365/issues/190)

## [v0.3.0](https://github.com/pnp/cli-microsoft365/releases/tag/v0.3.0)

### New commands

**SharePoint Online:**

- [spo customaction get](../cmd/spo/customaction/customaction-get.md) - gets information about the specific user custom action [#20](https://github.com/pnp/cli-microsoft365/issues/20)

### Changes

- changed command output to silent [#47](https://github.com/pnp/cli-microsoft365/issues/47)
- added user-agent string to all requests [#52](https://github.com/pnp/cli-microsoft365/issues/52)
- refactored `spo cdn get` and `spo storageentity set` to use the `getRequestDigest` helper [#78](https://github.com/pnp/cli-microsoft365/issues/78) and [#80](https://github.com/pnp/cli-microsoft365/issues/80)
- added common handler for rejected OData promises [#59](https://github.com/pnp/cli-microsoft365/issues/59)
- added Google Analytics code to documentation [#84](https://github.com/pnp/cli-microsoft365/issues/84)
- added support for formatting command output as JSON [#48](https://github.com/pnp/cli-microsoft365/issues/48)

## [v0.2.0](https://github.com/pnp/cli-microsoft365/releases/tag/v0.2.0)

### New commands

**SharePoint Online:**

- [spo app add](../cmd/spo/app/app-add.md) - add an app to the specified SharePoint Online app catalog [#3](https://github.com/pnp/cli-microsoft365/issues/3)
- [spo app deploy](../cmd/spo/app/app-deploy.md) - deploy the specified app in the tenant app catalog [#7](https://github.com/pnp/cli-microsoft365/issues/7)
- [spo app get](../cmd/spo/app/app-get.md) - get information about the specific app from the tenant app catalog [#2](https://github.com/pnp/cli-microsoft365/issues/2)
- [spo app install](../cmd/spo/app/app-install.md) - install an app from the tenant app catalog in the site [#4](https://github.com/pnp/cli-microsoft365/issues/4)
- [spo app list](../cmd/spo/app/app-list.md) - list apps from the tenant app catalog [#1](https://github.com/pnp/cli-microsoft365/issues/1)
- [spo app retract](../cmd/spo/app/app-retract.md) - retract the specified app from the tenant app catalog [#8](https://github.com/pnp/cli-microsoft365/issues/8)
- [spo app uninstall](../cmd/spo/app/app-uninstall.md) - uninstall an app from the site [#5](https://github.com/pnp/cli-microsoft365/issues/5)
- [spo app upgrade](../cmd/spo/app/app-upgrade.md) - upgrade app in the specified site [#6](https://github.com/pnp/cli-microsoft365/issues/6)

## v0.1.1

### Changes

- Fixed bug in resolving command paths on Windows

## v0.1.0

Initial release.

### New commands

**SharePoint Online:**

- [spo cdn get](../cmd/spo/cdn/cdn-get.md) - get Microsoft 365 CDN status
- [spo cdn origin list](../cmd/spo/cdn/cdn-origin-list.md) - list Microsoft 365 CDN origins
- [spo cdn origin remove](../cmd/spo/cdn/cdn-origin-remove.md) - remove Microsoft 365 CDN origin
- [spo cdn origin add](../cmd/spo/cdn/cdn-origin-add.md) - add Microsoft 365 CDN origin
- [spo cdn policy list](../cmd/spo/cdn/cdn-policy-list.md) - list Microsoft 365 CDN policies
- [spo cdn policy set](../cmd/spo/cdn/cdn-policy-set.md) - set Microsoft 365 CDN policy
- [spo cdn set](../cmd/spo/cdn/cdn-set.md) - enable/disable Microsoft 365 CDN
- spo login - log in to a SharePoint Online site
- spo logout - log out from SharePoint
- spo status - show SharePoint Online login status
- [spo storageentity get](../cmd/spo/storageentity/storageentity-get.md) - get value of a tenant property
- [spo storageentity list](../cmd/spo/storageentity/storageentity-list.md) - list all tenant properties
- [spo storageentity remove](../cmd/spo/storageentity/storageentity-remove.md) - remove a tenant property
- [spo storageentity set](../cmd/spo/storageentity/storageentity-set.md) - set a tenant property
