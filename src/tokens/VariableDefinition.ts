import { Token } from "./Token";

export class VariableDefinition {
  public name: string;
  public token: Token;

  constructor(name: string, token: Token) {
    this.name = name;
    this.token = token;
  }
}
