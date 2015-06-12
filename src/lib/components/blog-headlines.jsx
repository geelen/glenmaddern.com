import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import styles from './blog-headlines.css!'

export default class BlogHeadlines extends React.Component {
  render() {
    let firstN = this.props.num ? this.props.items.slice(0, this.props.num) : this.props.items
    return <section className={styles.section}>
      <h2 className={styles.h2}>{this.props.name}</h2>
      {
        firstN.map((item,i) => {
          return <Link to="Article" params={item.props} className={styles.a} key={i}>
            <h5 className={styles.h5}>{item.props.title}</h5>
            <span className={styles.span}>{item.props.strap}
              <span className={styles.unbroken}> - {item.props.date}</span>
            </span>
          </Link>
        })
      }
      {
        firstN.length < this.props.items.length ? <Link to={this.props.name} className={styles.more}>more...</Link> : {}
      }
    </section>
  }
}
