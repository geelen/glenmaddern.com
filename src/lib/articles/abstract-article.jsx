import React from 'react'
import showdown from 'showdown'
let converter = new showdown.converter()

let styles = {}

export default class AbstractArticle extends React.Component {
  render() {
    return <article className={styles.markdown} dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.children)}}></article>
  }
}
