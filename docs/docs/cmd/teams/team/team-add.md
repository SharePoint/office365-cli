# teams team add

Adds a new Microsoft Teams team

## Usage

```sh
m365 teams team add [options]
```

## Options

`-n, --name [name]`
: Display name for the Microsoft Teams team. Required if `template` not supplied

`-d, --description [description]`
: Description for the Microsoft Teams team. Required if `template` not supplied

`--template [template]`
: Template to use to create the team. If `name` or `description` are supplied, these take precedence over the template values

`--wait`
: Wait for the team to be provisioned before completing the command

--8<-- "docs/cmd/_global.md"

## Remarks

If you want to add a Team to an existing Microsoft 365 Group use the [aad o365group teamify](../../aad/o365group/o365group-teamify.md) command instead.

This command will return different responses based on the presence of the `--wait` option. If present, the command will return a `group` resource in the response. If not present, the command will return a `teamsAsyncOperation` resource in the response.

## Examples

Add a new Microsoft Teams team

```sh
m365 teams team add --name "Architecture" --description "Architecture Discussion"
```

Add a new Microsoft Teams team using a template from a file

```sh
m365 teams team add --name "Architecture" --description "Architecture Discussion" --template @template.json
```

Add a new Microsoft Teams team using a template and wait for the team to be provisioned

```sh
m365 teams team add --name "Architecture" --description "Architecture Discussion" --template @template.json --wait
```

## More information

- Get started with Teams templates: [https://docs.microsoft.com/MicrosoftTeams/get-started-with-teams-templates](https://docs.microsoft.com/MicrosoftTeams/get-started-with-teams-templates)
- group resource type: [https://docs.microsoft.com/graph/api/resources/group?view=graph-rest-1.0](https://docs.microsoft.com/graph/api/resources/group?view=graph-rest-1.0)
- teamsAsyncOperation resource type: [https://docs.microsoft.com/graph/api/resources/teamsasyncoperation?view=graph-rest-1.0](https://docs.microsoft.com/graph/api/resources/teamsasyncoperation?view=graph-rest-1.0)
