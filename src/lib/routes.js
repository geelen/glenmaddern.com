import React from 'react'
import Router from 'react-router'
let {Route, DefaultRoute} = Router

import App from './app.jsx!'
import Home from './pages/home.jsx!'
import Articles from './pages/articles.jsx!'
import Article from './pages/article.jsx!'

export default React.createElement(Route, {handler: App},
  React.createElement(DefaultRoute, {handler: Home, name: "Home"}),
  React.createElement(Route, {path: "articles", handler: Articles, name: "Articles"}),
  React.createElement(Route, {path: "articles/:key", handler: Article, name: "Article"})
)
