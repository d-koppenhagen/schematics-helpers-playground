import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  template,
  mergeWith
} from '@angular-devkit/schematics/';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';

export function playground(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const nonRootPathDefinition = 'foo/bar/'; // "./foo/bar" | "foo/bar/" work also
    const rootPathDefinition = ''; // "." | "./" work also
    console.log(relativePathToWorkspaceRoot(nonRootPathDefinition));
    // "../.."
    console.log(relativePathToWorkspaceRoot(rootPathDefinition));
    // "."

    const sourceTemplates = url('./files');
    return mergeWith(
      apply(
        sourceTemplates, [
          template({
            relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(nonRootPathDefinition),
          }),
        ]
      )
    );
  };
}
