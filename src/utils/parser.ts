import { Choice } from "../tokens/Choice";
import { Program } from "../tokens/Program";
import { Segment } from "../tokens/Segment";
import { Value } from "../tokens/Value";
import { Variable } from "../tokens/Variable";
import { VariableDefinition } from "../tokens/VariableDefinition";

export function parse(formalSyntax: string): Program {
  let program = new Program()

  const syntaxParts = formalSyntax.split(/\s+where\s+/)

  const mainDefinition = syntaxParts.shift()
  const variableSections = syntaxParts.join("\n")

  program.segment = parseSyntaxDefinition(mainDefinition)
  program.variables = parseVariableDefinitions(variableSections)

  return program;
}

function parseSyntaxDefinition(syntaxDefinition: (string | undefined)): Segment {
  if (syntaxDefinition === undefined) {
    throw new Error("Undefined syntax definition");
  }

  let root: Segment = new Segment()
  let parentSegment: Segment = root;
  let currentSegment: Segment | undefined = undefined;
  let currentChoice: Choice | undefined = undefined;

  for(let word of syntaxDefinition.split(/\s+/)) {
    if (isValueType(word)) {
      if (currentSegment === undefined) {
        currentSegment = new Segment();
      }
      currentSegment.parts.push(new Value(word));
    } else if (isOrKeyword(word)) {
      if (currentSegment === undefined) {
        throw new Error("Invalid syntax: found '|' with no preceeding segment");
      }

      if (currentChoice === undefined) {
        currentChoice = new Choice();
        parentSegment.parts.push(currentChoice);
      }

      currentChoice.options.push(currentSegment);
      currentSegment = undefined;
    } else if (isVariableUsage(word)) {
      if (currentSegment === undefined) {
        currentSegment = new Segment();
      }
      currentSegment.parts.push(new Variable(word, false));
    } else if (isOptionalVariableUsage(word)) {
      if (currentSegment === undefined) {
        currentSegment = new Segment();
      }
      currentSegment.parts.push(new Variable(word.slice(0, -1), true));
    } else if (isGroupStartBracket(word)) {
      currentChoice = new Choice()
      parentSegment.parts.push(currentChoice)
    } else if (isGroupEndBracket(word)) {
      if (currentChoice !== undefined) {
        if (currentSegment !== undefined) {
          currentChoice.options.push(currentSegment)
        }
        currentChoice = undefined
        currentSegment = parentSegment
      }
    } else if (isOptionalGroupEndBracket(word)) {
      if (currentChoice !== undefined) {
        if (currentSegment !== undefined) {
          currentChoice.options.push(currentSegment)
          currentChoice.optional = true
        }
        currentChoice = undefined
        currentSegment = parentSegment;
      }
    }
  }

  if (currentChoice !== undefined && currentSegment !== undefined) {
    currentChoice.options.push(currentSegment);
  }

  return root
}

function parseVariableDefinitions(variableDefinitions: string): VariableDefinition[] {
  const lines =  variableDefinitions.split("\n")
  let definitions: VariableDefinition[] = []

  for(let line of lines) {
    const parts = line.split(" = ");
    if (parts.length !== 2) {
      console.log(line)
    } else {
      const name = parts[0]
      const segment = parseSyntaxDefinition(parts[1])

      definitions.push(new VariableDefinition(name, segment))
    }
  }

  return definitions
}

function isVariableUsage(word: string): Boolean {
  return word.match(/^\<.*?\>$/) !== null
}

function isOptionalVariableUsage(word: string): Boolean {
  return word.match(/^\<.*?\>\?$/) !== null;
}

function isValueType(word: string): Boolean {
  return word.match(/^[a-zA-Z\-]+$/) !== null
}

function isOrKeyword(word: string): Boolean {
  return word === "|"
}

function isGroupStartBracket(word: string): Boolean {
  return word === "["
}

function isGroupEndBracket(word: string): Boolean {
  return word === "]"
}

function isOptionalGroupEndBracket(word: string): Boolean {
  return word === "]?"
}
