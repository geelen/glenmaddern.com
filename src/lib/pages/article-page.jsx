import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import Layout from '../layout.jsx!'
import styles from './pages.css!'
import articles from '../articles/index'
import Article from '../articles/article.jsx!'

export default class ArticlePage extends React.Component {
  render() {
    let article = articles[this.props.params.slug]
    return <Layout>{
      article ? <Article article={article}></Article> : <h1 className={styles.error}>NOT FOUND</h1>
    }</Layout>
  }
}
