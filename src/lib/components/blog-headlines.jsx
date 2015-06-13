import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './blog-headlines.css!'

export default class BlogHeadlines extends React.Component {
  render() {
    let slugs = Object.keys(this.props.items)
    let firstN = this.props.num ? slugs.slice(0, this.props.num) : slugs
    return <section className={styles.section}>
      <h2 className={styles.h2}>{this.props.name}</h2>
      {
        firstN.map((key,i) => {
          let item = this.props.items[key]
          return <Link to="Article" params={{slug: key}} className={styles.a} key={i}>
            <h5 className={styles.h5}>{item.title}</h5>
            <span className={styles.span}>{item.strap}
              <span className={styles.unbroken}> - {item.date}</span>
            </span>
          </Link>
        })
      }
      {
        firstN.length < slugs.length ? <Link to={this.props.name} className={styles.more}>more...</Link> : {}
      }
    </section>
  }
}
