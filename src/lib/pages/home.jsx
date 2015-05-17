import React from 'react'
import Router from 'react-router'
let Link = Router.Link

export default class Home extends React.Component {
  render() {
    return <div>
      <header _layout="p4-0">
        <h1 _after="down-chevron" _layout="pb1" _type="h4 center">
          My name is <span _type="h1 small:h2 light" _layout="block p1">Glen Maddern</span> and
          I do<span _type="semibold"> rad web stuff</span>
        </h1>
      </header>
      <main _layout="max960" _type="center">
        <section _layout="p3-1 small:p2-1">
          <h2 _after="hr" _type="upcase">Articles</h2>
        </section>
      </main>

    </div>
  }
}
