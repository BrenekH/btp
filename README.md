# btp (BerylTimerPlugins)

Official plugin packager for the [Beryl timer](https://github.com/BrenekH/beryl#readme).

## Installation

With Node.js and NPM installed run `npm i -g btp`.

## Usage

### package

Running `btp package` will create a `.bipa` file with all of the contents of the current working directory (recursive).

If you wish to exclude any files from the generated file, a `.berylignore` file can put in the current working directory.
This file uses the `.gitignore` syntax for specifying which files should included and which should be excluded.
