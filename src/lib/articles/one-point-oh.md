---
title: "CSS Modules hits 1.0"
strap: "Now with added legitimacy!"
date: "2015-10-23"
---

Since the [last blog post](/articles/css-modules), a lot has happened. In two or so months I've travelled to Salt Lake City and Berlin to speak about the project and chatted afterwards to dozens of developers about it, and the response has been overwhelming. We've received a huge amount of questions, feature requests & bug reports on the issue tracker, which I want to thank everyone for taking the time to contribute. My hope for CSS Modules is that it can really improve the majority of developers' experience with CSS, but in order to achieve that we need your help to understand *what you find painful about CSS right now*. So thanks to those of you who have already [raised an issue](https://github.com/css-modules/css-modules/issues), and I invite everyone else to do so.

This blog post is about what feedback we've been hearing, what we've changed in the last few months, and why we're happy to call it a 1.0 release.

## The Final Piece

One of the guiding principles behind CSS Modules' design is that of **few features, slowly added**. To start with, Modules was simply a single feature: [Local by Default] — the ability to auto-generate class names to reduce the cognitive overhead of writing CSS. Later, came [Composition] — the ability to accumulate class names from different files under a single logical name. After two months & lots of discussions about potential features, we've decided to add one final piece to the CSS Modules puzzle.

## @value

In my [introduction to composition], I contrasted the Sass way of extracting variables with the CSS Modules way of extracting classes:

```scss
/* variables.scss */
$padding-normal: 2rem;

/* element.scss */
.some-element {
  padding: $padding-normal;
}
```

vs

```css
/* padding.css */
.normal {
  padding: 2rem;
}

/* element.css */
.some-element {
  composes: normal from "./padding.css";
}
```

This has a couple of benefits. In Sass, the prefix on the global variable `$padding-` is the only thing that tells the use to use it for `padding` (as opposed to `font-size` or `margin`, for which values of `2rem` are perfectly valid). In CSS Modules, the context is given by the file name `padding.css`, and both the property *and* the value (`padding` and `2rem`) are contained within the class and named & reused together. I think it's a far more descriptive way of reusing styles for your component.

However, there is a limitation. What if you have multiple base classes that want to share the *value*, in the above case `2rem`, for multiple *properties*?

```css
/* margin.css */
.normal {
  margin: 2rem;
}

/* padding.css */
.padding-normal {
  padding: 2rem;
}
```

CSS Modules had no way of avoiding this duplication, so people reached for familiar tools such as Sass or a PostCSS variables plugin (of which [there] [are] [several]) .

## Interoperable tooling

This was not a bad thing by any means. We've had a strict goal to be syntax-compatible with teams writing LESS and Sass & all the CSS Modules loaders allow [customisation of the PostCSS plugin chain], so that choosing CSS Modules never lead to a dead end. Sass, LESS, PostCSS are all fantastic tools, and you shouldn't have to give them up to add a new tool to your arsenal.


Because CSS Module compiles to [ICSS], everything it does, from 

<imports.YoutubePlayer videoId="aIyhhHTmsXE"></imports.YoutubePlayer>
