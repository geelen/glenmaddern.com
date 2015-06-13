import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './pages.css!'
import articles from '../articles/index.jsx!'

export default class ArticlePage extends React.Component {
  render() {
    return articles[this.props.params.slug] || <h1 className={styles.error}>NOT FOUND</h1>
  }
}
