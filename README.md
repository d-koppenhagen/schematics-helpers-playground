# Schematic Helpers Playground

This is a playground project related to my blog post [**Create Angular schematics with common helpers**](https://d-koppenhagen.de/blog/2020-09-angular-schematics-common-helpers) and contains all the examples I described there.

## Play around

This repo contains basically two sub-projects:

1. The actual Angular schematic playground project ([`./playground`](./playground))
2. An Angular workspace (example project) to run the schematic against an existing Angular workspace ([`./test-workspace`](./test-workspace))

To get all the things running, follow the steps below:

```bash
cd playground            # go into the schematics project
npm i                    # install / update dependencies
npm run build -- --watch # build the schematics and watch for changes
```

An then open another terminal / tab and run:

```bash
# install the schematics globally so the `schematics` command becomes available
npm i -g @angular-devkit/schematics-cli
cd test-workspace # go into the angular workspace
npm i             # install / update dependencies
# run the schematic 'playground' (see list below)
schematics ../playground/src/collection.json:playground
```

## The examples

All the example schematics are executed / build as described in the section above.
The examples are related to my blog post [**Create Angular schematics with common helpers**](https://d-koppenhagen.de/blog/2020-09-angular-schematics-common-helpers).

To execute and check a specific helper functions from the examples in the blog post, simply use the appropriate schematic name for execution (`collection.json:<NAME>`).
The Table below shows you an overview of the available examples:

| schematic name   | Description                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------|
| `playground`     | Just logs that everything works.                                                            |
| `dependencies`   | Helpers for dependency operations.                                                          |
| `insert`         | Helpers for insert operations.                                                              |
| `relative-path`  | A helper for determining the relative path to the project root.                             |
| `import`         | A helper for adding import statements.                                                      |
| `module`         | Modify `NgModule`s.                                                                         |
| `config`         | Work with then `angular.json` configuration.                                                |
| `workspace`      | A helper to retrieve a projects default path in the workspace.                              |
| `ng-add`         | Call another schematic.                                                                     |
| `ng-new`         | Execute `ng new` with predefined options and run other stuff and run the `ng-add` schematic |

> Running the schematics locally — by default — just changes on the virtual representation of the target Angular workspace.
> To apply the changes on the real workspace, you need to pass the flag `--debug=false` through the `schematics` command.

## Steps to set up this playground manually

```bash
mkdir schematics-helpers-playground
cd schematics-helpers-playground
npx @angular/cli new test-workspace --routing --style=css
npx @angular-devkit/schematics-cli blank --name=playground
cd playground
npm i --save @schematics/angular
cd ../test-workspace
ng g lib my-lib
```

