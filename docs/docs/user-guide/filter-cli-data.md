# Filter CLI data using JMESPath queries

CLI for Microsoft 365 supports filtering, sorting, and querying data using [JMESPath](http://jmespath.org/) queries. By specifying the `--query` option on each command you can create complex queries.

There are two types of data returned by the CLI for Microsoft 365 when retrieving data as JSON. In most cases, it returns an array of items, but some of the older commands the response is encapsulated in a `value` object. For both scenario's you can use JMESPath to filter, but the queries are a bit different.

## Testing JMESPath queries

You can test your queries using the [JMESPath](http://jmespath.org/) interactive homepage. You can execute a CLI for Microsoft 365 command, get the JSON response and paste it on the homepage and test your queries from there if you do not want to test them while writing scripts. It is a great way to learn what's possible!

## Basic array filters

Let's start with a basic command and return some results using the following command: `m365 spo site classic list --output json`. To simplify the testing most of the properties are removed, but the result would look similarly to:

```json
[{
    "_ObjectType_": "Microsoft.Online.SharePoint.TenantAdministration.SiteProperties",
    "AllowDownloadingNonWebViewableFiles": true,
    "AllowEditing": false,
    "Title": "Demo 1",
    "Status": "Active",
    "StorageMaximumLevel": 26214400,
    "StorageQuotaType": null
 },
 {
    "_ObjectType_": "Microsoft.Online.SharePoint.TenantAdministration.SiteProperties",
    "AllowDownloadingNonWebViewableFiles": false,
    "AllowEditing": false,
    "Title": "A Demo 2",
    "Status": "Active",
    "StorageMaximumLevel": 26214400,
    "StorageQuotaType": null
 },
 {
    "_ObjectType_": "Microsoft.Online.SharePoint.TenantAdministration.SiteProperties",
    "AllowDownloadingNonWebViewableFiles": true,
    "AllowEditing": false,
    "Title": "Sample 1",
    "Status": "Active",
    "StorageMaximumLevel": 26214400,
    "StorageQuotaType": null
}]
```

Using JMESPath queries you can do basic filtering as well as more complex scenario's like `starts_with` or `ends_with`.

- `[?Title == 'Demo 1']` returns only the **first item** from the array as it matches on the title **Demo 1**.
- `[?contains(Title, 'Demo')]` would return the **first two items** as it matches the title on the word **Demo**.
- `[?contains(*, 'Demo 1')]` would return any item in the array where the value of any property is **Demo 1**, currently only the **first item**.
- `[?starts_with(Title, 'Demo')]` would only return the **first item** as it filters the title to start with **Demo**.
- `[?ends_with(Title, '1')]` returns the **first and last item**, as the title ends with a **1**.
- `[?contains(Title, 'Demo') && AllowDownloadingNonWebViewableFiles]` returns only the **first item** as it **combines a title filter, and a check on AllowDownloadingNonWebViewableFiles** two filters.

Besides filtering, you can also scope what will be returned as a result:

- `[*].Title` returns only the Title for all items.
- `[*].{Title: Title}` returns all items as array with a Title property.

Or you can combine both a filter query and scope the results:

- `[?contains(Title, 'Demo') && AllowDownloadingNonWebViewableFiles].Title`  returns only the **first item title**

## Other array filters

Some of the commands return complex types. Querying or filtering based on values in complex types can be done with JMESPath as well. The query, however, will look different. Executing the following command `m365 flow environment list --output json` will return a complex type and the result will be similar to the sample below:

```json
[
  {
    "name": "4be50206-9576-4237-8b17-36d8aadfaa36",
    "location": "europe",
    "type": "Microsoft.ProcessSimple/environments",
    "id": "/providers/Microsoft.ProcessSimple/environments/4be50206-9576-4237-8b17-36d8aadfaa36",
    "properties": {
      "displayName": "Contoso Dev Environment",
      "createdTime": "2021-06-18T16:36:20.5687306Z",
      "createdBy": {
        "id": "SYSTEM",
        "displayName": "SYSTEM",
        "type": "NotSpecified"
      },
      "lastModifiedTime": "2021-06-18T16:40:32.7592868Z",
      "provisioningState": "Succeeded",
      "creationType": "Developer",
      "environmentSku": "Developer",
      "environmentType": "NotSpecified",
      "states": {
        "management": {
          "id": "Ready"
        },
        "runtime": {
          "id": "Enabled"
        }
      },
      "isDefault": false,
      "azureRegionHint": "westeurope",
      "runtimeEndpoints": {
        "microsoft.BusinessAppPlatform": "https://europe.api.bap.microsoft.com",
        "microsoft.CommonDataModel": "https://europe.api.cds.microsoft.com",
        "microsoft.PowerApps": "https://europe.api.powerapps.com",
        "microsoft.Flow": "https://europe.api.flow.microsoft.com",
        "microsoft.PowerAppsAdvisor": "https://europe.api.advisor.powerapps.com",
        "microsoft.ApiManagement": "https://management.EUR.azure-apihub.net"
      },
      "environmentFeatures": {
        "isOpenApiEnabled": false
      }
    },
    "displayName": "Contoso Dev Environment"
  },
  {
    "name": "Default-3ca3eaa6-140f-4175-9563-2272edf9f338",
    "location": "europe",
    "type": "Microsoft.ProcessSimple/environments",
    "id": "/providers/Microsoft.ProcessSimple/environments/Default-3ca3eaa6-140f-4175-9563-2272edf9f338",
    "properties": {
      "displayName": "contoso (default)",
      "createdTime": "2016-10-28T10:32:54.1945519Z",
      "createdBy": {
        "id": "88e85b64-e687-4e0b-bbf4-f42f5f8e674e",
        "displayName": "Garth Fort",
        "type": "NotSpecified"
      },
      "lastModifiedTime": "2020-07-28T08:58:12.5785779Z",
      "lastModifiedBy": {
        "id": "88e85b64-e687-4e0b-bbf4-f42f5f8e674e",
        "displayName": "Garth Fort",
        "email": "garthf@contoso.nl",
        "type": "User",
        "tenantId": "3ca3eaa6-140f-4175-9563-2272edf9f338",
        "userPrincipalName": "garthf@contoso.nl"
      },
      "provisioningState": "Succeeded",
      "creationType": "DefaultTenant",
      "environmentSku": "Default",
      "environmentType": "NotSpecified",
      "states": {
        "management": {
          "id": "NotSpecified"
        },
        "runtime": {
          "id": "Enabled"
        }
      },
      "isDefault": true,
      "azureRegionHint": "westeurope",
      "runtimeEndpoints": {
        "microsoft.BusinessAppPlatform": "https://europe.api.bap.microsoft.com",
        "microsoft.CommonDataModel": "https://europe.api.cds.microsoft.com",
        "microsoft.PowerApps": "https://europe.api.powerapps.com",
        "microsoft.Flow": "https://europe.api.flow.microsoft.com",
        "microsoft.PowerAppsAdvisor": "https://europe.api.advisor.powerapps.com",
        "microsoft.ApiManagement": "https://management.EUR.azure-apihub.net"
      },
      "environmentFeatures": {
        "isOpenApiEnabled": false
      }
    },
    "displayName": "contoso (default)"
  }
]
```

- `[?name == '4be50206-9576-4237-8b17-36d8aadfaa36']` returns only the **first item** from the array as it matches on **4be50206-9576-4237-8b17-36d8aadfaa36**.
- `[?properties.displayName == 'Contoso Dev Environment']` would return the **first item** from the array as it matches on **Contoso Dev Environment**.
- `[?properties.provisioningState == 'Succeeded']` would return the **both items** from the array as both had provisioningState **Succeeded**.
- `[?starts_with(properties.displayName, 'Contoso')]` or `[?starts_with(displayName, 'Contoso')]` would return the **first item** of the array as it filters on the displayName for **Contoso** and each filter is case-sensitive.
- `[?ends_with(properties.azureRegionHint, 'europe')]` would return **both** items as it filters on **europe**.

!!! important
    All JMESPath queries are case sensitive

## Ordering the dataset

Besides filtering, there are several use cases where it makes sense to order the returned result set. Lets say you want to retrieve SharePoint Online user activity, something that can be achieved using the following command `m365 spo report activityuserdetail --period D7 --output json`. You then might want to filter, but perhaps you want to also sort the result set based on dates or activity. The returned result looks similar to the `json` sample:

```json
[
  {
    "Report Refresh Date": "2021-06-15",
    "User Principal Name": "garthf@contoso.com",
    "Is Deleted": "False",
    "Deleted Date": "",
    "Last Activity Date": "2020-07-07",
    "Viewed Or Edited File Count": "0",
    "Synced File Count": "0",
    "Shared Internally File Count": "0",
    "Shared Externally File Count": "0",
    "Visited Page Count": "0",
    "Assigned Products": "OFFICE 365 E3",
    "Report Period": "7"
  },
  {
    "Report Refresh Date": "2021-06-15",
    "User Principal Name": "sands@contoso.com",
    "Is Deleted": "False",
    "Deleted Date": "",
    "Last Activity Date": "",
    "Viewed Or Edited File Count": "152",
    "Synced File Count": "0",
    "Shared Internally File Count": "0",
    "Shared Externally File Count": "0",
    "Visited Page Count": "0",
    "Assigned Products": "OFFICE 365 E3",
    "Report Period": "7"
  },
  {
    "Report Refresh Date": "2021-06-15",
    "User Principal Name": "janets@contoso.com",
    "Is Deleted": "True",
    "Deleted Date": "2021-05-15",
    "Last Activity Date": "",
    "Viewed Or Edited File Count": "0",
    "Synced File Count": "0",
    "Shared Internally File Count": "0",
    "Shared Externally File Count": "0",
    "Visited Page Count": "0",
    "Assigned Products": "OFFICE 365 E3",
    "Report Period": "7"
  }
]
```

- `sort_by(@, &"Last Activity Date")` would return the result set with the first **Last Activity Date** on top. That means empty dates first.
- `reverse(sort_by(@, &"Last Activity Date"))` returns the result in reversed order, it thus shows the most recent last activity date on top.
- `reverse(sort_by(@, &"Viewed Or Edited File Count"))` return the user with the most edited items on top.
- `reverse(sort_by(@, &"Viewed Or Edited File Count"))[*]."User Principal Name` would sort and only return the **User Principal Name** property. The result is sorted to show the username ordered by the most edited files on top.
- `reverse(sort_by(@, &"Viewed Or Edited File Count")) | [0]."User Principal Name"` would sort and return the **User Principal Name** for the user with the most edited files. It thus only returns one name.
- `reverse(sort_by(@, &"Viewed Or Edited File Count")) | [?"Is Deleted" == 'False']."User Principal Name"` sorts by then **Viewed Or Edited File Count**, then filters out deleted users and finally returns the **User Principal Name**

Combining sorting and filtering makes for a powerful cross-platform way of presenting your data. You are not dependent on `PowerShell` or `Bash` to get the result you are looking for.

For complete list of filter options check out the [JMESPath Examples](https://jmespath.org/examples.html).
