---
title: "CSS Modules"
strap: "Welcome to the Future"
date: "2015-07-18"
---

If you wanted to identify an inflection point in the recent development of CSS thinking, a watershed moment that set a bunch of different minds spiralling off in their own directions like particles from a high-energy collision, you'd probably pick Christopher Chedeau's "CSS in JS" talk from NationJS in November, 2014. [React Style](https://github.com/js-next/react-style), [jsxstyle](https://github.com/petehunt/jsxstyle) and [Radium](https://github.com/FormidableLabs/radium) are three of the newest, cleverest, and most viable approaches to writing styling for React and all reference that talk *in their project Readme*. If invention is a case of exploring the adjacent possible, then Christopher is responsible for making a lot of the possible more adjacent.

There's one slide in particular from that talk that project authors have taken as a yardstick from then on:

![Problems with CSS at Scale slide](https://speakerd.s3.amazonaws.com/presentations/5ee70e00669c0132f0e02aa977d5e724/slide_1.jpg?1418657132)

Keep that in mind as you read the rest of this article, as I present to you:

## The Future of CSS: CSS Modules

Anyone who has worked for long enough and thought deeply enough about the problems with CSS will agree that the "7 problems" above are real and need addressing. The difference between CSS Modules and the projects I referenced above is: ***which language is the right one to solve them in?***

The styling-in-JS crowd point out, as Christopher did in his talk last year, that most of the 7 problems either don't apply in JS, or have been solved by existing JS tools. They might avoid the 7 CSS problems, but they add complexities and idiosyncrasies of their own. Just look at the range of approaches to handling `:hover` states, something that has been thoroughly solved in CSS for a *long* time.

Me, and the [other authors](https://github.com/orgs/css-modules/people) of CSS Modules felt that we could attack the problems head-on, and keep everything we liked about CSS and learning from (read: stealing) the benefits that the styles-in-JS community were bragging about. So, while we are bullish about our approach and firmly defending the virtues of CSS, we do owe a debt of gratitude to those folks pushing the boundaries in the other direction. Thanks, friends!

### Step 1. Local by default.

In CSS Modules, when you write `.link` you're not adding `link` to a global list of potential clashes.

### Step 2. Composition is everything

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

### Runtime is nothing

### Play around, and never leave