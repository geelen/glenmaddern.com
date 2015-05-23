import React from 'react'
import Router from 'react-router'
let {RouteHandler} = Router

import Nav from './nav.jsx!'
import Footer from './footer.jsx!'
import styles from './app.metacss'

export default class App extends React.Component {
  render() {
    return <div className={styles.body}>
      <Nav />
      <RouteHandler />
      <Footer />
    </div>
  }
}
