import { CustomIdentValue } from "./built-ins/CustomIdentValue";
import { NumberValue } from "./built-ins/NumberValue";
import { StringValue } from "./built-ins/StringValue";
import { TimeValue } from "./built-ins/TimeValue";
import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Program {
  public syntaxRoot!: Token
  public variables: VariableDefinition[]

  constructor() {
    this.variables = [
      new VariableDefinition("<custom-ident>", new CustomIdentValue()),
      new VariableDefinition("<number>", new NumberValue()),
      new VariableDefinition("<string>", new StringValue()),
      new VariableDefinition("<time>", new TimeValue())
    ]
  }

  value(): (string | null) {
    return this.syntaxRoot.value(this.variables)
  }
}
