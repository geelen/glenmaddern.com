import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './pages.metacss!'
import articles from '../articles/index.jsx!'
import BlogHeadlines from '../components/blog-headlines.jsx!'

export default class Articles extends React.Component {
  render() {
    return <div className={styles.main}>
      <BlogHeadlines name="Articles" items={articles}/>
    </div>
  }
}
