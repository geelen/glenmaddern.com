import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './blog-headlines.metacss!'

export default class BlogHeadlines extends React.Component {
  render() {
    let articleSlugs = Object.keys(this.props.articles),
      firstN = this.props.num ? articleSlugs.slice(0, this.props.num) : articleSlugs
    return <section className={styles.section}>
      <h2 className={styles.h2}>{this.props.name}</h2>
      {
        firstN.map(slug => {
          let article = this.props.articles[slug]
          return <a className={styles.a} href={`/articles/${slug}`}>
            <h5 className={styles.h5}>{article.title}</h5>
            <span className={styles.span}>{article.strap}
              <span className={styles.unbroken}> - {article.date}</span>
            </span>
          </a>
        })
      }
      {
        firstN.length < articleSlugs.length ? <a className={styles.more} href="/articles">more...</a> : {}
      }
    </section>
  }
}
