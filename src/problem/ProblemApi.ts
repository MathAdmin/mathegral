export interface ProblemGenerator<C extends ProblemCategory> {
  key: string;
  name: string;
  description: string;
  generate(): C;
}

export interface ProblemCategory {
  accept(visitor: ProblemCategoryVisitor, args?: any): any;
}

export class EquationSolving implements ProblemCategory {
  constructor(readonly equation: string, readonly solution: string) {}
  accept(visitor: ProblemCategoryVisitor, args: any): any {
    return visitor.visitEquationSolving(this, args);
  }
}

export interface ProblemCategoryVisitor {
  visitEquationSolving: (problem: EquationSolving, args: any) => any;
}
