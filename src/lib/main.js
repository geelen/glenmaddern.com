import React from 'react'
import Router from 'react-router'
import routes from './routes'

export default new Promise((resolve, reject) => {
  let mainElem = document.querySelector('main')
  Router.run(routes, Router.HistoryLocation, (Root) => {
    if (navigator.userAgent.match(/phantomjs/i)) {
      mainElem.innerHTML = React.renderToString(React.createElement(Root))
    } else {
      React.render(React.createElement(Root), mainElem)
    }
    resolve()
  })
}).then(_ => {
    console.log("Main rendered in " + Math.round(performance.now()) / 1000 + "s")
  }, err => {
    console.error(err)
  })
