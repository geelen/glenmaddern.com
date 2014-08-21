A few months ago, I read an article by Harry Roberts where he introduced an interesting concept for working with related classes in CSS. In his [article](http://csswizardry.com/2014/05/grouping-related-classes-in-your-markup/), he describes the use of the `[]` characters in class attributes to help understand their purpose at a quick glance. He presents this example, arguing that it makes the class declaration more *scannable* - that is, more understandable at a glance:

````markup
<div class="[ foo  foo--bar ]  [ baz  baz--foo ]">
````

I must admit, I was initially extremely uncomfortable with the technique. The idea of classes with names like `[` and `]`, that match no CSS, that are repeated within a single class attribute, that are purely designed for *humans* rather than the browser seemed, well, wrong. I still think that, actually, but it got me thinking about markup & semantics much more deeply, so thanks Harry!

As I looked into it, several people were suggesting similar approaches, such as using `/`&nbsp;([Ben Everard](http://beneverard.co.uk/blog/using-slashes-within-the-html-class-attribute/)), or `|`&nbsp;([Stephen Nolan](https://twitter.com/sn0lan/status/439384690680942592)), but the feeling of unnaturalness persisted. All I could think was:

> <span _type='h5 semibold'>How do you have so many classes that you need *more* classes to make things readable?</span>

Because, let's be clear, **this is madness**. Readable, scannable HTML is a worthy goal, but these kinds of techniques show that there's something fundamentally broken with class-based styling.

## More vs fewer classes - a brief aside

The surprising thing was, while the presence of so many classes in the markup was unsettling to me, people like Harry were just so damn *persuasive*. Appealing to things like OOCSS and the [Single Responsibility Principal](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/), and from my own experience building a series of sites of increasing complexity, I could tell there was value in the *decomposition* of styling behaviour, but it wasn't until recently that I found a way to implement it.

I had previously adopted a version of BEM that emphasised **isolation over reuse** &dash; each new block inherits no styling by default, allowing components to be developed separately and avoids the risk of breaking something elsewhere on the site. But the tradeoff there is *fragmentation* &dash; when you find yourself with 10 different link styles, 12 shades of blue, 18 subtly different button styles etc. Nicole Sullivan, creator of OOCSS, gave a fantastic [presentation](https://www.youtube.com/watch?v=0NDyopLKE1w) last year in Melbourne that spoke exactly to that problem far better than I can here.

It felt like the accepted solution was to dive deeper into the capabilities of CSS pre-processors in order to have the isolation of BEM but the consistency of OOCSS. For example, instead of this:

```markup
<a class='btn large rounded'>
```
```css
.btn { /* button styles */ }
.large { /* global large-type modifier */ }
.rounder { /* global rounded-border modifier */ }
```

you would have:

```markup
<a class='btn btn--large btn--rounded'>
```
```scss
.btn { /* button styles */ }
.btn--large {
  @extend large-type;
}
.btn--rounded {
  @extend rounded-borders;
}
```

I ended up with files full of mixins and placeholders like `_typography.scss` and `_brand.scss`, which allowed me to keep a handle on fragmentation, but also maintain by-default style isolation for each new component. And so things were ok, for a while.

## Modifiers: how the M breaks BEM

Doing any research on the topic of CSS class naming & maintainability, you're bound to come across Nicolas Gallagher's excellent article ["About HTML semantics and front-end architecture"](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/). One part in particular caught my attention, which he calls 'single-class' vs 'multi-class' patterns for modifiers. To summarize, the two potential versions of your HTML look like this:

```markup
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

```markup
<a class='btn--large'>
```

```css
[class^='btn'] { /* base button styles */ }
.btn--large { /* large button styles */ }
header > nav > [class^='btn'] { /* Overrides for all buttons */ }
```

This achieves easy contextual overrides for a single-class pattern, but is fatally flawed from the start. Most damningly, if *another* class appears before `btn--large`, the prefix selector doesn't match, and everything breaks. Also, there's no obvious way of permitting multiple variants such as `btn--large--rounded`.

I appreciate the inventiveness of this approach, but it's a dead end. And it's where I got stuck, too, until I asked myself one question.

## Why the fuck are we using classes?

Forgive my bluntness, but can anyone give me a good reason why classes are the *only* place we add styling information? Here's what the [HTML living standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#classes) has to say: 

> The attribute, if specified, must have a value that is a set of space-separated tokens representing the various classes that the element belongs to.
> <br><br>
> There are no additional restrictions on the tokens authors can use in the class attribute, but authors are encouraged to use values that describe the nature of the content, rather than values that describe the desired presentation of the content.

So yes, it makes perfect sense that we use classes to describe 'the nature of the content', but it feels like we're asking more of the humble class attribute than it can give us. For example, we use BEM-style names like `primary-nav__sub-nav--current`, as well as utilities like `u-textTruncate` or `left` and JavaScript hooks like `js-doSomething`, and so we spend a lot of time coming up with readable names that don't conflict with any others. It's manageable through convention & discipline, sure, but we're operating in a **global namespace**, and no amount of naming conventions can change that. But before we talk about AM, my proposed solution, we need to brush up on a lesser-known feature of CSS.

## Welcome ~=, the magic selector

It turns out browsers since IE7 have had a particularly powerful CSS rule called the *space-separated attribute selector*, described [here on CSS Tricks](http://css-tricks.com/attribute-selectors/#rel-space). It matches arbitrary attribute values, separated by spaces, just like classes. So the following two lines of CSS are equivalent:

```css
.dat-markup { /* dem rules */ };
[class~='dat-markup'] { /* dem rules */ };
```

In the same way that `<div class='a b c'>` doesn't care which order the `a`, `b` and `c` are in, or what else is present, neither does the `~=` selector. But `~=` isn't limited to the `class` attribute. It can work on anything.

# Attribute Modules

Attribute Modules, or AM, at its core is about *defining namespaces* for your styles to live in. Let's begin with a simple example, the grid:

## The zero-class approach

Instead of the single-class vs multi-class pattern, I present a zero-class one. For our button examples above, this is how the markup looks:

```markup
<div am-btn>Normal button</div>
<div am-btn='large'>Large button</div>
<div am-btn='rounded'>Rounded button</div>
<div am-btn='large rounded'>Large rounded button</div>
```
``` css
[am-btn] { /* default button styles here */ }
[am-btn~="large"] { @extend large-type; }
[am-btn~="rounded"] { @extend rounded-borders; }
```

I've defined a new *attribute* called `am-btn`, that maps quite well to the `.btn` of the previous examples. But the variations on the base button style are now captured inside the attribute *value*. In effect, the attribute `am-btn` has now declared a new *namespace* for variations to apply within. The words `large` and `rounded` have no *inherent* styles, they can only apply if found within the attribute `am-btn`.

Moreover, since the *presence* of the attribute `am-btn` can itself be a styling hook, there is now a selector that will be matched for any button. No matter how many variations of buttons appear in the future, the following *contextual override* will still be valid:

```css
header > nav > [am-btn] { background: none; }
```
