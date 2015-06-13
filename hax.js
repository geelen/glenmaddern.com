var jspm = require( 'jspm' )
var path = "/"

jspm.import( 'css' ).then( function ( css ) {
  return jspm.import( 'lib/index' ).then( function ( yay ) {
    console.log( "yay" )
    console.log( yay )
    return { css: css, html: yay.__generate( path ) }
  } )
} ).then( function ( ok ) {
  console.log( "ok!" )
  console.log( ok )
  console.log(ok.css.default._cache._source.join( "\n" ))
} )
