var jspm = require( 'jspm' )
var path = "/"
var fs = require( 'fs' )
var template = fs.readFileSync( 'src/200.html', "utf8" )
var useref = require( 'node-useref' )

jspm.import( 'css' ).then( function ( css ) {
  return jspm.import( 'lib/index' ).then( function ( yay ) {
    //console.log( "yay" )
    //console.log( yay )
    return yay.__generate( path )
  } )
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
      console.log( replaced )
    } )
} )
