import { VariableDefinition } from "./VariableDefinition";

export abstract class Token {
  abstract value(variables: VariableDefinition[]) : (string | null);
}
