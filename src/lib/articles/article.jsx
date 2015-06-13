import React from 'react'
import md from '../../markdown'

import styles from './article.css!'
import YoutubePlayer from '../components/youtube-player.jsx!'

export default class Article extends React.Component {
  render() {
    let article = this.props.article
    return <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        { article.strap ? <h2 className={styles.heading2}>{article.strap}</h2> : {}}
        { article.date ? <time className={styles.date} dateTime={article.date}>{article.date}</time> : {}}
      </header>
      {article.render( styles, {YoutubePlayer} )}
    </article>
  }
}
