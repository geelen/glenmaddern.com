---
title: "Introducing AM - Attribute Modules for CSS"
strap: "Moving beyond class-based styling"
date: "2014-09-05"
---
A few months ago, I read an [article by Harry Roberts](http://csswizardry.com/2014/05/grouping-related-classes-in-your-markup/) where he introduced an interesting concept for working with related classes in CSS. In his article, he describes the use of the `[]` characters in class attributes to help understand their purpose at a quick glance. He presents this example, arguing that it makes the class declaration more *scannable* - that is, more understandable at a glance:

```html
<div class="[ foo  foo--bar ]  [ baz  baz--foo ]">
```

I must admit, I was initially extremely uncomfortable with the technique. The idea of classes with names like `[` and `]`, that match no CSS, that are repeated within a single class attribute, that are purely designed for *humans* rather than the browser seemed, well, wrong. I still think that, actually, but it got me thinking about markup & semantics much more deeply, so thanks Harry!

As I looked into it, several people were suggesting similar approaches, such as using `/`&nbsp;([Ben Everard](http://beneverard.co.uk/blog/using-slashes-within-the-html-class-attribute/)), or `|`&nbsp;([Stephen Nolan](https://twitter.com/sn0lan/status/439384690680942592)), but the feeling of unnaturalness persisted. All I could think was:

<div className={styles.pull}>How do you have so many classes that you need *more* classes to make things readable?</div>

Because, let's be clear, **this is madness**. Readable, scannable HTML is a worthy goal, but these kinds of techniques show that there's something fundamentally broken with class-based styling.

## More vs fewer classes - a brief aside

The surprising thing was, while the presence of so many classes in the markup was unsettling to me, people like Harry were just so damn *persuasive*. Appealing to things like OOCSS and the [Single Responsibility Principle](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/), and from my own experience building a series of sites of increasing complexity, I could tell there was value in the *decomposition* of styling behaviour, but it wasn't until recently that I found a way to implement it that I was happy with.

I had previously adopted a version of BEM that emphasised **isolation over reuse** &dash; each new block inherits no styling by default, allowing components to be developed separately and avoids the risk of breaking something elsewhere on the site. But the tradeoff there is *fragmentation* &dash; when you find yourself with 10 different link styles, 12 shades of blue, 18 subtly different button styles etc. Nicole Sullivan, the creator of OOCSS, gave a fantastic [presentation](https://www.youtube.com/watch?v=0NDyopLKE1w) last year in Melbourne that spoke about how common that problem was, and how to recover from it.

For me, it felt like the accepted solution was to dive into the capabilities of CSS pre-processors in order to have the isolation of BEM but the consistency of OOCSS. For example, instead of this:

```html
<a class='btn large rounded'>
```
```css
.btn { /* button styles */ }
.large { /* global large-type modifier */ }
.rounded { /* global rounded-border modifier */ }
```

you would have:

```html
<a class='btn btn--large btn--rounded'>
```
```scss
.btn { /* button styles */ }
.btn--large {
  @extend %large-type;
}
.btn--rounded {
  @extend %rounded-borders;
}
```

I ended up with files full of mixins and placeholders like `_typography.scss` and `_brand.scss`, which allowed me to keep a handle on fragmentation, but also maintain by-default style isolation for each new component. And so things were ok, for a while.

## Modifiers: how the M breaks BEM

Doing any research on the topic of CSS class naming & maintainability, you're bound to come across Nicolas Gallagher's excellent article ["About HTML semantics and front-end architecture"](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/). One part in particular caught my attention, which he calls 'single-class' vs 'multi-class' patterns for modifiers. To summarize, the two potential versions of your HTML look like this:

```html
<a class='btn--large'> <!-- Single class -->
<a class='btn btn--large'> <!-- Multi class -->
```

That's facilitated through two alternative CSS patterns:

```css
/* Single class */
.btn, .btn--large { /* base button styles */ }
.btn--large { /* large button styles */ }

/* Multi class */
.btn { /* base button styles */ }
.btn--large { /* large button styles */ }
```

The difference here is whether `btn--large` is sufficient *on its own*, or whether it depends on the class `btn` being present. The single-class pattern says yes, it feels simpler and avoids the case where someone forgets to include `btn`. It's also less repetitious, and with SASS's `@extend` functionality it doesn't feel like much of a burden on the CSS side, but it has a truly fatal flaw.

## Contextual overrides

Let's say all your buttons have a background colour, except for those in your top navigation bar. With the multi-class pattern, all buttons, large or small, rounded or square, etc, still include the class `btn`, so you can target them like so:

```css
header > nav > .btn { background: none; }
```

With the single-class pattern, we don't know which variant of button we might be overriding, so we're forced to do:

```css
header > nav {
  .btn, .btn--large, .btn--rounded { background: none; }
}
```

Obviously, this is not ideal - adding another button variant means checking anywhere that overrides button styles and adding another class. This is a bit of a deal breaker, so most people simply argue for a return to the multiple-class style ([Nicholas Gallagher](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/), [Ben Smithett](http://bensmithett.com/bem-modifiers-multiple-classes-vs-extend/)). I've seen some alternative proposals, such as [Tommy Marshall's](http://viget.com/extend/bem-multiple-modifiers-and-experimenting-with-attribute-selectors) or [Ben Frain's](http://benfrain.com/multiple-classes-ui-component-variations-wrong/), that use the *attribute prefix selector* `^=` which allows you to test whether an attribute value **starts with** a certain string, e.g.:

```html
<a class='btn--large'>
```

```css
[class^='btn'] { /* base button styles */ }
.btn--large { /* large button styles */ }
header > nav > [class^='btn'] { /* Overrides for all buttons */ }
```

This achieves easy contextual overrides for a single-class pattern, but it's too brittle to be a serious option. Most damningly, if *another* class appears before `btn--large`, the prefix selector doesn't match, and everything breaks. Also, there's no obvious way of permitting multiple variants such as `btn--large--rounded`.

I appreciate the inventiveness of this approach, but it's a dead end. And it's where I got stuck, too, until something occurred to me.

## Why the fuck are we using classes?

Forgive my bluntness, but can anyone give me a good reason why classes are the *only* place we add styling information? Here's what the [HTML living standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#classes) has to say:

> **3.2.5.7 The class attribute**
>
> The attribute, if specified, must have a value that is a set of space-separated tokens representing the various classes that the element belongs to.
>
> There are no additional restrictions on the tokens authors can use in the class attribute, but authors are encouraged to use values that describe the nature of the content, rather than values that describe the desired presentation of the content.

So yes, it makes perfect sense that we use classes to describe 'the nature of the content', but it feels like we're asking more of the humble class attribute than it can give us. This one attribute holds everything, from enormous BEM-style names like `primary-nav__sub-nav--current` to utilities like `u-textTruncate` or `left` or `clearfix`, to JavaScript hooks like `js-whatevs`, and so we spend a lot of time coming up with names that don't conflict with any others but are still vaguely readable.

It's manageable through convention & discipline, and even helped by techniques like Harry's at the top of this article, but the truth is we're operating in a **global namespace**, and no amount of conventions can change that. Which is what makes AM different.

But before we can talk about that, we need to brush up on a lesser-known feature of CSS.

## Welcome ~=, the magic selector

It turns out browsers since IE7 have had a particularly powerful CSS rule called the **space-separated attribute selector**, described [here on CSS Tricks](http://css-tricks.com/attribute-selectors/#rel-space). It matches arbitrary attribute values, separated by spaces, just like they were classes. So the following two lines of CSS are equivalent:

```css
.dat-class { /* dem styles */ };
[class~='dat-class'] { /* dem styles */ };
```

In the same way that `<div class='a b c'>` doesn't care which order the `a`, `b` and `c` are in, or what else is present, neither does the `~=` selector. But `~=` isn't limited to the `class` attribute, it can work on any attribute. And it's the key to a whole new approach.

# Attribute Modules

Attribute Modules, or AM, at its core is about *defining namespaces* for your styles to live in. Let's begin with a simple example, a grid, first as classes:

```html
<div class="row">
    <div class="column-12">Full</div>
</div>
<div class="row">
    <div class="column-4">Thirds</div>
    <div class="column-4">Thirds</div>
    <div class="column-4">Thirds</div>
</div>
```

```css
.row { /* max-width, clearfixes */ }
.column-1 { /* 1/12th width, floated */ }
.column-2 { /* 1/6th width, floated */ }
.column-3 { /* 1/4th width, floated */ }
.column-4 { /* 1/3rd width, floated */ }
.column-5 { /* 5/12th width, floated */ }
/* etc */
.column-12 { /* 100% width, floated */ }
```

Now let's build it with *attribute modules*. We have two modules, **rows** and **columns**. Rows, so far, have no variations. Columns have 12.

```html
<div am-Row>
    <div am-Column="12">Full</div>
</div>
<div am-Row>
    <div am-Column="4">Thirds</div>
    <div am-Column="4">Thirds</div>
    <div am-Column="4">Thirds</div>
</div>
```
```css
[am-Row] { /* max-width, clearfixes */ }
[am-Column~="1"] { /* 1/12th width, floated */ }
[am-Column~="2"] { /* 1/6th width, floated */ }
[am-Column~="3"] { /* 1/4th width, floated */ }
[am-Column~="4"] { /* 1/3rd width, floated */ }
[am-Column~="5"] { /* 5/12th width, floated */ }
/* etc */
[am-Column~="12"] { /* 100% width, floated */ }
```

The first thing you will notice is the `am-` prefix. This is a core part of AM, and ensures that attribute modules *do not conflict with existing attributes*. You can use any prefix you like &dash; I've experimented with `ui-`, `css-` and others, but settled on `am-` for these examples. If HTML validity is important to you or your project, simply choose a prefix that begins with `data-`, the idea is the same.

The second thing you might notice is that values like `"1"`, `"4"` or `"12"` would make *terrible* class names &dash; they're far too generic and the chances of collisions would be high. But because we've defined our own namespace, in effect carving off a little place for us to work, we are free to use the most concise, meaningful tokens we choose.

## Flexibility with attribute values

So far, the differences are pretty minor. But since each module defines its own namespace, let's try a slightly different scheme for our values:

```html
<div am-Row>
    <div am-Column>Full</div>
</div>
<div am-Row>
    <div am-Column="1/3">Thirds</div>
    <div am-Column="1/3">Thirds</div>
    <div am-Column="1/3">Thirds</div>
</div>
```
```css
[am-Row] { /* max-width, clearfixes */ }
[am-Column] { /* 100% width, floated */ }
[am-Column~="1/12"] { /* 1/12th width */ }
[am-Column~="1/6"] { /* 1/6th width */ }
[am-Column~="1/4"] { /* 1/4th width */ }
[am-Column~="1/3"] { /* 1/3rd width */ }
[am-Column~="5/12"] { /* 5/12ths width */ }
/* etc */
```

Now we're able to use naming that makes sense for our domain &dash; a width of `1/3` makes immediate sense whereas `4` needs us to remember we're using a 12-column grid. But we've also been able to define a **default** style for all columns &dash; that is, the attribute `column` with no value is treated as a full-width column. And as a bonus, we've also been able to move repeated logic (the fact that columns are floated left) into this attribute rule.

## Styling both attributes and values

This is one of the key benefits of this approach. The *presence* of an attribute, e.g. `am-Button`, can and should be styled. The particular *values* of each attribute then alter and adapt these base styles.

In the grid example above, we're doing exactly that: the markup `am-Column="1/3"` matches *both* `[am-Column]` and `[am-Column~="1/3"]`, so the result is the base styles + variations. It gives us a way to capture the fact that *all columns are columns* without needing to duplicate classes or use SASS's `@extend` functionality.

## The zero-class approach to BEM modifiers

Back to our single-class vs multi-class patterns for BEM modifiers, AM gives us a zero-class option. For our button examples above, this is how the markup looks:

```html
<a am-Button>Normal button</a>
<a am-Button='large'>Large button</a>
<a am-Button='rounded'>Rounded button</a>
<a am-Button='large rounded'>Large rounded button</a>
```
``` css
[am-Button] { /* base button styles */ }
[am-Button~="large"] { /* large button styles */ }
[am-Button~="rounded"] { /* round button styles */ }
```

By creating a new Attribute Module `am-Button`, we can separate out the styles that are common to all buttons, to those that make a button large, to those that round a button's corners. Not only can we then freely combine these variations (e.g. `am-Button='large rounded'`), we can also target the *attribute itself* for any contextual overrides:

```css
header > nav > [am-Button] { background: none; }
```

Now it doesn't matter what variant of button we choose to use, or how many variants we choose to define, the point is that  *all buttons* will match the selector `[am-Button]`, so we know our override will be valid.

## The AMCSS Project

Myself, [Ben Schwarz](http://germanforblack.com/) and [Ben Smithett](http://bensmithett.com/) have begun work on a [formal specification](https://github.com/amcss/attribute-module-specification) for AM. If you'd like to read more about how these techniques extend to blocks, elements, breakpoints & more, head there, and if you have questions, please [raise an issue](https://github.com/amcss/attribute-module-specification/issues).

We've also started a documentation site with a wider range of AM examples at [amcss.github.io](http://amcss.github.io/). If you're interesting in contributing feedback, examples, edge-cases or would like us to point to your own AM libraries, please reach out to us [on GitHub](https://github.com/amcss/amcss.github.io).
