import React from 'react'
import Router from 'react-router'
let Link = Router.Link

export default class Home extends React.Component {
  render() {
    return <div>
      <h1>Home</h1>
      <Link to="Articles">Articles</Link>
    </div>
  }
}
