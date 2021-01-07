## Vue Storefront Pull Request Github Action

> This Github Action provides special flow to check your eCommerce integration with Vue Storefront.
> Although you can use it with any kind of Node.js app - if the flow suits, of course. Enjoy.

What's included:

- running tests with **Jest** (default)
- checking tests coverage
- checking performance with **Lighthouse**, running audit
- reporting tests coverage and Lighthouse audit

### Configuration

By default action will run all the processes. However, you can decide which process should be executed. At the same time you can run only tests or just skip the reports. Follow the configuration inputs and workflow examples to fit action to your needs.

#### Inputs

Here's a list of inputs that you can use in/with your workflows. Most of them are predefined, you don't have to provide them by definition. Although you can customize your action by defining your own input values.

| Name                         | Description                                                       | Default                 | Required   | Type    |
|------------------------------|-------------------------------------------------------------------|-------------------------|------------|---------|
| test_command                 | Tests running command                                             | `yarn test`             | true       | string  |
| test_disabled                | Tests and coverage check will be disabled                         | `false`                 | false      | boolean |
| test_failed                  | Action will fail below this coverage percentage value             | 90                      | false      | number  |
| test_report                  | Tests coverage will be reported as a PR comment                   | `true`                  | false      | boolean |
| test_report_comment_id       | Tests coverage will be reported as a PR comment (specific)        | `false`                 | false      | number |
| lighthouse_urls              | List of URLs for Lighthouse audit                                 | `http://localhost:4000` | true       | string  |
| lighthouse_report            | Lighthouse audit will be reported as a PR comment                 | `true`                  | false      | boolean |
| lighthouse_report_comment_id | Lighthouse audit will be reported as a PR comment (specific)      | `false`                 | false      | number |
| github_token                 | Github Token (required for reports)                               |                         | true/false | string  |

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
        uses: vuestorefront/github-actions@main/vsf-pull-request
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

With reports disabled.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@main/vsf-pull-request
    with:
      test_report: false
      lighthouse_report: false
```

With tests disabled.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@main/vsf-pull-request
    with:
      test_disabled: true
```

With custom test runner.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@main/vsf-pull-request
    with:
      test_command: npx ava
```

With multiple lighthouse page audit.

```yaml
...
  - name: run action processes
    uses: vuestorefront/github-actions@main/vsf-pull-request
    with:
      lighthouse_urls: https://your-first-url.com, https://your-second-url.com
```

### Reporting

As you probably noticed you can enable/disable reports for the tests coverage and performance checks. However, there are some additional options to control them.
        
* add `report:off` or `report:disabled` label to your PR (issue) to disable reports during the development process and remove to run them just before the merge or whenever you want. 
* use `test_report_comment_id` or `lighthouse_report_comment_id` inputs to display report always in the same comment (example below)

```yaml
...
  - name: run action processes       
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      lighthouse_urls: http://localhost:3000
      test_report_comment_id: 123456789
      lighthouse_report_comment_id: 123456789
```

**Tip**: You can get comment `id` by clicking the comment hour - the number will appear in the URL. Unfortunately this way workflow that will be applied for the other pull requests will send reports to the specific comment. To avoid that you can create new issue called `Reports`, pin it and add a new comments for the reports. Now you will get your reports always in the same place :tada: . 

### Contribution

Hey! Fill free to create some issue with bugfix report or pull request with new functionality. Maybe you would like to add some additional, platform specific checks? Go for it. As always we are waiting for your contribution. 

**Simple TODO list**:
* unit tests
* new features?
