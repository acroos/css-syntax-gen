import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Variable extends Token {
  public name: string
  public optional: Boolean

  constructor(name: string, optional: Boolean) {
    super()
    this.name = name
    this.optional = optional
  }

  value(variables: VariableDefinition[]): (string | null) {
    if (this.optional && Math.random() < 0.5) {
      return null;
    }

    let definition = variables.find(v => v.name === this.name)
    if (definition === undefined) {
      throw new Error(`Unknown variable '${this.name}' used`)
    }

    return definition.segment.value(variables)
  }
}
