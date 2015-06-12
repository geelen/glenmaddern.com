import React from 'react'
import Router from 'react-router'
let {Route, DefaultRoute} = Router

import App from './app.jsx!'
import Home from './pages/home.jsx!'
import Articles from './pages/articles.jsx!'
import ArticlePage from './pages/article-page.jsx!'
import ListPage from './pages/list-page.jsx!'

export default <Route handler={App}>
  <DefaultRoute handler={Home} name="Home"></DefaultRoute>
  <Route handler={Articles} name="Articles" path="articles"></Route>
  <Route handler={ArticlePage} name="Article" path="articles/:slug"></Route>
  <Route handler={ListPage} name="ListPage" path="/:page"></Route>
</Route>
