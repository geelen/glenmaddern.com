import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import shared from './blog-headlines.metacss!'
import styles from './preview-list.metacss!'

export default class PreviewList extends React.Component {
  render() {
    let slugs = Object.keys(this.props.items),
      firstN = this.props.num ? slugs.slice(0, this.props.num) : slugs
    return <section className={shared.section}>
      <h2 className={shared.h2}>{this.props.name}</h2>

      <ol className={styles.outer}>{
        firstN.map(slug => {
          let item = this.props.items[slug]
          return <li className={styles.li}>
            <figure className={styles.figure}>
              { item.url ?
                <a className={styles.a} target='_blank' href={item.url}>
                  <img className={styles.img} src={`/assets/images/${item.image}`} />
                </a>
                : <img className={styles.img} src={`/assets/images/${item.image}`} />
              }
            </figure>
          </li>
        })
      }</ol>
    </section>
  }
}
