import * as ts from 'typescript';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const filePath = 'some-file.ts';
    const fileContent = `import { Foo } from 'foo';
const bar = 'bar;
`;
    tree.create(filePath, fileContent);
    const source = ts.createSourceFile(
      filePath,
      fileContent,
      ts.ScriptTarget.Latest,
      true
    );
    const updateRecorder = tree.beginUpdate(filePath);
    const change = insertImport(source, filePath, 'Bar', './bar', true);
    if (change instanceof InsertChange) {
      updateRecorder.insertRight(change.pos, change.toAdd);
    }
    tree.commitUpdate(updateRecorder);
    console.log(tree.get(filePath)?.content.toString())
    return tree;
  };
}