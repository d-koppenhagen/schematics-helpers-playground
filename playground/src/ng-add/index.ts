import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

export function playground(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new RunSchematicTask('playground', { project: 'test-workspace' })
    );
    return tree;
  };
}
