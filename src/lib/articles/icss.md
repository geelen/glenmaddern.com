---
title: "Rogue specifications"
strap: "A CSS format for the Loader Age"
date: "2015-06-14"
---

It occurred to me recently that nobody is really happy with the current state of CSS, and that's pretty weird. I know and respect people who think CSS itself is *fine/fucked*, who think only *they/nobody* is doing it "right", who think *the DOM/the language/other developers* are the problem, who think *more-isolation/less-isolation/write-it-in-JS/definitely-not-JS-but-maybe-not-CSS-either* is the solution. You can pretty much take any combination of opinions I've just listed and you'll find someone arguing intelligently for it. Which is weird, right?

This dramatic lack of consensus is a real hindrance. To borrow a phrase from the greatest Australian film ever made:

<figure className={styles.figure}>
![Scene from the 1997 movie "The Castle"](/assets/images/castle.jpg)
<figcaption className={styles.quote}>"I don't know what the opposite of [a consensus] is, but you done the opposite."</figcaption>
</figure>

We done the opposite indeed, and we reinforce it every time we discuss new ideas as if the old ideas were horribly broken, when we're really presenting incremental progress. So, while *this* article is most certainly about "new ideas", let me state that **however you're doing CSS currently is totally fine** 🙏 . In particular:

> If you're new to CSS, **I think the combination of Sass, BEM & Gulp are your best choice** for getting lots of stuff done quickly without leaving you with massive amounts of technical debt, with a huge body of examples and tutorials to learn from and plenty of knowledgeable people to ask. My rating: 💖💖💖 <small className={styles.small}>(It is well-known that pink sparkly hearts are the most powerful of all emoji)</small>

And now it's clear what we're considering, let's consider the future.

## The Divide

If there was one overarching disagreement about the future of CSS, it would have to be on the role of JavaScript. The rise of React & immediate-mode rendering has changed the people think about the DOM, from it being the source of truth for your application to it being a rendering artefact from your component hierarchy. Proponents of the latter can point to a whole class of bugs that disappear when you make the switch, so people (myself included) switch. But then the question of style arises, and it's unclear whether the same arguments make sense.

Allow me to present the fairest comparison of the two approaches that I've been able to find. The question of responsive styles:

```css
/* this CSS: */
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
/* vs this JS: */
export default class GalleryImage extends React.Component {
  render() {
    let style = window.innerWidth < 600
      ? { flex: "0 0 100%" }
      : { flex: "0 0 33.33%" }
    return <img style={style} src={props.url} />
  }
}
```

Forget the particulars of the syntax, just think about the differences in *intent*. The CSS one declares "these rules apply under these conditions", in JS it's "run this code to figure out what styles to render". CSS proponents may say that the simplicity and predictability of a media-query beats a custom-every-time JS solution, and that deficiencies in syntax can be covered by the Custom Media [spec](http://dev.w3.org/csswg/mediaqueries/#custom-mq) ([polyfill](https://github.com/postcss/postcss-custom-media)) or something like [Metaquery](http://glenmaddern.com/articles/metaquery-and-the-end-of-media-queries). JS proponents may point to the fact that *anything* can be used to branch styles here, not just window width ([element queries](https://github.com/marcj/css-element-queries), anyone?), and since it's just JS you can refactor & control how these checks are written and executed.

I can appreciate both arguments, and I don't think there's a clear winner, which is pretty much how I feel about the whole CSS-vs-style-in-JS debate.

## The Goal

If I had to list what I thought was important to be effective when writing styles, it would come down to this:

- How quickly can you build something new?
- How much can you reuse something you've already built when doing so?
- How hard is it to change something to be unique?

This is what I aim for when I build anything. I want speed, reuse, but not unnecessary coupling. I see all the JS-styling approaches as falling at the first hurdle, whereas a workflow using Sass & BEM ("old ideas", remember?) can nail all three. So while I can appreciate that JS rendering gives us some new *capabilities*, I don't think it's worth taking a backwards step in terms of *effectiveness*.

But then Sass & BEM require a lot of convention & discipline to keep things getting out of hand. Maybe, then, the future of CSS is something that keeps the fluidity of CSS but automated the conventions. Something that took the *best* of CSS & JS and combined them.

It turns out I'm not the only person who thinks this way, and recently we had enough people thinking the same way at the same time to affect change. This is the progression of ideas:

#### One CSS Per Component

