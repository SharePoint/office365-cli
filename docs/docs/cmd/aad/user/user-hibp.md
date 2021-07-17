# aad user hibp

Allows you to retrieve all accounts that have been pwned with the specified username

## Usage

```sh
m365 aad user hibp [options]
```

## Options

`-n, --userName [userName]`
: The name of the user to retrieve information for.


`--apiKey, [apiKey]`
: Have I been pwned `API Key`. You can buy it from [https://haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)


`--domain, [domain]`
: Limit the returned breaches only contain results with the domain specified.


--8<-- "docs/cmd/_global.md"

## Remarks

If the user with the specified user name doesn't involved in any breach, you will get a `Good news — no pwnage found!` message.

If `API Key` is invalid, you will get a `Error: Request failed with status code 401` error.

## Examples

Check if user with user name _account-exists@hibp-integration-tests.com_ is in a data breach

```sh
m365 aad user hibp --userName account-exists@hibp-integration-tests.com --apiKey _YOUR-API-KEY_
```
Check if user with user name _account-exists@hibp-integration-tests.com_ is in a data breach against the domain specified

```sh
m365 aad user hibp --userName account-exists@hibp-integration-tests.com --apiKey _YOUR-API-KEY_ --domain adobe.com
```

## More information

- Have I been pwned API documentation: [https://haveibeenpwned.com/API/v3](https://haveibeenpwned.com/API/v3)
