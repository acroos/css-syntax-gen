import { Token } from "../Token";
import { VariableDefinition } from "../VariableDefinition";

export class TimeValue extends Token {
  value(variables: VariableDefinition[]): string | null {
    const randVal = Math.random()
    const unit = (randVal > 0.5) ? "s" : "ms"
    const value = (randVal > 0.5) ? (Math.random() * 10).toFixed(1) : (Math.random() * 1000).toFixed(0)
    const sign = (Math.random() > 0.5) ? "-" : ""

    return `${sign}${value}${unit}`
  }
}
