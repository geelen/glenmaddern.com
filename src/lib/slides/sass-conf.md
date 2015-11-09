### CSS Modules:
# From Extension to Composition 

#### —

by @glenmaddern

---

<meta slide="excellent"></meta>

#### First up
# Some context

---

<meta slide="excellent"></meta>

# <span className={styles.emoji}>💖</span>

---

<meta slide="dramatic"></meta>

## Today

* The problem with @extend
* How CSS Modules works
* Composition & Modular Style

---

<meta slide="dramatic"></meta>

#### Part 1:

# The problem 
#### with
# @extend

---

#### "What Nobody Told You About Sass’s @extend"
#### "Why You Should Avoid Sass @extend"
#### "Extending In Sass Without Creating A Mess"
#### "Sass doesn't create bad code. Bad coders do."

---

<meta slide="excellent"></meta>

## When @extend
# is <span className={styles.emoji}>👌</span>

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

<div data-bullet></div>

```css
.SubmitButton { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton SubmitButton--normal'>
  Submit
</button>

<button class='SubmitButton SubmitButton--danger'>
  Delete!
</button>
```

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>


```css
.SubmitButton { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

<div data-bullet></div>

```html
<button class='SubmitButton SubmitButton--normal'>
  Submit
</button>

<button class='SubmitButton SubmitButton--danger'>
  Delete!
