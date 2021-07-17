## Available settings

Following is the list of configuration settings available in CLI for Microsoft 365.

Setting name|Definition|Default value
------------|----------|-------------
`errorOutput`|Defines if errors should be written to `stdout` or `stderr`|`stderr`
`output`|Defines the default output when issuing a command|`text`
`printErrorsAsPlainText`|When output mode is set to `json`, print error messages as plain-text rather than JSON|`true`
`showHelpOnFailure`|Automatically display help when executing a command failed|`true`
`autoOpenBrowserOnLogin`|Automatically open the browser to <https://aka.ms/devicelogin> after running `m365 login` command in device code mode|`false`