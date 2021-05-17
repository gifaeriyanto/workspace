import { readFileSync } from 'fs';
import ts from 'typescript';
import j from 'jscodeshift';

interface ConvertToAstResult {
  [key: string]: number | string;
}

export const convertToAst = (dir: string): ConvertToAstResult => {
  const node = ts.createSourceFile(
    'analyze.ts',
    readFileSync(dir, 'utf8'),
    ts.ScriptTarget.ES2015,
    true,
    ts.ScriptKind.JS,
  );

  const imports = {};

  let root = j.withParser('tsx')('');
  try {
    root = j.withParser('tsx')(node.getText());
  } catch (error) {
    imports['error'] = error.message as string;
  }

  const importSelector = root.find(j.ImportDeclaration);
  importSelector.forEach((p) => {
    if (typeof p.node.source.value === 'string') {
      imports[p.node.source.value] = 1;
    }
  });

  const requireSelector = root.find(j.VariableDeclaration, {
    declarations: [
      {
        init: {
          callee: {
            name: 'require',
          },
        },
      },
    ],
  });
  requireSelector.forEach((p) => {
    p.node.declarations.every((value) => {
      if (
        value.type === 'VariableDeclarator' &&
        value.id.type === 'Identifier'
      ) {
        imports[value.id.name] = 1;
      }
    });
  });

  // const requireExpressionSelector = root.find(j.ExpressionStatement, {
  //   expression: {
  //     callee: {},
  //   },
  // });
  // requireExpressionSelector
  //   ?.get('require')
  //   ?.node.expression?.callee?.object?.arguments?.forEach((arg) => {
  //     imports[arg.value] = 1;
  //   });
  // requireExpressionSelector.forEach((p) => {
  //   p.node.expression.type;
  //   // if (p.node.expression.type === 'CallExpression') {
  //   //   if (p.node.expression.callee.type === 'MemberExpression') {
  //   //     if (p.node.expression.callee.object.type === 'CallExpression') {

  //   //     };
  //   //   }
  //   // }
  // });

  return imports;
};
