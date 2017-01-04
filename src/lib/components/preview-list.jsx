import React from 'react'
import Router from 'react-router'
let Link = Router.Link

import shared from './blog-headlines.css!'
import styles from './preview-list.css!'

export default class PreviewList extends React.Component {
  render() {
    let slugs = Object.keys(this.props.items),
      firstN = this.props.num ? slugs.slice(0, this.props.num) : slugs
    return <section className={shared.section}>
      <h2 className={shared.h2}>{this.props.name}</h2>

      <ol className={styles.outer}>{
        firstN.map((slug,i) => {
          let item = this.props.items[slug]
          return <li className={styles.li} key={i}>
            <figure className={styles.figure}>
              { item.url ?
                <a className={styles.figure_a} target='_blank' href={item.url}>
                  <div className={styles.img} style={{backgroundImage: `url(/assets/images/${item.image})`}} />
                </a>
                : <div className={styles.img} style={{backgroundImage: `url(/assets/images/${item.image})`}} />
              }
              <figcaption className={styles.caption}>
                <h3 className={styles.h3}>{item.title}</h3>
                <h4 className={styles.h4}>{item.strap}</h4>
                { item.url ?
                  <a className={styles.link} target='_blank' href={item.url}>
                    {item.url.replace(/^https?:\/\//,'').replace(/\/$/,'')}
                  </a>
                  : <span className={styles.span}>Not publicly accessible</span>
                }
              </figcaption>
            </figure>
          </li>
        })
      }</ol>
      {
        firstN.length < slugs.length ? <Link to="ListPage" params={{page: this.props.name.toLowerCase()}} className={styles.more}>All {this.props.name.toLowerCase()}</Link> : {}
      }
    </section>
  }
}
