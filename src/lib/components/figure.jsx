import React from 'react'

import styles from './figure.css!'

export default class Figure extends React.Component {
  render() {
    return <figure className={styles.figure}>
      <img className={styles.img} src={this.props.src} alt={this.props.alt}/>
      <figcaption className={styles.figcaption}>{this.props.children}</figcaption>
    </figure>
  }
}
