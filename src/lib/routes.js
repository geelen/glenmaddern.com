import React from 'react'
import Router from 'react-router'
let {Route, DefaultRoute} = Router

import App from './app.jsx!'
import Home from './pages/home.jsx!'
import Articles from './pages/articles.jsx!'
import ArticlePage from './pages/article-page.jsx!'

export default React.createElement(Route, {handler: App},
  React.createElement(DefaultRoute, {handler: Home, name: "Home"}),
  React.createElement(Route, {path: "articles", handler: Articles, name: "Articles"}),
  React.createElement(Route, {path: "articles/:slug", handler: ArticlePage, name: "Article"})
)
