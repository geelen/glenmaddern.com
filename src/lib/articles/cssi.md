---
title: "Rogue specifications"
strap: "A CSS format for the Loader Age"
date: "2015-06-14"
---

It occurred to me recently that nobody is really happy with the current state of CSS, and that's pretty weird. I know and respect people who think CSS itself is fine/fucked, who think only they/nobody is doing it "right", who think the DOM/the language/other developers are the problem, who think more-isolation/less-isolation/write-it-in-JS/definitely-not-JS-but-maybe-not-CSS-either is the solution. You can pretty much take any combination of opinions there and you'll find someone intelligent, experienced & erudite arguing for it. Which is weird, right?

This dramatic lack of consensus (to borrow a phrase from the greatest Australian film of all time, The Castle, "I don't know what the opposite of [consensus] is, but you've done the opposite") is a real hindrance. And we reinforce it every time we discuss new ideas as if the old ideas were horribly broken, when we're really presenting incremental progress. So, while this article is most certainly about "new ideas", let me state that **however you're doing CSS currently is totally fine** 🙏

If you're new to CSS, **I think Sass, BEM & Gulp are the best tools** for getting lots of stuff done quickly without massive amounts of technical debt. It's what I use when someone's paying me for my time, which is the strongest recommendation anyone can give.

And now it's clear what we're considering, let's consider the future.

## The Divide

If there was one overarching disagreement about the future of CSS, it would have to be on the role of JavaScript. The rise of React & immediate-mode rendering has changed the people think about the DOM, from it being the source of truth for your application to it being a rendering artefact from your component hierarchy. Proponents of the latter can point to a whole class of bugs that disappear when you make the switch, so people (myself included) switch. But then the question of style arises, and it's unclear whether the same benefits apply.

Allow me to present the fairest comparison of the two approaches that I've been able to find. The question of responsive styles:

```css
.GalleryImage {
  flex: 0 0 33.33%;
}
@media screen and (max-width: 600px) {
	.GalleryImage {
	  flex: 0 0 100%;
	}
}
```

```js
export default class GalleryImage extends React.Component {
  render() {
    let style = window.innerWidth < 600
      ? { flex: "0 0 100%" }
      : { flex: "0 0 33.33%" }
    return <img style={style} src={props.url} />
  }
}
```

Forget the particulars of the syntax, just think about the differences in *intent*. The CSS one declares "these rules apply under these conditions"; in JS it's "run this code to figure out what styles to render". CSS proponents may say that the simplicity and predictability of a media-query beats a custom-every-time JS solution, and that deficiencies in syntax can be covered by the Custom Media spec (polyfill), or something like Metaquery. JS proponents may point to the fact that *anything* can be used to branch styles here, not just window width (element queries, anyone?), and since it's just JS you can refactor & control how these checks are written and executed.

I can appreciate both arguments, and I don't think there's a clear winner, which is pretty much how I feel about the whole CSS-vs-JS-styling debate.

## The Goal

In the abstract, if I had to list what I thought was important to be effective when writing styles, it would come down to this:

- How quickly can you build something new?
- How much can you reuse something you've already built when doing so?
- How hard is it to change something to be unique?

This is what I aim for when I build anything. I want speed, reuse, but not unnecessary coupling. I see all the JS-styling approaches as falling at the first hurdle, whereas a workflow using SASS + BEM ("old ideas", remember?) can nail all three. So while I can appreciate that JS rendering gives us some new *capabilities*, I don't think it's worth taking a backwards step in terms of *effectiveness*.

It turns out I'm not the only person who thinks this way, and recently we had enough people thinking the same way at the same time to affect change.

## OCPC - One CSS Per Component

