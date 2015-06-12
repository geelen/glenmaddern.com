import React from 'react'
import showdown from 'showdown'
let converter = new showdown.converter()

import styles from './article.css!'

export default class Article extends React.Component {
  render() {
    let children = typeof this.props.children === "string" ? [this.props.children] : this.props.children
    return <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{this.props.title}</h1>
        { this.props.strap ? <h2 className={styles.heading2}>{this.props.strap}</h2> : {}}
        { this.props.date ? <time className={styles.date} dateTime={this.props.date}>{this.props.date}</time> : {}}
      </header>
      {children.map(child => {
        return typeof child === "string" ?
          <div className={styles.markdown} dangerouslySetInnerHTML={{__html: converter.makeHtml(child)}}></div>
          : child
      })}
    </article>
  }
}
