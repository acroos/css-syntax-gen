import { Segment } from "./Segment";
import { VariableDefinition } from "./VariableDefinition";

export class Program {
  public segment: Segment
  public variables: VariableDefinition[]

  constructor() {
    this.segment = new Segment()
    this.variables = []
  }

  value(): (string | null) {
    return this.segment.value(this.variables)
  }
}
