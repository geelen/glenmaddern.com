import React from 'react'

import styles from './slides.css!'
import examples from '../articles/examples.css!'
import icss from './icss.md!markdown'
import icss2 from './icss-eu.md!markdown'
styles.examples = examples

const xGifHtmlImport = `<link rel="import" href="/assets/x-gif.html"/>`;

const talks = {
  'interoperable-css': icss,
  'interoperable-css-eu': icss2
}

export default class Slides extends React.Component {
  constructor() {
    super()
    this.state = {
      slide: parseInt(location.hash.replace(/^#/, '')) || 1,
      bullet: 0
    }
    console.log("what is happening?")
  }

  keyDown(e) {
    if (e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 34) {
      this.incrementSlide()
    } else if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 33) {
      this.decrementSlide()
    } else {
      console.log(e.keyCode)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown.bind(this))
  }

  incrementSlide() {
    if (this.numBullets > this.state.bullet) {
      this.setSlide(this.state.slide, this.state.bullet + 1)
    } else {
      this.setSlide(this.state.slide + 1, 0)
    }
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
      slides = [{elems: [], bullets: 0, style: {}}]
    nodes.forEach(node => {
      let slide = slides[slides.length - 1]
      var props = node._store.props
      if (node.type === "hr") {
        slides.push({elems: [], bullets: 0, style: {}})
      } else if (node.type === "p" && props.children.toString().startsWith('!TODO')) {
        console.debug(props.children)
      } else if (node.type === "meta") {
        if (props['bg']) {
          slide.parent = {
            backgroundImage: `url("${props['bg']}")`,
            backgroundPosition: props['bg-pos'],
            backgroundSize: 'cover',
            color: props['color'] || 'white'
          }
        }
        if (props['align'] === 'top') {
          slide.style.justifyContent = 'flex-start';
          slide.style.paddingTop = '4rem';
        }
        if (props['align'] === 'bottom') {
          slide.style.justifyContent = 'flex-end';
          slide.style.paddingBottom = '2rem';
        }
        if (props.slide) slide.parentClass = 'stage-' + props.slide
        if (props['x-gif']) {
          slide.xGif = `<x-gif fill stopped src="${props.src}" n-times="${props['n-times']}" ${props['ping-pong'] ? 'ping-pong' : ''} speed=${props.speed || 1}/>`
        }
      } else {
        if (node.type === "div" && props['data-bullet']) {
          slide.bullets = slide.bullets + 1
        }
        slide.elems.push(node)
      }
    })

    let currentSlide = slides[this.state.slide - 1]
    return <div>
      <div dangerouslySetInnerHTML={{__html: xGifHtmlImport}}></div>
      <div className={styles[currentSlide.parentClass || 'stage']} style={currentSlide.parent}>
        { slides.map((slide, i) => {
          return <div id={i} style={slide === currentSlide ? {} : {display: 'none'}}>
            { slide.xGif ? <div className={styles.xGif}
                                dangerouslySetInnerHTML={{__html: slide === currentSlide ? slide.xGif.replace(/stopped/,'') : slide.xGif}}></div> : null }
            <div className={styles.slide} style={slide.style}>
              { slide.elems }
            </div>
          </div>
        })}
      </div>
    </div>
  }
}
