import { Token } from "./Token"
import { VariableDefinition } from "./VariableDefinition"

export enum GroupingType {
  Choice,
  Segment
}

export class Grouping extends Token {
  public children: Token[] = []
  public optional: Boolean = false
  public type: GroupingType = GroupingType.Segment

  addChild(token: Token): void {
    this.children.push(token)
  }

  value(variables: VariableDefinition[]) {
    if (this.type === GroupingType.Choice) {
      const randIndex = Math.floor(Math.random() * this.children.length);
      return this.children[randIndex].value(variables);
    } else {
      return this.children
        .map((p) => p.value(variables))
        .filter((p) => p !== null)
        .join(" ");
    }
  }
}
