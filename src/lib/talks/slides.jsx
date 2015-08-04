import React from 'react'

import styles from './slides.css!'
import icss from '../talks/icss.md!markdown'

const talks = {
  'interoperable-css': icss
}

export default class Slides extends React.Component {
  render() {
    let talk = talks[this.props.params.slug]
    return talk.render({}, {})
  }
}
