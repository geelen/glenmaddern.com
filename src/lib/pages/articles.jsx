import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import Layout from '../layout.jsx!'
import styles from './pages.css!'
import articles from '../articles/index'
import BlogHeadlines from '../components/blog-headlines.jsx!'

export default class Articles extends React.Component {
  render() {
    return <Layout>
      <div className={styles.main}>
        <BlogHeadlines name="Articles" items={articles}/>
      </div>
    </Layout>
  }
}
