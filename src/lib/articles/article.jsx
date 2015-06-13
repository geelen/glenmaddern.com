import React from 'react'
import md from '../../markdown'

import styles from './article.css!'

export default class Article extends React.Component {
  render() {
    let children = typeof this.props.children === "object" ? this.props.children : [this.props.children]
    return <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{this.props.title}</h1>
        { this.props.strap ? <h2 className={styles.heading2}>{this.props.strap}</h2> : {}}
        { this.props.date ? <time className={styles.date} dateTime={this.props.date}>{this.props.date}</time> : {}}
      </header>
      {children.map( child => {
        return typeof child === "string" ?
          <div className={styles.markdown} dangerouslySetInnerHTML={{__html: child}}></div>
          : typeof child === "function" ? child( styles ) : child
      } )}
    </article>
  }
}
