import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './article.metacss!'
import articles from '../articles/index'

import js2015 from '../articles/javascript-in-2015.jsx!'

export default class Article extends React.Component {
  parseMarkdown(html) {
    return html.replace(/<(\w+)/g, (match, capture) => `<${capture} class='${styles[capture] ||''}' `)
  }

  render() {
    let article = articles[this.props.params.key]
    return <div className={styles.outer}>
      <header className={styles.header}>
        <h1 className={styles.heading1}>{article.title}</h1>
        { article.strap ? <h2 className={styles.heading2}>{article.strap}</h2> : {}}
        { article.date ? <time className={styles.date} datetime={article.date}>{article.date}</time> : {}}
      </header>
      {js2015}
    </div>
  }
}
