import React from 'react'

import Nav from './nav.jsx!'
import Footer from './footer.jsx!'
import styles from './layout.css!'

export default class Layout extends React.Component {
  render() {
    return <div className={styles.body}>
      <Nav />
      {this.props.children}
      <Footer />
    </div>
  }
}
