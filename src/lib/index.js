import React from 'react'
import Router from 'react-router'
import routes from './routes.jsx!'
import '../styles/index'
let __hotReload = true, __generate

if ( typeof document !== 'undefined' ) {

  let mainElem = document.querySelector( 'main' )
  Router.run( routes, Router.HistoryLocation, ( Root ) => {
    if ( navigator.userAgent.match( /phantomjs/i ) ) {
      mainElem.innerHTML = React.renderToString( React.createElement( Root ) )
    } else {
      React.render( React.createElement( Root ), mainElem )
    }
  } )

  console.log( "Main rendered in " + Math.round( performance.now() ) / 1000 + "s" )
  console.log( "### DONE" )
} else {
  console.log( "YEAH BOI" )
  __generate = ( path ) => {
    return new Promise( ( resolve, reject )=> {
      console.log( "see here" )
      Router.run( routes, path, ( Root ) => {
        resolve( React.renderToString( React.createElement( Root ) ) )
      } )
    } )
  }
}
export { __hotReload, __generate }
