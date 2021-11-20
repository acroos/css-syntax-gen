import * as fs from "fs/promises"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { Segment } from "./src/tokens/Segment"

const valuePattern = /[A-Za-z\-]/

const main = async (args: string[]) => {
  const argv = await yargs(hideBin(args))
    .usage("Usage: $0 [options]")
    .options({
      f: { type: "string", alias: "file", demandOption: true, nargs: 1 }
    })
    .help("h")
    .alias("h", "help")
    .epilog("Copyright 2021 @acroos")
    .argv

  let formalSyntax: string
  try {
    const buffer = await fs.readFile(argv.f)
    formalSyntax = buffer.toString()
  } catch {
    console.log(`Could not read file ${argv.f}`)
    process.exit(1)
  }

  const rawTokens = formalSyntax.split(/\s+/)

  console.log(rawTokens)
}

main(process.argv)
