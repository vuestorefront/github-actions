## Vue Storefront eCommerce Check Action

> This Github Action provides special flow to check your eCommerce integration with Vue Storefront.
> Although you can use it with any kind of Node.js app - if the flow suits, of course. Enjoy.

What's included:

- running tests with **Jest** (default)
- checking tests coverage
- checking performance with **Lighthouse**, running audit
- reporting tests coverage and Lighthouse audit

### Configuration

By default action will run all the processes. However, you can decide which process should be executed. At the same time you can run only tests or just skip the reports. Follow the configuration inputs and workflow examples to fit action to you needs.

#### Inputs

Here's a list of inputs that you can use in/with your workflows. Most of them are predefined, you don't have to provide them by definition. Although you can customize your action by defining your own input values.

| Name              | Description                                            | Default               | Required   | Type    |
|-------------------|--------------------------------------------------------|-----------------------|------------|---------|
| test_command      | Tests running command                                  | `yarn test`           | true       | string  |
| test_disabled     | Tests check will be disabled                           | `false`                 | false      | boolean |
| test_failed       | Tests failing with this percentage value               | 50                   | false      | number  |
| test_report       | Tests coverage will be reported as a PR comment        | `true`                  | false      | boolean |
| lighthouse_urls   | List of URLs for Lighthouse audit                      | `http://localhost:4000` | true       | string  |
| lighthouse_report | Lighthouse audit will be reported as a PR comment      | `true`                  | false      | boolean |
| github_token      | Github Token (required for reports)                    |                     | true/false | string  |

**Improratnt**. This Github action has ability to generate some fancy reports as a PR comments (images below). If you want to generate them you'll need a `Github Token`. You can generate it [here](https://github.com/settings/tokens). Remember to pass this token as a secret. Do not store any sensitive data in your code.

### Previews 

Lighthouse audit report.

![Vue Storefront Github Action](https://p89.f2.n0.cdn.getcloudapp.com/items/04uNK09m/Zrzut%20ekranu%202020-12-3%20o%2001.30.50.png "Vue Storefront Github Action")

Tests coverage report.

![Vue Storefront Github Action](https://p89.f2.n0.cdn.getcloudapp.com/items/P8umRg0o/Zrzut%20ekranu%202020-12-3%20o%2001.31.19.png "Vue Storefront Github Action")

### Workflows

Here you can find some example workflows which you can use with your app. You can also define your own workflow and just use our action as a part of it. Fill free to make some changes.

```yaml
name: Vue Storefront Pull Request

on: [push]

jobs:
  vsf:
    name: Pull Request
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12]

    steps:
      - uses: actions/checkout@master
        
      - name: use node ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
          
      - name: install dependencies
        run: npm install

      - name: run action processes
        uses: vuestorefront/github-actions@master/vsf-ecommerce-pull-request
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

With reports disabled.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@master/vsf-ecommerce-pull-request
    with:
      test_report: false
      lighthouse_report: false
```

With test disabled.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@master/vsf-ecommerce-pull-request
    with:
      test_disabled: true
```

With custom test runner.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@master/vsf-ecommerce-pull-request
    with:
      test_command: npx ava
```

With multiple lighthouse page audit.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@master/vsf-ecommerce-pull-request
    with:
      lighthouse_urls: https://your-first-url.com, https://your-second-url.com
```

### Contribution

Hey! Fill free to create some issue with bugfix report or pull request with new functionality. Maybe you would like to add some additional, platform specific checks? Go for it. As always we are waiting for your contribution. 

**Simple TODO list**:
* unit tests
* new features?
