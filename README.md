# sass-npm

A [SASS importer](https://github.com/sass/node-sass#importer--v200---experimental) that allows you to import SASS using an npm module name.

This allows you to keep your SASS files inside your frontend npm modules.

If you're using browserify, you probably want this!

## Contributing

I just wrote this because I needed it. Pull requests gladly accepted!

## Installation

	npm install sass-npm

## Usage

sass-npm currently just looks for `style.scss` inside the top level of a npm module to determine whether to load it. This is fine for me right now, but we could change this in future - let me know if you have suggestions!

In your sass file:

	// Since node_modules/npm-module-name/style.scss exists, this will be imported.
	@import "npm-module-name";

	// Since just-a-sass-file isn't an installed npm module, it will be imported as a regular SCSS file.
	@import "just-a-sass-file";

I normally use gulp-sass (which has the same 'importer' option as regular SASS)

		var gulp = require('gulp'),
			sass = require('gulp-sass'),
			sassNpm = require('sass-npm-import')();

Then, in your .pipe(sass()), add the importer as an option:

	.pipe(sass({
		paths: ['public/scss'],
		importer: sassNpm.importer,
	}))

## Author

Mike MacCana <mike@certsimple.com>
