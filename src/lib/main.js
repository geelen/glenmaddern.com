import React from 'react'
import App from './app.jsx!'

let mainElem = document.querySelector('main')
if (navigator.userAgent.match(/phantomjs/i)) {
  mainElem.innerHTML = React.renderToString(React.createElement(App))
} else {
  React.render(React.createElement(App), mainElem)
}

