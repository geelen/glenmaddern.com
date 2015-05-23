import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './nav.metacss'

export default class Nav extends React.Component {
  render() {
    return <nav className={styles.nav}>
      <h1 className={styles.name}>
        <Link to="Home" className={styles.home}>Glen Maddern</Link>
      </h1>
      <ul className={styles.list}>
        <li className={styles.li}>
          <Link to="Articles" className={styles.navlinks}>Articles</Link>
        </li>
        <li className={styles.li}>
          <Link to="ListPage" params={{page: "projects"}} className={styles.navlinks}>Projects</Link>
        </li>
        <li className={styles.li}>
          <Link to="ListPage" params={{page: "talks"}} className={styles.navlinks}>Talks</Link>
        </li>
        <li className={styles.li}>
          <Link to="ListPage" params={{page: "work"}} className={styles.navlinks}>Work</Link>
        </li>
      </ul>
    </nav>
  }
}
