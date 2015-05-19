import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './nav.metacss!'

export default class Nav extends React.Component {
  render() {
    console.log(styles)
    return <nav className={styles.nav}>
      <h1 className={styles.h1}>
        <Link to="Home" className={styles.home}>Glen Maddern</Link>
      </h1>
      <ul className={styles.list}>
        <li className={styles.li}>
          <Link to="Articles" className={styles.navlinks}>Articles</Link>
        </li>
        <li className={styles.li}>
          <a className={styles.navlinks} href="/projects">Projects</a>
        </li>
        <li className={styles.li}>
          <a className={styles.navlinks} href="/talks">Talks</a>
        </li>
        <li className={styles.li}>
          <a className={styles.navlinks} href="/work">Work</a>
        </li>
      </ul>
    </nav>
  }
}
