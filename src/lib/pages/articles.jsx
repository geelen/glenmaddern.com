import React from 'react'
import Router from 'react-router'
let Link = Router.Link

export default class Articles extends React.Component {
  render() {
    return <div>
      <h1>Articles</h1>
      <Link to="Home">Home</Link>
    </div>
  }
}
