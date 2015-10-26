# The Rise of Modular Style

&nbsp;

by @glenmaddern

---

<meta slide="dramatic"></meta>

#### Part 1

### Human interfaces 
#### vs
### Machine interfaces

---


<meta bg x-gif src="http://i.imgur.com/7MZsYaH.gif" n-times="1" bg-pos="75% 50%" align="bottom"></meta>

## September 2008

---

# JavaScript
#### in 2008

---

```javascript
// No imports needed, since it's global...
window.NAMESPACE = window.NAMESPACE || {};

window.NAMESPACE.Widgets = window.NAMESPACE.Widgets || {};

window.NAMESPACE.Widgets.FooBar = function() {
  ...
};
```

---

![](https://dl.dropboxusercontent.com/spa/a9i2yebxv7pg2ex/jb8vivcf.png)

---

# V8
#### Sept 2, 2008

---

# ServerJS
#### Jan 29, 2009

### Kevin Dangoor


---

> JavaScript needs a **standard way to include other modules** and for those modules to live in discreet namespaces. There are easy ways to do namespaces, but there’s no standard programmatic way to load a module (once!).

http://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/

---


> Server side JavaScript is very fragmented. A script that accesses files can't be used without modification on both rhino and v8. Spidermonkey and JavaScriptCore can't both load in additional modules in the same way. A JavaScript web framework is very much tied to its interpreter and is often **forced to create a bunch of APIs that Python, Ruby and Java programmers take for granted**.

https://wiki.mozilla.org/ServerJS/Introduction 

#### Feb 4, 2009

---

## Interoperable JavaScript Modules
#### March 21, 2009

### Kris Kowal

---

> This year has begun with a combination of wondrous events in the JavaScript theatre. I've been struggling to promote the idea of module system in JavaScript for several years now. **There has been a sudden explosion of progress.**

http://askawizard.blogspot.com.au/2009/03/interoperable-javascript-modules.html

---

# NodeJS
#### Feb 2009

### Ryan Dahl

https://github.com/joyent/node/commits/master?page=308

---

# CommonJS
#### July 2009

---

## CommonJS moved on
### (async, browser environments, etc)
## NodeJS didn't

---

## "Whatever Node Does"

### became the standard

!TODO expand here with more quotes?

---

## "CommonJ-esque"

```javascript
var x = require('x');
module.exports = y;
```

&nbsp;

https://github.com/joyent/node/issues/5132#issuecomment-15436824

#### James Halliday, 2013

---

```javascript
window.NAMESPACE = window.NAMESPACE || {};
window.NAMESPACE.Widgets = window.NAMESPACE.Widgets || {};
window.NAMESPACE.Widgets.FooBar = function() {
  ...
};
```

*vs*

```javascript
/* namespace/widgets/foobar.js */

var dependency = require('./dependency.js');

module.exports = function() {
  ...
};
```

---

![](https://dl.dropboxusercontent.com/spa/a9i2yebxv7pg2ex/l6-aq4eu.png)

---

<meta bg x-gif src="/assets/images/bt7.gif" n-times="0.8" speed="0.6"></meta>

## "Sweet JavaScript History Lesson!" 

---

```js
var x = require('x');
module.exports = y;
```

---

### We took a language that had **a single global context** and made it multi-file

### We took a language that had **no mechanism for sharing code** beyond globals & made 175,000 packages on NPM

---

# Browserify

#### September 5, 2011

http://www.catonmat.net/blog/browserling-open-sources-90-node-modules/

---

```js
/* namespace/widgets/foobar.js */

var dependency = require('./dependency.js');

module.exports = function() {
  ...
};
```

---

```js
{
  1: /* dependency.js */,
  2: [function (require, module, exports) {
    var dependency = require('./dependency.js');
    module.exports = function () {
      ...
    };
  
  }, {"./dependency.js": 1}]
}
```

---

### You can ***change the human interface*** of a language without needing to change the machine interface. 

---

# CSS?

---

# CSS

- Sass
- LESS
- PostCSS

---

### None of these change the
## global nature
### of CSS

---

# Interoperable CSS

#### June 21, 2015

---

## ICSS

* Compile target, not a human interface
* Each file stands alone, can import others
* Unlocks the power of a loader like Webpack/JSPM/Browserify
* Produces *both* CSS and JS

---

## ICSS syntax
```css
:import("./dependency.css") {
  import-alias: export-from-dependency;
}
:export {
  exported-token: local-alias;
}

/* normal, global CSS from here on */
```

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
.MyHeader {}
.MyHeader__MyComponent {}
.MyHeader__MyComponent__MySomethingElse--large {}
.MyHeader__MyComponent__MySomethingElse--small {}
```

<div data-bullet></div>

```js
window.NAMESPACE = window.NAMESPACE || {};
window.NAMESPACE.Widgets = window.NAMESPACE.Widgets || {};
window.NAMESPACE.Widgets.FooBar = function() {}
```

---

<meta slide="examples"></meta>

```css
.MyHeader {}
.MyHeader__MyComponent {}
.MyHeader__MyComponent__MySomethingElse--large {}
.MyHeader__MyComponent__MySomethingElse--small {}
```

```js
window.NAMESPACE = window.NAMESPACE || {};
window.NAMESPACE.Widgets = window.NAMESPACE.Widgets || {};
window.NAMESPACE.Widgets.FooBar = function() {}
```
---

<meta slide="examples"></meta>

```css
.header {}
.component {}
.large {}
.small {}
```

```js
import styles from './style.css'
```

---

## Humans <span className={styles.emoji}>😎</span>
## Machines <span className={styles.emoji}>🤖</span>

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

<meta slide="dramatic"></meta>

# <span className={styles.emoji}>😎</span>

---

<meta slide="dramatic"></meta>

#### Part 2

## Modular Style

---

# Isolation

### ***vs***

# Reuse

---

<meta slide="excellent"></meta>

# Isolation

---

### Class names are the
# Local Variables
### of your CSS

---

```js
function() {
  var myproject_mywidget_myclass_var1 = "omg stop"
}
```

---

<meta bg="https://imgflip.com/s/meme/Bill-Murray-Golf.jpg" bg-pos="0 20%" align="top"></meta>

# Nope

---

### **CSS Modules** — Part One

## Local-by-default

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
</div>

<div data-bullet></div>

```css
/* components/submit-button.css */
.SubmitButton--normal {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
  color: hsl(210, 61%, 31%);
  background: hsla(210, 61%, 51%, 0.1);
}
```

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
</div>

```css
/* components/submit-button.css */
.SubmitButton--normal {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
  color: hsl(210, 61%, 31%);
  background: hsla(210, 61%, 51%, 0.1);
}
```
---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
</div>

```css
/* components/submit-button.css */
.normal {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
  color: hsl(210, 61%, 31%);
  background: hsla(210, 61%, 51%, 0.1);
}
```

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

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
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

<meta slide="sideways"></meta>

```css
.header_v2_final {
  color: red;
  
  h1 {
    font-size: 40px;
  }
  :nth-child(2) {
    margin-bottom: 2px;
  }
}
.Ugh_um_what_is_this {
  font-size: 2em;
}
```

<div data-bullet></div>

```css
.thing {
  color: red;
}
.h1 {
  font-size: 40px;
}
.second-thing {
  margin-bottom: 2px;
}

.other-thing {
  font-size: 2em;
}
```
---

<meta slide="sideways"></meta>

```css
.header_v2_final {
  color: red;
  
  h1 {
    font-size: 40px;
  }
  :nth-child(2) {
    margin-bottom: 2px;
  }
}
.Ugh_um_what_is_this {
  font-size: 2em;
}
```

```css
.header {
  color: red;
}
.h1 {
  font-size: 40px;
}
.second-thing {
  margin-bottom: 2px;
}

.that-weird-bit-at-the-end {
  font-size: 2em;
}
```
---

### **Target everything directly &**<br/>**stop leaking styles**
### 👍

---

<meta slide="excellent"></meta>

# Reuse

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Error!</button>
</div>



<div data-bullet></div>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal {
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.SubmitButton--error {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
```

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Error!</button>
</div>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal {
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.SubmitButton--error {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
```

---

<meta slide="white"></meta>

```html
<button class='SubmitButton SubmitButton--normal'>
  Submit
</button>

<button class='SubmitButton SubmitButton--error'>
  Submit
</button>
```

---

<meta slide="excellent"></meta>

## Good abstractions
### should save you cognitive load

---

### **CSS Modules** — Part Two

## Composition

---

<meta slide="white-sideways"></meta>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal {
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.SubmitButton--error {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
​
​
```

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
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.SubmitButton--error {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
​
​
```

```css
.base {
  /* COMMON STYLES */
}
.normal {
  composes: base;
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.error {
  composes: base;
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
```
---

<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: base_81f12d56 normal_f34f7fa0;
  error: base_81f12d56 error_b7d2ad6f;
}

.base_81f12d56 { /* COMMON STYLES */ }
.normal_f34f7fa0 {
  color: hsl(210, 61%, 31%);
  background: hsla(210,61%,51%,0.1);
}
.error_b7d2ad6f {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
```
---

<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: base_81f12d56 normal_f34f7fa0;
  error: base_81f12d56 error_b7d2ad6f;
}
```

<div data-bullet></div>

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.error}>Error!</button>
```

```html
<!-- Renders this HTML -->
<button class="base_81f12d56 error_b7d2ad6f">Error!</button>
```

---

<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: base_81f12d56 normal_f34f7fa0;
  error: base_81f12d56 error_b7d2ad6f;
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.error}>Error!</button>
```

<div data-bullet></div>

```html
<!-- Renders this HTML -->
<button class="base_81f12d56 error_b7d2ad6f">Error!</button>
```

---

<meta slide="examples"></meta>

```css
:export {
  base: base_81f12d56;
  normal: base_81f12d56 normal_f34f7fa0;
  error: base_81f12d56 error_b7d2ad6f;
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.error}>Error!</button>
```

```html
<!-- Renders this HTML -->
<button class="base_81f12d56 error_b7d2ad6f">Error!</button>
```

---

## Multi-file composition

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

<meta slide="excellent"></meta>

## **Isolation & reuse**
### 👍


---

<meta slide="dramatic"></meta>

#### Part 3
## Conclusion

---

## CSS Modules

### *vs ?*

## Sass

---

## **CSS Modules**

### 💖

## Sass

---

## <span className={styles.emoji}>😎</span> CSS Modules <span className={styles.emoji}>😎</span>

### 💔

## <span className={styles.emoji}>🔥</span> Sass <span className={styles.emoji}>🔥</span> 

---

## Good design
### should lead you to good practice

---

## Good abstractions
### should save you cognitive load

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

**glenmaddern.com/slides/interoperable-css-eu**

github.com/css-modules/css-modules

glenmaddern.com/articles/css-modules

github.com/css-modules/icss

### **@glenmaddern**

---
