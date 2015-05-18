import React from 'react'
import Router from 'react-router'
let {RouteHandler} = Router

import Nav from './nav.jsx!'
import Footer from './footer.jsx!'
import './app.metacss!'

export default class App extends React.Component {
  render() {
    return <div>
      <Nav />
      <RouteHandler />
      {/*<Footer />*/}
    </div>
  }
}
