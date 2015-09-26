import React from 'react'
import Router from 'react-router'
import routes from './routes.jsx!'
import '../styles/index'
let __hotReload = true, __generate

if ( typeof document !== 'undefined' ) {

  let mainElem = document.querySelector( 'main' )
  Router.run( routes, Router.HistoryLocation, ( Root ) => {
    React.render( React.createElement( Root ), mainElem )
  } )

  console.log( "Main rendered in " + Math.round( performance.now() ) / 1000 + "s" )
  console.log( "### DONE" )
} else {
  console.log( "YEAH BOI" )
  __generate = ( path ) => {
    return new Promise( ( resolve, reject )=> {
      Router.run( routes, path, ( Root ) => {
        if (/^\/slides/.exec(path)) {
          resolve(`<span class='⌚️⌚️⌚️'>Loading...</span>`)
        } else {
          resolve( React.renderToString( React.createElement( Root ) ) )
        }
      } )
    } )
  }
}
export { __hotReload, __generate }
