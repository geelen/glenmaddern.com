import React from 'react'
import App from './app.jsx!'

let mainElem = document.querySelector('main')
if (navigator.userAgent.match(/phantomjs/i)) {
  mainElem.innerHTML = React.renderToString(React.createElement(App))
} else {
  React.render(React.createElement(App), mainElem)
}

console.log("Main rendered in " + Math.round(performance.now()) / 1000 + "s")
