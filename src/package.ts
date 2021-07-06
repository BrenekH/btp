import { createWriteStream, readdirSync, readFileSync, statSync } from "fs"
import ignore from "ignore"
import { join } from "path"
import { resolve } from "path/posix"
import yazl from "yazl"

interface IPackageJSON {
	name: string,
	version: string,
}

export function packageBIPA() {
	const pkgJsonContents = readFileSync("./package.json")
	const outputFilename = generateOutputFilename(pkgJsonContents.toString())

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

function generateOutputFilename(packageJSONString: string): string {
	let pkgJSON: IPackageJSON
	try {
		pkgJSON = JSON.parse(packageJSONString)
	} catch (e: any) {
		console.warn(e)
		return "output.bipa"
	}

	return `${pkgJSON.name}-${pkgJSON.version}.bipa`
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
