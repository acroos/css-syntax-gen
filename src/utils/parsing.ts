import { Grouping, GroupingType } from "../tokens/Grouping";
import { Program } from "../tokens/Program";
import { Token } from "../tokens/Token";
import { Value } from "../tokens/Value";
import { Variable } from "../tokens/Variable";
import { VariableDefinition } from "../tokens/VariableDefinition";

export function parse(syntax: String): Program {
  let program = new Program()

  const syntaxParts = syntax.split("where")
  const rootSyntax = syntaxParts.shift()

  program.syntaxRoot = parseSyntax(rootSyntax)
  if (syntaxParts.length > 0) {
    program.variables = parseVariables(syntaxParts.join("\n"))
  }

  return program
}

function parseSyntax(syntax: (String | undefined)): Token {
  if (syntax === undefined) {
    throw new Error("Error reading syntax")
  }

  const words = syntax.split(/\s+/)

  let rootGroup = new Grouping()
  let currentGroup: Grouping = rootGroup

  for(let word of words) {
    if(isValueType(word)) {
      currentGroup.addChild(new Value(word))
    } else if (isVariableUsage(word)) {
      currentGroup.addChild(new Variable(word, false))
    } else if (isOptionalVariableUsage(word)) {
      currentGroup.addChild(new Variable(word, true))
    } else if (isOrKeyword(word)) {
      currentGroup.type = GroupingType.Choice
    } else if (isGroupStartBracket(word)) {
      currentGroup = new Grouping()
      rootGroup.addChild(currentGroup)
    } else if (isGroupEndBracket(word)) {
      currentGroup = rootGroup
    } else if (isOptionalGroupEndBracket(word)) {
      currentGroup.optional = true
      currentGroup = rootGroup
    }
  }

  return rootGroup
}

function parseVariables(variableText: (String | undefined)): VariableDefinition[] {
  if (variableText === undefined) {
    return []
  }

  const lines = variableText.split("\n").filter(l => l !== "")
  let variables: VariableDefinition[] = []

  for(let line of lines) {
    const lineParts = line.split(" = ")
    if (lineParts.length !== 2) {
      throw new Error(`Invalid variable declaration ${line}`)
    }
    const name = lineParts[0]
    const token = parseSyntax(lineParts[1])

    variables.push(new VariableDefinition(name, token))
  }

  return variables
}

function isVariableUsage(word: string): Boolean {
  return word.match(/^\<.*?\>$/) !== null
}

function isOptionalVariableUsage(word: string): Boolean {
  return word.match(/^\<.*?\>\?$/) !== null
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
