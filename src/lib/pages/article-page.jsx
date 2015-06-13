import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './pages.css!'
import articles from '../articles/index.jsx!'
import Article from '../articles/article.jsx!'

export default class ArticlePage extends React.Component {
  render() {
    let article = articles[this.props.params.slug]
    return article ? <Article article={article}></Article> : <h1 className={styles.error}>NOT FOUND</h1>
  }
}
