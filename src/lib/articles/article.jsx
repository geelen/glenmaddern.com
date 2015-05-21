import React from 'react'
import showdown from 'showdown'
let converter = new showdown.converter()

import styles from './article.metacss!'

export default class Article extends React.Component {
  render() {
    return <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.heading1}>{this.props.title}</h1>
        { this.props.strap ? <h2 className={styles.heading2}>{this.props.strap}</h2> : {}}
        { this.props.date ? <time className={styles.date} dateTime={this.props.date}>{this.props.date}</time> : {}}
      </header>
      <div className={styles.markdown} dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.children)}}></div>
    </article>
  }
}
