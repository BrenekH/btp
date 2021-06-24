import { createWriteStream, readdirSync, readFileSync, statSync } from "fs"
import ignore from "ignore"
import { join } from "path"
import { resolve } from "path/posix"
import yazl from "yazl"

export function packageBIPA() {
	const outputFilename = "output.bipa" // TODO: Auto-generate a more descriptive filename

	const filesToAdd = ignore()
		.add(readFileSync("./.berylignore").toString())
		.add(outputFilename) // Ignore our output file, even if it isn't ignored in .berylignore
		.filter(getAllFiles("."))

	const zip = new yazl.ZipFile()
	filesToAdd.forEach((filename) => {
		zip.addFile(resolve(".", filename), filename)
	})

	zip.outputStream.pipe(createWriteStream(outputFilename)).on("close", function() {
		console.log(`Successfully wrote ${outputFilename}`)
	});

	zip.end()
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
