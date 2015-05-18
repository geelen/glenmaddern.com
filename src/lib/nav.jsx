import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './nav.metacss!'

export default class Nav extends React.Component {
  render() {
    return <nav className={styles.nav} _flex="align-center" _layout="p1 max960" _type="upcase small2 lh1.4">
      <h1 _flex-child="grow1" _type="semibold">
        <Link to="Home" _link="invisible">Glen Maddern</Link>
      </h1>
      <ul _flex="align-center wrap justify-end">
        <li _layout="pl1">
          <Link to="Articles" _link="subtle">Articles</Link>
        </li>
        <li _layout="pl1"><a href="/projects" _link="subtle">Projects</a></li>
        <li _layout="pl1"><a href="/talks" _link="subtle">Talks</a></li>
        <li _layout="pl1"><a href="/work" _link="subtle">Work</a></li>
      </ul>
    </nav>
  }
}
