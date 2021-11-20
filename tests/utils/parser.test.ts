import "jest"
import * as fs from "fs"
import { Program } from "../../src/tokens/Program"
import { parse } from "../../src/utils/parser"

describe("parser", () => {
  // test("does not return null", () => {
  //   const prog = parse("a | b")
  //   expect(prog).toBeDefined()
  // })


  // describe("simple syntax", () => {
  //   const formalSyntax = "center | start | end | flex-start | flex-end";
  //   const program = parse(formalSyntax)

  // })

  describe("less simple syntax", () => {
    const buffer = fs.readFileSync(
      "/Users/austinroos/src/not-work/css-syntax-parser/css/align-content.syntax"
    );
    const formalSyntax = buffer.toString()
    const program = parse(formalSyntax)
    console.log(program)
  })
})
