import { readdirSync, readFileSync, statSync } from "fs"
import ignore from "ignore"
import { join } from "path"

export function packageBIPA() {
	const filesToAdd = ignore().add(readFileSync("./.berylignore").toString()).filter(getAllFiles("."))

	console.log(filesToAdd)
}

function getAllFiles(dirPath: string, passedArrayOfFiles?: string[]): string[] {
	let files = readdirSync(dirPath)

	let arrayOfFiles: string[] = []
	if (passedArrayOfFiles !== undefined) {
		arrayOfFiles = passedArrayOfFiles
	}

	files.forEach(function(file) {
		if (statSync(dirPath + "/" + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
		} else {
			arrayOfFiles.push(join(dirPath, "/", file))
	}
	})

	return arrayOfFiles
}
