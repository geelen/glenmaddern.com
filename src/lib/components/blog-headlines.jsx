import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './blog-headlines.metacss!'

export default class BlogHeadlines extends React.Component {
  render() {
    let firstN = this.props.num ? this.props.items.slice(0, this.props.num) : this.props.items
    return <section className={styles.section}>
      <h2 className={styles.h2}>{this.props.name}</h2>
      {
        firstN.map(item => {
          return <Link to="Article" params={item.props} className={styles.a}>
            <h5 className={styles.h5}>{item.props.title}</h5>
            <span className={styles.span}>{item.props.strap}
              <span className={styles.unbroken}> - {item.props.date}</span>
            </span>
          </Link>
        })
      }
      {
        firstN.length < this.props.items.length ? <a className={styles.more} href="/articles">more...</a> : {}
      }
    </section>
  }
}