I want to take you through the development of our new idea, but the absolute starting point is that you have a single CSS file for each component in your application, and they should be neighbours on the file system. If you're not doing that already, or just if you haven't seen it, watch [Nicolas Gallagher's brilliant talk](https://www.youtube.com/watch?v=m0oMHG6ZXvo) from CSSConfAU 2014.

So, if you're using React & Sass, you might have this

```
components/
  gallery/
    gallery.scss
    gallery.js
  gallery-image/
    gallery-image.scss
		galler-image.js
```

Using Sass you'd need to go through and `@include` each `.scss` file somewhere, or use something like Gulp to glob & concatenate them all before processing them. So while you've placed the Sass files next to their JS counterpart, they're not actually linked in any way.

## Dependencies across languages

RequireJS was the first to do it [from what I can tell], but lately Webpack & JSPM have popularised the notion of `require`-ing (or `include`-ing because it's 2015) a non-JS file that your JS depended on. For example:

```js
import url from './logo.png';
import './main-nav.css';
export default class MainNav extends React.Component {
  render() {
    return <nav className="MainNav">
      <img src={url} className="MainNav_Logo"/>
      ...
    </nav>
  }
}
```

It's up to the particular loader to decide what each `import` actually *does*, but by capturing a dependency from the JS to the asset files, we've gained a new capability. For example, we don't have to hand-code exactly what the URL of the image file is, we can use a relative path. In fact, the loader responsible for the PNG file could pre-process the image by running it through optipng, then revision-stamp the file, move it to an asset directory, and return the URL. And indeed, that's what Webpack's [image-loader](https://github.com/tcoopman/image-webpack-loader) and [file-loader](https://github.com/webpack/file-loader) combine to do, and it works really well.

But what about the CSS in that previous example? We're relying on *convention* that `main-nav.css` defines a class `MainNav` and `MainNav_Logo`, just the same as we used to rely on a convention for the URL to the PNG. We don't need to.

## What would be useful for a CSS file to export?

In the above example, there's an obvious candidate – the classnames that a CSS file defines:

```js
import url from './logo.png';
import styles from './main-nav.css';
export default class MainNav extends React.Component {
  render() {
    return <nav className={styles.Nav}>
      <img src={url} className={styles.Logo}/>
      ...
    </nav>
  }
}
```

This approach has been popping up in a lot of places in the last few months. On the first of April, Julian Viereck published a post on Medium entitled [Modularise CSS the React Way](https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04). Three weeks later, Tobias Koppers (author of Webpack) independently added the concept of [placeholders](https://github.com/webpack/css-loader/commit/d2c9c25721a711b0fe041c597b43646e82d9f145#diff-04c6e90faac2675aa89e2176d2eec7d8) to his CSS Loader, and Guy Bedford (author of JSPM) suggested I look at [something similar](https://github.com/systemjs/plugin-css/issues/30) for JSPM. A month after that, Mark Dalgleish published [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284), which is the most complete consideration of the impacts of this style on the way you write styles.

## A New Syntax

Mark, Tobias & I started pursuing this idea further and developed it into a project called [CSS Modules](https://github.com/css-modules/css-modules), but first we needed a standard way for the information to cross the CSS-JS boundary. All my original work had been specific to JSPM, all Mark's and Tobias' had been tied to Webpack. But there wasn't anything inherently loader-specific about the *idea*, so we decided to combine our efforts. This is what we came up with.

# ICSS: Interoperable CSS

Firstly, there is a real specification that you should consult for more detail, but here's a high-level introduction.

### :export

To start, we need the ability for a CSS file to map a local class name to something automatically generated.

```css
:export {
  Nav: _nav_nav_afd97dfs867;
  Logo: _nav_logo_97fd867fsfg;
}
```

```css
:import("./utils.css") {
  __imported_util_class: HorizontalNav;
  __imported_util_variable: SharedUtilVar;
}
:export {
  Nav: _nav_nav_afd97dfs867 __imported_util_class;
  Logo: _nav_logo_97fd867fsfg;
}
._nav_nav_a4b2c4d1f9 {
  /* local styles */
}
```

### Designed as a compile target

