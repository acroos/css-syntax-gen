import * as fs from "fs/promises"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { parse } from "./src/utils/parser"

const main = async (args: string[]) => {
  const argv = await yargs(hideBin(args))
    .usage("Usage: $0 [options]")
    .options({
      n: { type: "number", alias: "number", demandOption: true, nargs: 1}
    })
    .help("h")
    .alias("h", "help")
    .epilog("Copyright 2021 @acroos")
    .argv

  const files = await fs.readdir("css/")
  let fileNames: string[] = []

  while (fileNames.length < argv.n) {
    let name = files[Math.floor(Math.random() * files.length)];
    if (!fileNames.includes(name)) {
      fileNames.push(name);
    }
  }

  fileNames.forEach(async fileName => {
    const name = fileName.split(".")[0]
    const value = await generateValue(fileName)
    console.log(`${name}: ${value}`)
  });
}

async function generateValue(fileName: string): Promise<(string | null)> {
  let formalSyntax: string;
  const path = `css/${fileName}`;
  try {
    const buffer = await fs.readFile(path);
    formalSyntax = buffer.toString();
  } catch {
    console.log(`Could not read file ${path}`);
    process.exit(1);
  }

  return parse(formalSyntax).value()
}

main(process.argv)
