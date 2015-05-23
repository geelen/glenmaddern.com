import React from 'react'

import styles from './youtube-player.metacss'

export default class YoutubePlayer extends React.Component {
  render() {
    return <div className={styles.outer}>
      <div className={styles.inner}>
        <iframe className={styles.iframe} src={`//www.youtube.com/embed/${this.props.videoId}`} frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  }
}
