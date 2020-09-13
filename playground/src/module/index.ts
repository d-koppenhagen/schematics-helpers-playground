import * as ts from 'typescript';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics/';
import {
  addDeclarationToModule,
  addImportToModule,
  addExportToModule,
  addProviderToModule,
  addBootstrapToModule,
  addRouteDeclarationToModule
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function playground(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const modulePath = 'app.module.ts';
    const moduleContent = `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

const myRoutes = [
  { path: 'foo', component: FooComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(myRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;
    tree.create(modulePath, moduleContent);

    const source = ts.createSourceFile(
      modulePath,
      moduleContent,
      ts.ScriptTarget.Latest,
      true
    );
    const updateRecorder = tree.beginUpdate(modulePath);

    const declarationChanges = addDeclarationToModule(
      source,
      modulePath,
      'DashboardComponent',
      './dashboard.component'
    ) as InsertChange[];
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    const exportChanges = addExportToModule(
      source,
      modulePath,
      'FooModule',
      './foo.module'
    ) as InsertChange[];
    for (const change of exportChanges) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    const importChanges = addImportToModule(
      source,
      modulePath,
      'BarModule',
      './bar.module'
    ) as InsertChange[];
    for (const change of importChanges) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    const providerChanges = addProviderToModule(
      source,
      modulePath,
      'MyProvider',
      './my-provider.ts'
    ) as InsertChange[];
    for (const change of providerChanges) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    const bootstrapChanges = addBootstrapToModule(
      source,
      modulePath,
      'MyComponent',
      './my.component.ts'
    ) as  InsertChange[];
    for (const change of bootstrapChanges) {
      if (change instanceof InsertChange) {
        updateRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    const change = addRouteDeclarationToModule(
      source,
      './src/app',
      `{ path: 'bar', component: BarComponent }`
    ) as InsertChange;
    updateRecorder.insertLeft(change.pos, change.toAdd);

    tree.commitUpdate(updateRecorder);
    console.log(tree.get(modulePath)?.content.toString())

    return tree;
  };
}