import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'my-file.extension';
    tree.create(filePath, `const a = 'foo';`);

    // insert a new change
    const insertChange = new InsertChange(filePath, 16, '\nconst b = \'bar\';');
    const exportRecorder = tree.beginUpdate(filePath);
    exportRecorder.insertLeft(insertChange.pos, insertChange.toAdd);
    tree.commitUpdate(exportRecorder);
    console.log(tree.get(filePath)?.content.toString())
    // const a = 'foo';
    // const b = 'bar';

    tree.delete(filePath); // cleanup (if not running schematic in debug mode)
    return tree;
  };
}