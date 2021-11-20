import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Value extends Token {
  public rawValue: string

  constructor(value: string) {
    super()
    this.rawValue = value;
  }

  value(variables: VariableDefinition[]): (string | null) {
    return this.rawValue;
  }
}
