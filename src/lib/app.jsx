import React from 'react'
import Router from 'react-router'
let {RouteHandler} = Router

import './app.css!'

export default class App extends React.Component {
  render() {
    return <div>
      <h1>OHAI</h1>
      <RouteHandler/>
    </div>
  }
}
