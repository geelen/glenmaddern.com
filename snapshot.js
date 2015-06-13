var jspm = require( 'jspm' ),
  fs = require( 'fs' ),
  path = require( 'path' ),
  template = fs.readFileSync( 'src/200.html', "utf8" ),
  useref = require( 'node-useref' ),
  paths = (process.argv[2] || "/").split( " " ),
  mkdirp = require( 'mkdirp' )

jspm.import( 'css' ).then( function ( css ) {
  return jspm.import( 'lib/index' ).then( function ( yay ) {
    paths.forEach( function ( relPath ) {
      console.log( "Looking for " + relPath )
      return yay.__generate( relPath )
        .then( function ( markup ) {
          var replaced = useref( template, {
            style: function () {
              return "<style>" + css.default._cache._source.join( "\n" ) + "</style>";
            },
            markup: function () {
              return markup
            },
            jspm: function () {
              return "<script src='/bundle.js'></script>"
            }
          } )
          console.log( "Got " + relPath )
          var filename = "dist" + ((relPath === '/') ? '/index' : relPath) + ".html",
            dirname = path.dirname(filename)
          mkdirp.sync(dirname)
          fs.writeFileSync(filename, replaced[0])
          console.log( filename )
        } )
    } )
  } )
} )