</button>
```

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```css
.SubmitButton { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton SubmitButton--normal'>
  Submit
</button>

<button class='SubmitButton SubmitButton--danger'>
  Delete!
</button>
```

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normalBroken}>Submit</button>
  <button className={styles.examples.invalidBroken}>Delete!</button>
</div>

```css
.SubmitButton { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton--normal'>
  Submit
</button>

<button class='SubmitButton--danger'>
  Delete!
</button>
```

---

<meta slide="white"></meta>

# <span className={styles.emoji}>😡</span>

---

<meta slide="white"></meta>


## &lt;rant>
### The number of mistakes a new developer makes when learning to use a system is a **value judgement of the system**, not the developer 

---

<meta slide="white"></meta>

## "Sass doesn't create bad code. Bad coders do."

# <span className={styles.emoji}>🚮</span>
---

<meta slide="white"></meta>

## "Crafting beautiful output CSS with Sass"

# <span className={styles.emoji}>👬👫👭</span>

---

<meta slide="white"></meta>

## &lt;/rant>

#### and apologies for Roy for using his blog post as an example

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normalBroken}>Submit</button>
  <button className={styles.examples.invalidBroken}>Delete!</button>
</div>

```css
.SubmitButton { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton--normal'> Submit </button>
<button class='SubmitButton--danger'> Delete! </button>
```

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```css
button { /* COMMON STYLES */ }
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton--normal'> Submit </button>
<button class='SubmitButton--danger'> Delete! </button>
```

---

!TODO make sure this gif works

meta x-gif src="http://media0.giphy.com/media/CMvLdjfjQnQAg/giphy.gif"

---

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```scss
.SubmitButton { /* COMMON STYLES */ }                     ⏐
.SubmitButton--normal { 
  @extend .SubmitButton;
  /* BLUE COLOURS */
}
.SubmitButton--danger { 
  @extend .SubmitButton;
  /* RED COLOURS */
}
```

```html
<button class='SubmitButton--normal'> Submit </button>
<button class='SubmitButton--danger'> Delete! </button>
```

---


<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```css
.SubmitButton, .SubmitButton--normal, .SubmitButton--danger {
  /* COMMON STYLES */
}
.SubmitButton--normal { /* BLUE COLOURS */ }              ⏐
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton--normal'> Submit </button>
<button class='SubmitButton--danger'> Delete! </button>
```

---

```scss
.bacon-pancake { @extend .normal-pancake; }
```

<div data-bullet></div>

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---
```scss
.bacon-pancake { @extend .normal-pancake; }
```

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

<div data-bullet></div>

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---

```scss
.bacon-pancake { @extend .normal-pancake; }
```

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---

<div className={styles.demo}>
  <button className={styles.examples.cta}>Sign up!</button>
</div>

```scss
.Button--CallToAction {
  @extend .SubmitButton;
  color: fuchsia;
  &:hover {
    box-shadow: 0 0px 40px 10px currentColor;
  }
}
```

---

<div className={styles.demo}>
  <button className={styles.examples.cta}>Sign up!</button>
</div>

```scss
.BoxShadow--Obnoxious { 
  box-shadow: 0 0px 40px 10px currentColor;
}
.Button--CallToAction {
  @extend .SubmitButton;
  color: fuchsia;
  &:hover {
    @extend .BoxShadow--Obnoxious;
  }
}
```

---

```scss
.Button--CallToAction { 
  @extend .SubmitButton;
  &:hover { @extend .BoxShadow--Obnoxious; }
}
```

<div data-bullet></div>

### a CTA button<br/> ***is a*** normal submit button <br/> ***and a*** obnoxiously-shadowed-thing <br/> ***(when hovered)***

---

```scss
.Button--CallToAction { 
  @extend .SubmitButton;
  &:hover { @extend .BoxShadow--Obnoxious; }
}
```

### a CallToAction button<br/> ***is a*** normal submit button <br/> ***and a*** obnoxiously-shadowed-thing <br/> ***(when hovered)***
---

<meta slide="excellent"></meta>

### Problem #1

## @extend != "is a"

!TODO note: I'd consider this a leaky abstraction — what works for the simple cases breaks down with slightly more complex stuff

---

<meta slide="excellent"></meta>

## We need a better definition

---

<meta slide="examples"></meta>

```scss
.Button--CallToAction { 
  @extend .SubmitButton;
  &:hover { @extend .BoxShadow--Obnoxious; }
}
```

#### equivalent to:

```scss
.Button--CallToAction { @extend .SubmitButton; }
.Button--CallToAction:hover { @extend .BoxShadow--Obnoxious; }
```

---

```scss
.Button--CallToAction { @extend .SubmitButton; }
.Button--CallToAction:hover { @extend .BoxShadow--Obnoxious; }
```

Wherever you see `.SubmitButton` duplicate the rule with `.Button--CallToAction` replacing it

Wherever you see `.BoxShadow--Obnoxious` duplicate the rule with `.BoxShadow--Obnoxious` replacing it

---

!TODO: hungry hungry hippos background

### Problem #2

## hungry hungry @extend

---

TODO: show 5 rules for SubmitButton

---

TODO: show bloat for 5 rules for SubmitButton with 3 variants

---

TODO: name & shame someone (RyanAir?)

---

### Problem #3

## Limitations

---

TODO: media queries (unless there's a solution out there?)

---

TODO: problem with @extend is that the benefits are useful (not having to duplicate classes in your markup) but the abstraction is wrong

---
<meta slide="dramatic"></meta>

#### Part 2:

# CSS Modules 
### What happens when your markup is *dynamic?*

---

TODO: This is HTML.
---

TODO: How many people actually write it?
---

TODO: List all the preprocessors (Jade, Dust, ERB, HAML, Slim, Mustache, Angular, Handlebars (JQuery), HTMLBars (Ember), React   

---
TODO: Let's focus on React. React has been the area of most rapid progress

---

### **@**Vjeux's 7 Problems <small className={styles.small}>(of CSS)</small>
* Global Namespaces
* Dependencies
* Dead Code Elimination
* Minification
* Sharing Constants
* Non-deterministic Resolution
* Isolation

---

> It turns out that if you **write your styles in JS**, a large class of really hard problems with CSS just disappear instantly.

https://speakerdeck.com/vjeux/react-css-in-js

#### February 4, 2009

---

<meta bg x-gif src="http://stream1.gifsoup.com/webroot/animatedgifs/483186_o.gif" n-times="0.79" align="bottom"></meta>

## The CSS Community

---

## CSS in JS

* Inline styles
* React Style
* jsxstyle
* Radium
* jss

---

> [*We wanted to*] help you and your team **maintain as much of your current knowledge** of CSS and your product, but become vastly more comfortable and more productive.

http://glenmaddern.com/articles/css-modules

#### August 19, 2015
---
TODO: A slide or two about "Componentisation"

---
TODO: The key for CSS Modules is the require/import statement

* When each part of your UI, in React's case a component, can import its own stylesheet, it changes the way you think about how your styles relate to each other

---
TODO: Globalness is weird

---
TODO: Local scoped class names

---

## Make your markup dynamic and simplify your styles
## Put them both to the work

---
How do you use it?
* Webpack config
* Show it running Sass as well
* Maybe Jade example??
---

---

<meta slide="examples"></meta>

```css
/* CSS */
.normal {
  /* styles here... */
}
```

<div data-bullet></div>

```css
/* ICSS */
:export {
  normal: normal_f34f7fa0;
}
.normal_f34f7fa0 {
  /* styles unchanged... */
}
```

```js
import styles from './submit-button.css';
// { normal: "normal_f34f7fa0" }
```

---

<meta slide="examples"></meta>

```css
/* CSS */
.normal {
  /* styles here... */
}
```

```css
/* ICSS */
:export {
  normal: normal_f34f7fa0;
}
.normal_f34f7fa0 {
  /* styles unchanged... */
}
```
<div data-bullet></div>

```js
import styles from './submit-button.css';
// { normal: "normal_f34f7fa0" }
```

---

<meta slide="examples"></meta>

```css
/* CSS */
.normal {
  /* styles here... */
}
```

```css
/* ICSS */
:export {
  normal: normal_f34f7fa0;
}
.normal_f34f7fa0 {
  /* styles unchanged... */
}
```

```js
import styles from './submit-button.css';
// { normal: "normal_f34f7fa0" }
```
---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.normal_f34f7fa0 {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

```html
<!-- Renders this HTML -->
<button class="normal_f34f7fa0">Submit</button>
```


---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.components_submit_button__normal {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

```html
<!-- Renders this HTML -->
<button class="components_submit_button__normal">Submit</button>
```
---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.normal\(components\/submit\/button.css\:43\) {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

```html
<!-- Renders this HTML -->
<button class="normal(components/submit/button.css:43)">Submit</button>
```

---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.f34f7fa0 {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

```html
<!-- Renders this HTML -->
<button class="f34f7fa0">Submit</button>
```
---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.💖 {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

```html
<!-- Renders this HTML -->
<button class="💖">Submit</button>
```

---

<meta slide="dramatic"></meta>

![](https://dl.dropboxusercontent.com/spa/a9i2yebxv7pg2ex/in3l8l9l.png)

---

TODO "Once we'd built this mechanism, we realised we didn't just have to export one class!"

---
<meta slide="dramatic"></meta>

#### Part 3:

# Composition
#### &
# Modular Style

---
<meta slide="dramatic"></meta>

## Rewrite your markup not your CSS


---

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal {
  @extend .SubmitButton;
  /* BLUE */
}
.SubmitButton--danger {
  @extend .SubmitButton;
  /* RED */
}
​
​
<div data-bullet></div>

```css

```
------

<meta slide="white-sideways"></meta>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal {
  @extend .SubmitButton;
  /* BLUE */
}
.SubmitButton--danger {
  @extend .SubmitButton;
  /* RED */
}
​```

```css
.base {
  /* COMMON STYLES */
}
.normal {
  composes: base;
  /* BLUE */
}
.danger {
  composes: base;
  /* RED */
}
```

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```html
<button className={styles.normal}>Submit</button>

<button className={styles.danger}>Delete!</button>
```

---

<meta slide="white"></meta>

```css


⏐

```

```css
                                            ⏐
                                     
.base { }
.normal { composes: base; }
.danger { composes: base; }
```

---

<meta slide="white"></meta>

```css


⏐

```

```css


.base_81f12d56 { }
.normal_f34f7fa0 { composes: base_81f12d56; }
.danger_b7d2ad6f { composes: base_81f12d56; }
```

---
<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: normal_f34f7fa0;
  danger: danger_b7d2ad6f;
}

.base_81f12d56 { }
.normal_f34f7fa0 { composes: base_81f12d56; }
.danger_b7d2ad6f { composes: base_81f12d56; }
```

---

<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: normal_f34f7fa0 base_81f12d56;
  danger: danger_b7d2ad6f base_81f12d56;
}
                                            ⏐
.base_81f12d56 { }
.normal_f34f7fa0 { }
.danger_b7d2ad6f { }
```

---

<meta slide="examples"></meta>

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.danger}>Delete!</button>
```

<div data-bullet></div>

```html
<!-- Renders this HTML -->
<button class="base_81f12d56 danger_b7d2ad6f">Delete!</button>
```

---

<meta slide="examples"></meta>

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.danger}>Delete!</button>
```

```html
<!-- Renders this HTML -->
<button class="base_81f12d56 danger_b7d2ad6f">Delete!</button>
```

---

### Break the
## 1-to-1 mapping
### between entities and classes

---

<meta slide="examples"></meta>

```css
/* colors.css */
.blue {
  color: hsl(210, 61%, 31%);
}
.light-blue-bg {
  background: hsla(210,61%,51%,0.1);
}
```

```css
/* submit-button.css */
.base {
  /* COMMON STYLES */
}
.normal {
  composes: base;
  composes: blue light-blue-bg from "./colors.css";
}
```

---
<meta slide="examples"></meta>

```css
.blue_c22950a8 {
  color: hsl(210, 61%, 31%);
}
.light-blue-bg_ea7f0091 {
  background: hsla(210,61%,51%,0.1);
}
.base_81f12d56 { /* COMMON STYLES */ }
.normal_f34f7fa0 {}
```

```html
<!-- Renders this HTML -->
<button class="base_81f12d56
               blue_c22950a8 
               light-blue-bg_ea7f0091
               normal_f34f7fa0">
  Submit
</button>
```

---

<meta slide="examples"></meta>

```sh
styles/
    shared/
        colors.css
        typography.css
        layout.css
        borders.css
        dividers.css
        sizes.css
        ...
    components/
        submit-button.css
        nav-bar.css
        signup-form.css
        ...
```

---

## Single Purpose Files
#### full of
## Single Purpose Classes

---

<meta slide="examples"></meta>

```css
.article {
  composes: flex vertical centered from "./layout.css";
}

.masthead {
  composes: serif bold 48pt centered from "./typography.css";
  composes: m1-bottom p1-left p1-right from "./layout.css";
}
```

```html
<article class="flex_e17427aa vertical_a17d1205 centered_86687352">
  <div class="serif_85db3038 bold_f845c6a12 48pt_bb1f8d2d
              centered_d0c84 m1-bottom_8fe3
              p1-left_0c7b6e p1-right_6cd78">
    Content...
  </div>
</article>
```
---

<meta slide="examples"></meta>

```css
.article {
  composes: flex vertical centered from "./layout.css";
}

.masthead {
  composes: serif bold 48pt centered from "./typography.css";
  composes: m1-bottom p1-left p1-right from "./layout.css";
}
```

```html
<article class="${styles.article}">
  <div class="${styles.masthead}">
    Content...
  </div>
</article>
```

<div data-bullet></div>

```
<article class="flex_e17427aa vertical_a17d1205 centered_86687352">
```

---

## Define an API<br/>into your styles
### for your markup to use

---

<meta slide="dramatic"></meta>

## Modular Style?

---

<meta slide="dramatic"></meta>

## Future work

* Site-wide theming
* Publishing reusable components w/ CSS
* Non-JS ecosystems

---

<meta slide="dramatic"></meta>

## Flexibility

---

<meta slide="dramatic-image"></meta>

## Atomic Design

![](https://d262ilb51hltx0.cloudfront.net/max/800/1*j1P0pjQtl36QJavv8lHdyw.png)

#### Brad Frost, 2013

---

<meta slide="dramatic-image"></meta>

## Atomic Design

![](/assets/images/components-not-atoms.png)

#### Brad Frost, 2013

---

<meta slide="dramatic"></meta>

## Modular Style

#### =

## Composable Classes

---

## <span className={styles.emoji}>😎</span> CSS Modules <span className={styles.emoji}>😎</span>

#### github.com/orgs/css-modules/people

* Mark Dalgleish **@markdalgleish**
* Tobias Koppers **@sokra**
* Josh Joshnston **@joshwnj**
* Josh Gillies **@joshgillies**
* Alexey Litvinov **@sullenor**

---

<meta slide="left"></meta>

## Thanks!

#### —

* glenmaddern.com/slides/from-extension-to-composition
* github.com/css-modules/css-modules
* glenmaddern.com/articles/css-modules

#### —

### **@glenmaddern**

---
