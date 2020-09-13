import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

export function playground(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const defaultPath = await createDefaultPath(tree, 'my-lib');
    console.log(defaultPath); // '/projects/my-lib/src/lib'
  };
}
