import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './pages.metacss!'
import articles from '../articles/index.jsx!'
import projects from '../projects/index'
import BlogHeadlines from '../components/blog-headlines.jsx!'
import PreviewList from '../components/preview-list.jsx!'

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
        <BlogHeadlines name="Articles" items={articles} num={3}/>
        <PreviewList name="Projects" items={projects} num={3}/>
      </div>
    </div>
  }
}
