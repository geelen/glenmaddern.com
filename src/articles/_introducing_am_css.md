A few months ago, I read an article by Harry Roberts where he introduced an interesting concept for working with related classes in CSS. In his [article](http://csswizardry.com/2014/05/grouping-related-classes-in-your-markup/), he describes the use of the `[]` characters in class attributes to help understand their purpose at a quick glance. He presents this example:

````markup
<div class="[ foo  foo--bar ]  [ baz  baz--foo ]">
````

I must admit, I was initially extremely uncomfortable with the technique. The idea of classes with names like `[` and `]`, that match no CSS, that are repeated within a single class attribute, that are purely designed for *humans* rather than the browser seemed, well, wrong. I still think that, actually, but it got me thinking about markup & semantics much more deeply, so thanks Harry!

As I looked into it, several people were suggesting similar approaches, such as using `/` ([Ben Everard](http://beneverard.co.uk/blog/using-slashes-within-the-html-class-attribute/)), or `|` ([Stephen Nolan](https://twitter.com/sn0lan/status/439384690680942592)), but the feeling of unnaturalness persisted. All I could think was:

> How do you have so many classes that it seems reasonable to propose something like this?

Because, let's be clear, this **is not reasonable**. This is a tiny layer of veneer on a fundamentally misguided practice that I call ***class proliferation***

## More vs fewer classes - a brief aside

The crazy thing is, while I immediately knew I didn't like seeing so many classes on a single element, people like Harry were just so damn *persuasive* with appeals to things like OOCSS and the [Single Responsibility Principal](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/), and from my own experience building a series of sites of increasing complexity.

I had previously adopted a version of BEM that emphasised isolation over reuse, as it suited the kinds of projects I was doing. But the tradeoff there is *fragmentation* - when you find yourself with 10 different link styles, 12 shades of blue, etc. Nicole Sullivan, creator of OOCSS, gave a fantastic [presentation](https://www.youtube.com/watch?v=0NDyopLKE1w) last year in Melbourne that spoke exactly to that problem far better than I can here.

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
```css
.btn { /* button styles */ }
.btn--large {
  @extend large-type;
}
.btn--rounded {
  @extended rounded-borders;
}
```

That worked reasonably well, and allowed me to blend the ease of by-default style isolation that BEM gives you and keep a handle on fragmentation at the same time. And so things were ok, for a while.

## Modifiers: how the -- kills BEM

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

The difference here is whether `btn--large` has *any meaning* if it is present without `btn`. The single-class pattern says yes, which avoids the pitfall of them not being present together. It's also less repetitious, and with SASS's @extend functionality it isn't much of a burden on the CSS side, but it has a truly fatal flaw.

## Contextual overrides

Let's say your buttons in your header nav don't have a background colour. With multi-class modifiers, all buttons, large or small, rounded or square, etc, still include the class `btn`, so you can target them like so:

```css
header > nav > .btn { background: none; }
```

With the single-class pattern, and assuming we're using SASS, we have this:

```css
header > nav {
  .btn, .btn--large, .btn--rounded { background: none; }
}
```

Obviously, this is not ideal - adding another button style means adding another override anywhere that needs it. So generally people suggest the multi-class pattern as a result. But there's an alternative.

## Why the fuck are we using classes?

Forgive my bluntness, but can anyone give me a good reason why classes are usually the *only* place we add styling information? Whether it's more of a BEM-style isolated styling hook or an OOCSS-style reusable buidling block, it still has to find a unique name inside this soup of tokens we use as classes. And we've taken to using `js-` to separate out the JS-specific hooks from the styling ones, and libraries like SuitCSS use `u-` to delineate utilities, but it's still the one big **global namespace**. And that's a symptom of a wider problem.

It occurred to me a little while ago that maybe we should look for ways to break away from the humble `class=''` tag as soon as we can.

## Welcome ~=, the magic selector

It turns out browsers since IE7 have had a particularly powerful CSS rule called the *space-separated attribute selector*, described [here](http://css-tricks.com/attribute-selectors/#rel-space) on CSS Tricks. It matches arbitrary attribute values, separated by spaces, just like classes. So the following two lines of CSS are equivalent:

```css
.dat-markup { /* dem rules */ };
[class~='dat-markup'] { /* dem rules */ };
```

In the same way that `<div class='a b c'>` doesn't care which order the `a`, `b` and `c` are in, or what else is present, neither does the `~=` selector. But `~=` isn't limited to the `class` attribute. It can work on anything.

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
