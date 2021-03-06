import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import Layout from '../layout.jsx!'
import styles from './pages.css!'
import articles from '../articles/index'
import portfolio from  './portfolio'
import BlogHeadlines from '../components/blog-headlines.jsx!'
import PreviewList from '../components/preview-list.jsx!'

export default class Home extends React.Component {
  render() {
    return <Layout>
      <div>
        <header className={styles.HomepageHeader}>
          <h1 className={styles.BigMessage}>
            My name is <span className={styles.me}>Glen Maddern</span> and
            I do<span className={styles.bold}> rad web stuff</span>
          </h1>
        </header>
        <div className={styles.main}>
          <BlogHeadlines name="Articles" items={articles} num={3}/>
          <PreviewList name="Projects" items={portfolio.projects} num={3}/>
          <PreviewList name="Talks" items={portfolio.talks} num={3}/>
          <PreviewList name="Work" items={portfolio.work} num={3}/>
        </div>
      </div>
    </Layout>
  }
}
