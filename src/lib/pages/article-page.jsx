import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './article-page.metacss!'
import articles from '../articles/index.jsx!'
let articlesBySlug = {}
articles.forEach(a => articlesBySlug[a.props.slug] = a)

export default class ArticlePage extends React.Component {
  render() {
    return articlesBySlug[this.props.params.slug] || <h1 className={styles.error}>NOT FOUND</h1>
  }
}
