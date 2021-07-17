# cli config set

Sets CLI for Microsoft 365 configuration options

## Usage

```sh
m365 cli config set [options]
```

## Options

`-k, --key <key>`
: Config key to specify. Allowed values: `errorOutput,output,printErrorsAsPlainText,showHelpOnFailure,autoOpenBrowserOnLogin`

`-v, --value <value>`
: Config value to set

--8<-- "docs/cmd/_global.md"

--8<-- "docs/_clisettings.md"

## Examples

Configure CLI to automatically display help when executing a command failed

```sh
m365 cli config set --key showHelpOnFailure --value true
```

Configure the default CLI output to JSON

```sh
m365 cli config set --key output --value json
```

## More information

- [Configuring the CLI for Microsoft 365](../../../user-guide/configuring-cli.md)
