import React from 'react'
import showdown from 'showdown'
let converter = new showdown.converter()

import styles from './abstract-article.metacss!'

export default class AbstractArticle extends React.Component {
  render() {
    return <article className={styles.markdown} dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.children)}}></article>
  }
}
