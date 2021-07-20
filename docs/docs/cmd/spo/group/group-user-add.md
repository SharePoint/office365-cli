# spo group user add

Add a user or multiple users to SharePoint Group

## Usage

```sh
m365 spo group user add [options]
```

## Options

`-u, --webUrl <webUrl>`
: URL of the site where the SharePoint group is available

`--groupId <groupId>`
: Id of the SharePoint Group to which user needs to be added

`--userName <userName>`
: User's UPN (user principal name, eg. megan.bowen@contoso.com). If multiple users needs to be added, they have to be comma separated (ex. megan.bowen@contoso.com,alex.wilber@contoso.com)

--8<-- "docs/cmd/_global.md"

## Examples

Add a user to the SharePoint group with id _5_ available on the web _https://contoso.sharepoint.com/sites/SiteA_

```sh
m365 spo group user add --webUrl https://contoso.sharepoint.com/sites/SiteA --groupId 5 --userName "Alex.Wilber@contoso.com"
```

Add multiple users to the SharePoint group with id _5_ available on the web _https://contoso.sharepoint.com/sites/SiteA_

```sh
m365 spo group user add --webUrl https://contoso.sharepoint.com/sites/SiteA --groupId 5 --userName "Alex.Wilber@contoso.com, Adele.Vance@contoso.com"
```
