import React from 'react'

import styles from './slides.css!'
import icss from '../talks/icss.md!markdown'

const talks = {
  'interoperable-css': icss
}

export default class Slides extends React.Component {
  constructor() {
    super()
    this.state = {
      slide: parseInt(location.hash.replace(/^#/, '')) || 1
    }
  }

  keyDown(e) {
    if (e.keyCode == 39 || e.keyCode == 40) {
      this.incrementSlide()
    } else if (e.keyCode == 37 || e.keyCode == 38) {
      this.decrementSlide()
    } else {
      console.log(e.keyCode)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown.bind(this))
  }

  incrementSlide() {
    this.setSlide(this.state.slide + 1)
  }

  decrementSlide() {
    this.setSlide(Math.max(1, this.state.slide - 1))
  }

  setSlide(nr) {
    history.replaceState({}, "", `#${nr}`)
    this.setState({slide: nr})
  }

  render() {
    let talk = talks[this.props.params.slug]
    if (!talk) return <h1 className={styles.h2}>Not found</h1>

    let rendered = talk.render(styles, {}),
      nodes = rendered._store.props.children,
      slides = [[]]
    nodes.forEach(node => node.type === "hr" ? slides.push([]) : node.type === "p" && node._store.props.children.toString().startsWith('!TODO') ? console.debug(node._store.props.children) : slides[slides.length - 1].push(node))

    return <div className={styles.stage}>
      { slides.map((slide,i) => {
        let style = i == this.state.slide - 1 ? {} : {display: 'none'}
        return <div id={i} className={styles.slide} style={style}>
          { slide }
        </div>
      })}
    </div>
  }
}
