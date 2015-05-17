import React from 'react'
import Router from 'react-router'
let {Route, DefaultRoute} = Router

import App from './app.jsx!'
import Home from './pages/home.jsx!'
import Articles from './pages/articles.jsx!'

let routes = React.createElement(Route, {handler: App},
  React.createElement(DefaultRoute, {handler: Home, name: "Home"}),
  React.createElement(Route, {path: "articles", handler: Articles, name: "Articles"})
)

export default routes
