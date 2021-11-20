import { TimeValue } from "./TimeValue";
import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Program {
  public syntaxRoot!: Token
  public variables: VariableDefinition[]

  constructor() {
    this.variables = [
      new VariableDefinition("<time>", new TimeValue())
    ]
  }

  value(): (string | null) {
    return this.syntaxRoot.value(this.variables)
  }
}
