import { Segment } from "./Segment"

export class VariableDefinition {
  public name: string;
  public segment: Segment;

  constructor(name: string, segment: Segment) {
    this.name = name;
    this.segment = segment;
  }
}
