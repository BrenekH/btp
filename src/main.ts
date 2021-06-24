#!/usr/bin/env node
import { Command } from "commander"

import { packageBIPA } from "./package"

console.log("Thank you for taking a look at BTP. Unfortunately, there is no functionality to speak of. If you want to help add it, checkout github.com/BrenekH/btp. You may also be interested in checking out the main project, Beryl (github.com/BrenekH/beryl).\n\n")

const program = new Command()

program.command("package").description("package current directory into a Beryl plugin").action(packageBIPA)

program.parse(process.argv)
