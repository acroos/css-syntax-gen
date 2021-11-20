import { Token } from "../Token";
import { VariableDefinition } from "../VariableDefinition";

export class NumberValue extends Token {
  value(variables: VariableDefinition[]): string | null {
    return (Math.random() * 50).toFixed(1).toString();
  }
}
