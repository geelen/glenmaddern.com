import React from 'react'
import Router from 'react-router'
let {Route, DefaultRoute, Redirect, RouteHandler} = Router

import Home from './pages/home.jsx!'
import Articles from './pages/articles.jsx!'
import ArticlePage from './pages/article-page.jsx!'
import ListPage from './pages/list-page.jsx!'
import Slides from './talks/slides.jsx!'

export default <Route handler={RouteHandler}>
  <DefaultRoute handler={Home} name="Home"></DefaultRoute>
  <Redirect from="/articles/rogue-specifications" to="/articles/interoperable-css"/>
  <Route handler={Articles} name="Articles" path="articles"></Route>
  <Route handler={ArticlePage} name="Article" path="articles/:slug"></Route>
  <Route handler={ListPage} name="ListPage" path="/:page"></Route>
  <Route handler={Slides} name="Talks" path="/talks/:slug"></Route>
</Route>
