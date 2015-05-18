import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './home.metacss!'

export default class Home extends React.Component {
  render() {
    return <div>
      <header className={styles.header}>
        <h1 className={styles.h1}>
          My name is <span className={styles.me}>Glen Maddern</span> and
          I do<span className="t-type--semibold"> rad web stuff</span>
        </h1>
      </header>
      <main _layout="max960" _type="center">
        <section _layout="p3-1 small:p2-1">
          <h2 _after="hr" _type="upcase">Articles</h2>
        </section>
      </main>
    </div>
  }
}
