import React from 'react'

export default class AbstractArticle extends React.Component {
  render() {
    return <div>
      {this.props.children}
    </div>
  }
}
