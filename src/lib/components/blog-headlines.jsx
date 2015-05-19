import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './blog-headlines.metacss!'

export default class BlogHeadlines extends React.Component {
  render() {
    let slugs = Object.keys(this.props.items),
      firstN = this.props.num ? slugs.slice(0, this.props.num) : slugs
    return <section className={styles.section}>
      <h2 className={styles.h2}>{this.props.name}</h2>
      {
        firstN.map(slug => {
          let item = this.props.items[slug]
          return <a className={styles.a} href={`/articles/${slug}`}>
            <h5 className={styles.h5}>{item.title}</h5>
            <span className={styles.span}>{item.strap}
              <span className={styles.unbroken}> - {item.date}</span>
            </span>
          </a>
        })
      }
      {
        firstN.length < slugs.length ? <a className={styles.more} href="/articles">more...</a> : {}
      }
    </section>
  }
}
