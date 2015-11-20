
var fs = require('fs'),
	path = require('path');

module.exports = function(options){
	options = options || {};

	// Log of 'debug' turned on
	var log = function(){}
	if ( options.debug ) {
		log = console.log.bind(console)
	}

	// See https://github.com/sass/node-sass#importer--v200---experimental
	var importer = function(url, file, done) {
		// look for modules installed through npm
		try {
			// See https://nodejs.org/api/globals.html#globals_require_resolve
			var newPath = path.join(path.dirname(require.resolve(url)), '/style.scss');
			log('checking for file', newPath)
			fs.exists(newPath, function(exists) {
				if ( exists ) {
					log('found file, yaay', url)
					return done({
						file:newPath
					});
				}
				log('found module but no style.scss', url)
				return done({
					file:url
				});
			});

		} catch(e) {
			// module could not be found, just return the original url
			log('did not file module', url)
			return done({
				file:url
			});
		}
	}

	return {
		importer: importer
	}
}

