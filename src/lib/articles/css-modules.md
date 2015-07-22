---
title: "CSS Modules"
strap: "Welcome to the Future"
date: "2015-07-18"
---

If you wanted to identify an inflection point in the recent development of CSS thinking, a watershed moment that set a bunch of different minds spiralling off in their own directions like a high-energy particle collision, you'd probably pick Christopher Chedeau's "CSS in JS" talk from NationJS in November, 2014. [React Style](https://github.com/js-next/react-style), [jsxstyle](https://github.com/petehunt/jsxstyle) and [Radium](https://github.com/FormidableLabs/radium) are three of the newest, cleverest, and most viable approaches to styling in React and all reference it *in their project Readme*. If invention is a case of exploring the adjacent possible, then Christopher is responsible for making a lot of the possible more adjacent.

There's one slide in particular from that talk that project authors have taken as a yardstick from then on:

![Problems with CSS at Scale slide](https://speakerd.s3.amazonaws.com/presentations/5ee70e00669c0132f0e02aa977d5e724/slide_1.jpg?1418657132)

These are all legitimate problems that affect most large CSS codebases in one way or another. Christopher points out that these all have good solutions if you move your styling to JavaScript, which is true but introduces its own complexities and idiosyncrasies. Just look at the range of approaches to handling `:hover` states among the projects I referenced earlier, something that has been solved in CSS for a *long* time.

Me, and the [other authors](https://github.com/orgs/css-modules/people) of CSS Modules felt that we could attack the problems head-on, and keep everything we liked about CSS and learning from (read: stealing) the benefits that the styles-in-JS community were bragging about. So, while we are bullish about our approach and firmly defend the virtues of CSS, we do owe a debt of gratitude to those folks pushing the boundaries in the other direction. Thanks, friends!

Here's what we propose:

![](http://31.media.tumblr.com/tumblr_lf80nsGxUk1qe0eclo1_r3_500.gif)
http://iwdrm.tumblr.com/post/2831236814

## Step 1. Local by default.

In CSS Modules, each file is compiled separately so you can use simple class selectors with generic names. Let's say we were building a simple menu item:

```css
/* components/tooltip.css */
.anchor {
  position: relative;
	border: 1px dotted rgba(0,0,0,0.2);
}
.tooltip {
  position: absolute;
  background: rgba(0,0,0,0.8);
  color: #bbb;
  border: 1px solid;
}
.above {
  bottom: 1ex;
  left: 50%;
  margin-left: -50%;
}
```

<div className={[styles.tmp1, styles.p].join(" ")}>
  Here's the example: 
  <nav className={styles.nav}>
    Menu
    <div className={styles.popup}>
      <div className={styles.link}>Item One</div>
      <div className={styles.link}>Item Two</div>
      <div className={styles.link}>Item Three</div>
    </div>
  </nav>
</div>

```css
:export {
  link: __some_super_unique_token;
}
.__some_super_unique_token {
  /* holy isolated styles batman! */
}
```

That `:export` block is Interoperable CSS (which you can read about [here](interoperable-css)), and it's the way CSS Modules is able to talk to your JavaScript code:

```js
import styles from "./styles.css";
element.innerHTML = `<a class=${styles.link}>Click me!</a>`
```

When run, that'll result in:

```css

```
```html
<a class="__some_super_unique_token">Click me!</a>
```

## Step 2. Composition is everything

No seriously. At some point you have a list of all the styles you like for your current build. At another point you map that to the elements you're working with. That's a pretty fundamental task for styling up a website. Look at it with raw CSS:

```css
.some_element {
  font-size: 1.5rem;
  color: rgba(0,0,0,0);
  padding: 0.5rem;
  box-shadow: 0 0 4px -2px;
}
```

Pure styling. This element—these styles. It's simple, and its remarkable in its way. But forgetting that the name `.some_element` needs to stay afloat in a global ocean, the colour, the font-size, the shadow, everything is specified here, in its infinite detail, yet it is probably something you want to use somewhere else. Enter BEM & Sass:

```scss
$large-font-size: 1.5rem;
$dark-text: rgba(0,0,0,0);
$padding-normal: 0.5rem;
@mixin subtle-shadow {
  box-shadow: 0 0 4px -2px;
}

.some_element__header {
  @include subtle-shadow;
  font-size: $large-font-size;
  color: $dark-text;
  padding: $padding-normal;
}
```

That's an improvement, sure, but you've extracted *half* of every variable, and used naming to constrain the other. Think about `@mixin subtle-shadow` in the example above: can you think of a *variable* that would replace it? Plenty of CSS developers have learned to lean on `@extend` in these circumstances, but the problems of that are manifold. IIn CSS Modules:

```css
.head {
  composes: large from "./typography.css";
  composes: dark-text from "./colors.css";
  composes: padding-all-medium from "./layout.css";
  composes: subtle-shadow from "./effect.css";
}
```

...

## Runtime is nothing

## Play around, and never leave
