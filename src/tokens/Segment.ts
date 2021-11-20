import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Segment extends Token {
  public parts: Token[]

  constructor(parts?: Token[]) {
    super()
    this.parts = parts || []
  }

  value(variables: VariableDefinition[]): (string | null) {
    return this.parts.map(p => p.value(variables)).filter(p => p !== null).join(" ");
  }
}
