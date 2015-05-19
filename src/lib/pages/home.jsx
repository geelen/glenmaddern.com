import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './home.metacss!'
import articles from '../articles/index'
import BlogHeadlines from '../components/blog-headlines.jsx!'

export default class Home extends React.Component {
  render() {
    return <div>
      <header className={styles.header}>
        <h1 className={styles.h1}>
          My name is <span className={styles.me}>Glen Maddern</span> and
          I do<span className="t-type--semibold"> rad web stuff</span>
        </h1>
      </header>
      <div className={styles.main}>
        <BlogHeadlines name="Articles" articles={articles} num={3}/>
      </div>
    </div>
  }
}