Let's start with the basic assumption of styling components — that you have a single CSS file for each component in your application, and they should be neighbours on the file system. If you're not doing that already, or just if you haven't seen it, watch [Nicolas Gallagher's brilliant talk](https://www.youtube.com/watch?v=m0oMHG6ZXvo) from CSSConfAU 2014.

So, if you're using React & Sass, you might have this

```
components/
  gallery/
    gallery.scss
    gallery.js
  gallery-image/
    gallery-image.scss
    gallery-image.js
```

Using Sass you'd need to go through and `@include` each `.scss` file somewhere, or use something like Gulp to glob & concatenate them all before processing them. So while you've placed the Sass files next to their JS counterpart, they're not actually linked in any way.

#### Dependencies across languages

RequireJS was the first to do it (from what I can tell), but lately Webpack & JSPM have popularised the notion of `require`-ing (or `include`-ing because [it's 2015 already](http://glenmaddern.com/articles/javascript-in-2015)) a non-JS file that your JS depended on. For example:

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

It's up to the particular loader to decide what each `import` actually *does*, but by capturing a dependency from the JS to the asset files, we've gained a new capability. For example, we don't have to hand-code exactly what the URL of the image file will be in production, we can just point to it locally. In fact, the loader responsible for the PNG file could pre-process the image by running it through an optimiser, then revision-stamp it, move it to an asset directory, and return the URL. And indeed, that's what Webpack's [image-loader](https://github.com/tcoopman/image-webpack-loader) and [file-loader](https://github.com/webpack/file-loader) combine to do, and it works really well.

But what about the CSS in that previous example? We're relying on *convention* that `main-nav.css` defines a class `MainNav` and `MainNav_Logo`, just the same as we used to rely on a convention for the URL to the PNG. We don't need to.

#### What if a CSS file could export variables?

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

This approach has been popping up in a lot of places in the last few months. On the first of April, Julian Viereck published a post on Medium entitled [Modularise CSS the React Way](https://medium.com/@jviereck/modularise-css-the-react-way-1e817b317b04). Three weeks later, Tobias Koppers (author of Webpack) added a concept of [placeholders](https://github.com/webpack/css-loader/commit/d2c9c25721a711b0fe041c597b43646e82d9f145#diff-04c6e90faac2675aa89e2176d2eec7d8) to his CSS Loader, and Guy Bedford (author of JSPM) suggested I look at [something similar](https://github.com/systemjs/plugin-css/issues/30) for JSPM. A month after that, Mark Dalgleish published [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284), which showed just how significant this shift can be.

#### A New Syntax

Mark, Tobias & I started pursuing this idea further and developed it into a project called [CSS Modules](https://github.com/css-modules/css-modules), but first we needed a standard way for the information to cross the CSS-JS boundary. All of my exploratory work had been specific to JSPM, all Mark's and Tobias' had been tied to Webpack. But there wasn't anything inherently loader-specific about the *idea*, so we decided to combine our efforts. This is what we came up with:

## ICSS: Interoperable CSS

ICSS is normal CSS with a couple of small additions. It's similar to an [Object File](https://en.wikipedia.org/wiki/Object_code) in compiled languages — the outputs of a compiler which can then be linked together to make a complete program. This is the first characteristic of ICSS:

##### It is designed to be a *compile target*, not human-authored.

Compiled from what? Well, CSS Modules to start with, but it could be anything, the only requirement is:

##### Each file is compiled separately then linked in the loader

Things like `@import` in Sass or CSS effectively concatenate the source code of multiple files so you can pass variables or mixins around, and many of the PostCSS plugins assume you're doing something similar. In fact, most CSS processing is done globally because CSS has always *been* global.

JavaScript used to be like that as well. Before CommonJS, there wasn't a standard for `a.js` to "require" `b.js`, they were both just running in the same global browser context and could make use of each other as needed. With the introduction of `require()` and `module.exports`, JavaScript became a *programming* language, with a proper system of dependencies and proper local scoping. ICSS is designed to do the same thing.

## :export

The first task is to allow symbols to be exported from a file to  JS or another CSS file. This is the `:export` pseudoselector block:

```css
:export {
  Nav: _nav_nav_afd97dfs867;
  Logo: _nav_logo_97fd867fsfg;
}
._nav_nav_afd97dfs867 { /* styles */ }
._nav_logo_97fd867fsfg { /* styles */ }
```

The tokens are simply exported as a simple JS object:

```js
import styles from './nav.css';
// styles: { Nav: "_nav_nav_afd97dfs867", Logo: "_nav_logo_97fd867fsfg" }
```

CSS Modules uses this to scope all class selectors by default, but under the hood it's generating globally-unique classnames and using `:export` to provide them to JS.

## :import

The other syntax addition is the `:import` pseudoselector. It allows a CSS file to declare a dependency on another ***and define which symbols it wants to import***. It's this latter capability that truly elevates what's possible with CSS.

```css
:import("./utils.css") {
  i__util_class_1: HorizontalNav;
  i__util_var_1: SharedUtilVar;
}
```

Here, the path to the CSS file is provided as an argument. It's up to the loader to actually go and fetch the file at link-time, so the particular paths used may be loader-specifc (`util.css` in Webpack vs `./util.css` in JSPM, for example).

Next is the declaration of *local temporary aliases* and the exported symbols from the dependency that they represent. This block would match up to the following `:export` block of `utils.css`:

```css
:export {
  HorizontalNav: _utils_horizontalnav_c7ab86431;
  SharedUtilVar: rgb(200, 100, 0);
}
```

Here, where exporting a class name as `HorizontalNav` and a variable as `SharedUtilVar` but in reality they're both just treated as simple strings.

#### Using imports

As a ICSS file is loaded and linked against its imports, the symbols get passed through and the `:import` block is deleted. Expanding on the above example:

```css
:import("./utils.css") {
  i__util_class_1: HorizontalNav;
  i__util_var_1: SharedUtilVar;
}
:export {
  Nav: _nav_nav_afd97dfs867 i__util_class_1;
}
._nav_nav_afd97dfs867 {
  color: i__util_var_1;
}
```

After the `:import` is processed against the `:export` block in the previous section, the file becomes:

```css
:export {
  Nav: _nav_nav_afd97dfs867 _utils_horizontalnav_c7ab86431;
}
._nav_nav_afd97dfs867 {
  color: rgb(200, 100, 0);
}
```

When this file is imported, the `:export` gets turned into a JS object and the remainder of the file is injected into the DOM by the loader.

## High-level example

ICSS is designed as a compilation target, not to be coded by hand, so I thought I'd demonstrate how one of the features of [CSS Modules](https://github.com/css-modules/css-modules) is executed. Let's look at `composes`, which is similar to Sass' concept of `@extend`:

```css
/* my-component.css */
.outer {
  composes: flex-centered from "../utils.css";
  background: rgba(0,0,0,0.8);
}
.inner {
  composes: white-bg black-shadow from "./utils.css";
  border-radius: 4px;
}
```
```css
/* utils.css */
.flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.white-bg {
  background-color: #eee;
}
.black-shadow {
  box-shadow: 0 0 0 1px black, 0 0 8px -2px rgba(0,0,0,0.8);
}
```
```js
/* my-component.js */
import styles from "./my-component.css"
export default class MyComponent extends React.Component {
  render() {
    return <div className={styles.outer}>
      <div className={styles.inner}>
        /* content */
      </div>
    </div>
  }
}
```

The design goal for CSS Modules is to write something that looks global but is compiled to be localised. As with all pre-processors targeting CSSI, that compilation happens per-file. So, by the time the two files hit the loader, they look like:

```css
/* my-component.css (interoperable) */
:import("./utils.css") {
  i__util_class_1: flex-centered;
  i__util_class_2: white-bg;
  i__util_class_3: black-shadow;
}
:export {
  outer: _mycomponent_outer_ab24c761 i__util_class_1;
  inner: _mycomponent_inner_145bfed2 i__util_class_2 i__util_class_3;
}
._mycomponent_outer_ab24c761 {
  background: rgba(0,0,0,0.8);
}
._mycomponent_inner_145bfed2 {
  border-radius: 4px;
}
```
```css
/* utils.css (interoperable) */
:export {
  flex-centered: _util_flexcentered_be5fd72ac;
  white-bg: _util_whitebg_6dc31abb;
  black-shadow: _util_blackshadow_9cd82af23;
}
._util_flexcentered_be5fd72ac {
  display: flex;
  justify-content: center;
  align-items: center;
}
._util_whitebg_6dc31abb {
  background-color: #eee;
}
._util_blackshadow_9cd82af23 {
  box-shadow: 0 0 0 1px black, 0 0 8px -2px rgba(0,0,0,0.8);
}
```

When these files are loaded, the following JS object is returned:
```js
import styles from "./my-component.css"
// styles: {
//   outer: "_mycomponent_outer_ab24c761 _util_flexcentered_be5fd72ac",
//   inner: "_mycomponent_inner_145bfed2 _util_whitebg_6dc31abb _util_blackshadow_9cd82af23"
// }
```

This demonstrates a couple of benefits that CSS Modules provides:

- Each file can be processed independently (enables parallel & incremental builds)
- Styles can be reused by components by exporting multiple classes for a single component instead of altering (potentially harmfully) the CSS
- All styles are global-safe, combining a human-readable part and a guaranteed-unique part in development. For production, these classes can be safely minified if desired.

ICSS makes all this possible, but while CSS Modules is opinionated, ICSS is not. Which brings me to the final design characteristic of CSSI:

##### ICSS is designed to enable the *capability* of CSS to be loaded and linked together, not to make a judgement on the *best* way of doing so.

## The Standard

By publishing a [Interoperable CSS Standard](https://github.com/css-modules/icss), we're hoping to unify the way we can treat CSS as a multi-file language, to explore the impact that has on the authoring process. The three major loaders all support the format: Webpack's [css-loader](https://github.com/webpack/css-loader), JSPM's [jspm-loader-css](https://github.com/geelen/jspm-loader-css) and Browserify's  [css-modulesify](https://github.com/css-modules/css-modulesify).

If this capability proves to be as useful for the wider community as it has done for us on the CSS Modules team, who knows where this leads? Maybe it can become part of the [WhatWG Loader Standard](http://whatwg.github.io/loader/) and one day natively supported by browsers? At least in the mean time, we can explore ideas and share our work wherever possible.

<figure className={styles.figure}>
![Simpsons scene showing Lionel Hutz imagining a world without lawyers](https://community.muselive.com/uploads/default/1195/e629da94097bc7b8.gif)
<figcaption className={styles.quote}>A world with *Interoperable CSS* in the browser.<br/>Lionel Hutz wanted to write everything in JS.</figcaption>
</figure>
