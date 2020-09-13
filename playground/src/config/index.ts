import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspacePath, getWorkspace } from '@schematics/angular/utility/config';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // returns the path to the Angular configuration file
    // ('/angular.json' or probably `.angular.json` for older Angular projects)
    console.log(getWorkspacePath(tree));

    // returns the whole configuration object from the 'angular.json' file
    console.log(JSON.stringify(getWorkspace(tree), null, 2));
  };
}
