import { readFileSync } from 'fs';
import { parse } from 'recast';
import ts from 'typescript';

export const convertToAst = (dir: string) => {
  const node = ts.createSourceFile(
    'analyzt.ts',
    readFileSync(dir, 'utf8'),
    ts.ScriptTarget.Latest,
  );

  const imports = {};

  node.forEachChild((child) => {
    if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') {
      const ast = parse(child.getText(node)).program.body[0];
      const source = ast.source.value;
      imports[source] = 1;
    }
  });

  return imports;
};
