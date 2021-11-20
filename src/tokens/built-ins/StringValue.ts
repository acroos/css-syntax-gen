import { randomString } from "../../utils/random";
import { Token } from "../Token";
import { VariableDefinition } from "../VariableDefinition";

export class StringValue extends Token {
  value(variables: VariableDefinition[]): string | null {
    return randomString(Math.round(Math.random() * 32));
  }
}
