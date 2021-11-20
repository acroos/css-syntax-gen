import { Token } from "./Token";
import { VariableDefinition } from "./VariableDefinition";

export class Choice extends Token {
  public options: Token[]
  public optional: Boolean = false

  constructor(options?: Token[]) {
    super()
    this.options = options || []
  }

  value(variables: VariableDefinition[]): (string | null) {
    if (this.optional && Math.random() < 0.5) {
      return null
    }

    const randIndex = Math.floor(Math.random() * this.options.length)
    return this.options[randIndex].value(variables)
  }
}
