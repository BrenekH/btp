#!/usr/bin/env node
import { Command } from "commander"

import { packageBIPA } from "./package"

const program = new Command()

program.command("package").description("package current directory into a Beryl plugin").action(packageBIPA)

program.parse(process.argv)
