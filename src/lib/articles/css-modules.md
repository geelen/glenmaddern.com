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

We think CSS Modules is the future of CSS. Let me tell you about it.

<imports.Figure src="http://31.media.tumblr.com/tumblr_lf80nsGxUk1qe0eclo1_r3_500.gif" alt="Future men discovering CSS Modules on the moon">
Rumors persist that CSS Modules is **from the future** ([iwdrm.tumblr.com](http://iwdrm.tumblr.com/post/2831236814))
</imports.Figure>

## Step 1. Local by default.

In CSS Modules, each file is compiled separately so you can use simple class selectors with generic names—you don't need to worry about polluting the global scope. Let's say we were building a simple submit button with the following 4 states.

<div className={styles.examples.block}>
  <div className={styles.examples.element}>
    <button className={styles.examples.normal}>Submit</button>
    Normal
  </div>
  <div className={styles.examples.element}>
    <button className={styles.examples.disabled}>Submit</button>
    Disabled
  </div>
  <div className={styles.examples.element}>
    <button className={styles.examples.invalid}>Submit</button>
    Error
  </div>
  <div className={styles.examples.element}>
    <button className={styles.examples.inProgress}>Processing...</button>
    In Progress
  </div>
</div>

#### Before CSS Modules

We might code this up using Suit/BEM-style classnames like so:

```css
/* components/submit-button.css */
.Button { /* all styles for Normal */ }
.Button--disabled { /* overrides for Disabled */ }
.Button--error { /* overrides for Error */ }
.Button--in-progress { /* overrides for In Progress */
```

This is pretty good, but `Button` is still maybe too generic. Maybe it should be `SubmitButton` just to be safe...

#### With CSS Modules

CSS Modules means you never need to worry about your names being too generic, just use whatever makes the most sense:

```css
/* components/submit-button.css */
.normal { /* all styles for Normal */ }
.disabled { /* all styles for Disabled */ }
.error { /* all styles for Error */ }
.inProgress { /* all styles for In Progress */
```

Notice that we don't use the word *Button* anywhere. Why would we? The file is already called *"submit-button.css"*. In any other language, you don't have to prefix all your local variables with the name of the object they apply to, CSS should be no different.

It's also worth mentioning that we're not "overriding" styles — each class has all the styles needed for that variant (more on that in a minute). And that we used camelCase for `.inProgress` for the sole reason that the syntax in JavaScript becomes a bit nicer. 

```js
/* components/submit-button.js */
import styles from './submit-button.css';

buttonElem.outerHTML = `<button class=${styles.inProgress}>Processing...</button>`
```

Using camelCase simply means not having to type `styles['in-progress']`. But if you get paid by the keystroke, go right ahead!

The actual classnames are automatically generated and guaranteed to be unique. CSS Modules is taking care of all that for you, and compiling the files to a format called ICSS ([read my blog post about that](interoperable-css)), which is how CSS and JS can communicate. So, when you run your app, you'll see something like:

```html
<button class="components_submit_button__inProgress__abc5436">Processing...</button>
```

If you see that in your DOM, that means it's working!

#### A React Example

There's nothing about CSS Modules that's React-specific as the above example shows. But working with React gives you an excellent experience using CSS Modules, so it's worth showing a slightly more complex example:

```
/* components/submit-button.jsx */
import { Component } from 'react';
import styles from './submit-button.css';

export default class SubmitButton extends Component {
  render() {
    let className, text = "Submit"
    if (this.props.store.submissionInProgress) {
      className = styles.inProgress
      text = "Processing..."
    } else if (this.props.store.errorOccurred) {
      className = styles.error
    } else if (!this.props.form.valid) {
      className = styles.disabled
    } else {
      className = styles.normal
    }
    return <button className={className}>{text}</button>
  }
}
```

This lets you use your styles without ever worrying about what global-safe CSS classname they're using, which changes everything. But CSS Modules also enables you to *think* about your styles differently, which changes everything again.

<imports.Figure src="https://tyronetribulations.files.wordpress.com/2014/09/jony-ive-10-20-09.jpg" alt="Jony Ive contemplates CSS Modules">
  This is how intensely we've been thinking about CSS.
</imports.Figure>

## Step 2. Composition is everything

Earlier I mentioned that each class should contain *all* the styles for the button in each different state, in contrast to BEM where it assumes you'd have more than one:

```js
/* BEM Style */
innerHTML = `<button class="Button Button--valid">`

/* CSS Modules */
innerHTML = `<button class="${styles.valid}">`
```

But wait, how do you represent *shared* styles between all the states? The answer is probably CSS Modules' most potent weapon, **composition**:

```css
.common {
  /* all the common styles you want */
}
.normal {
  composes: common;
  /* anything that only applies to Normal */
}
.disabled {
  composes: common;
  /* anything that only applies to Disabled */
}
.error {
  composes: common;
  /* anything that only applies to Error */
}
.inProgress {
  composes: common;
  /* anything that only applies to In Progress */
}
```

The `composes` keyword says that `.normal` ***includes*** all the styles from `.common` much like the `@extends` keyword in Sass does. But while Sass rewrites your CSS selectors to make that happen, CSS Modules **changes which classes are exported to JavaScript**.

#### In Sass

Let's take our BEM example from above and apply some of Sass' `@extends`:

```scss
.Button--common { /* font-sizes, padding, border-radius */ }
.Button--normal {
  @extends .common;
  /* blue color, light blue background */
}
.Button--error {
  @extends .common;
  /* red color, light red background */
}
```

This compiles to this CSS:

```css
.Button--common, .Button--normal, .Button--error {
  /* font-sizes, padding, border-radius */
}
.Button--normal {
  /* blue color, light blue background */
}
.Button--error {
  /* red color, light red background */
}
```

You can then just use *one* class in your markup `<button class="Button--error">` and get the common & specific styles you want. It's a really powerful concept, but there are some nasty traps with using it (Hugo Giraudel has a nice summary of the issues and links to further reading [here](http://www.sitepoint.com/avoid-sass-extend/)).

#### With CSS Modules

Using the `composes` keyword is similar but is executed differently. To demonstrate, the following CSS:

```css
.common { /* font-sizes, padding, border-radius */ }
.normal { composes: common; /* blue color, light blue background */ }
.error { composes: common; /* red color, light red background */ }
```

gets sent to the browser as this:

```css
.components_submit_button__common__abc5436 { /* font-sizes, padding, border-radius */ }
.components_submit_button__normal__def6547 { /* blue color, light blue background */ }
.components_submit_button__error__1638bcd { /* red color, light red background */ }
```

and become the following JavaScript object:

```js
styles: {
  common: "components_submit_button__common__abc5436",
  normal: "components_submit_button__common__abc5436 components_submit_button__normal__def6547",
  error: "components_submit_button__common__abc5436 components_submit_button__error__1638bcd"
}
```

So we still just use `styles.normal` or `styles.error` in our code but we get multiple class rendered into the DOM: 

```html
<button class="components_submit_button__common__abc5436 
               components_submit_button__normal__def6547">
  Submit
</button>
```

## Step 3. Sharing between files

Working with Sass or LESS, your whole project usually gets processed as one big lump and converted to a single CSS file. In CSS Modules, because we're using a loader like Webpack, we just `import` or `require` the CSS file we need for the component we're working on. It means we never have to worry about global names, since we know we're never running in a global context.

But what about sharing information across your whole project? What about things like colours or a grid system or breakpoints? CSS Modules has two mechanisms for handling this. The first is that `composes` can reference a class in another file, like so:

```css
/* colors.css */
.primary {
  color: #720;
}
.secondary {
  color: #777;
}
```

```css
/* submit-button.css */
.normal {
  composes: common;
  composes: primary from "../shared/colors.css";
}
```


## Step 4. Compose *everything*

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
