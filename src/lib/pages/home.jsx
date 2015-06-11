import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './pages.css!'
//import articles from '../articles/index.jsx!'
//import portfolio from  './portfolio.jsx!'
//import BlogHeadlines from '../components/blog-headlines.jsx!'
//import PreviewList from '../components/preview-list.jsx!'

export default class Home extends React.Component {
  render() {
    return <div>
      <header className={styles.HomepageHeader}>
        <h1 className={styles.BigMessage}>
          My name is <span className={styles.me}>Glen Maddern</span> and
          I do<span className={styles.bold}> rad web stuff</span>
        </h1>
      </header>
      <div className={styles.main}>
      </div>
    </div>
      //<BlogHeadlines name="Articles" items={articles} num={3}/>
      //<PreviewList name="Projects" items={portfolio.projects} num={3}/>
      //<PreviewList name="Talks" items={portfolio.talks} num={3}/>
      //<PreviewList name="Work" items={portfolio.work} num={3}/>
  }
}
