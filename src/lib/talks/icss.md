# Interoperable CSS

&nbsp;

by @glenmaddern

---

!TODO battlestar background

### All this has happened before.
### All this will happen again.

---

## September 1st 2008

---

![](https://upload.wikimedia.org/wikipedia/commons/c/c6/IPhone_PSD_White_3G.png)

---

![](https://upload.wikimedia.org/wikipedia/en/d/d6/Tropic_thunder_ver3.jpg)

---

![](https://dl.dropboxusercontent.com/u/1349167/GFC.png)

---

![](https://dl.dropboxusercontent.com/u/1349167/bieber.png)

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

## September 2nd 2008

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

> JavaScript needs a **standard way to include other modules** and for those modules to live in discreet namespaces. There are easy ways to do namespaces, but there’s no standard programmatic way to load a module (once!). This is really important, because server side apps can include a lot of code and will likely mix and match parts that meet those standard interfaces.

http://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/

---


> Server side JavaScript is very fragmented. A script that accesses files can't be used without modification on both rhino and v8. Spidermonkey and JavaScriptCore can't both load in additional modules in the same way. A JavaScript web framework is very much tied to its interpreter and is often **forced to create a bunch of APIs that Python, Ruby and Java programmers take for granted**.

https://wiki.mozilla.org/ServerJS/Introduction 

#### Feb 4, 2009

---

# Interoperable JavaScript Modules
#### March 21, 2009

### Kris Kowal

---

> This year has begun with a combination of wondrous events in the JavaScript theatre. I've been struggling to promote the idea of module system in JavaScript for several years now. **There has been a sudden explosion of progress.**

http://askawizard.blogspot.com.au/2009/03/interoperable-javascript-modules.html

---

# NodeJS
#### Feb 16, 2009

### Ryan Dahl

https://github.com/joyent/node/commits/master?page=308

---

# CommonJS

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

exports.FooBar = function() {
  ...
};
```

---

## CommonJS moved on
### (async, browser environments, etc)

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

![](https://dl.dropboxusercontent.com/spa/a9i2yebxv7pg2ex/l6-aq4eu.png)

---

!TODO *nice* image/gif here

## "Sweet JavaScript History Lesson!" 

---

# CSS

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

## CSS in JS?

* Inline styles
* React Style
* jsxstyle
* Radium
* jss

---

> [*We wanted to*] help you and your team **maintain as much of your current knowledge** of CSS and your product, but become vastly more comfortable and more productive.

http://glenmaddern.com/articles/css-modules

!TODO That's the biggest point of difference I want to make between us and the other teams.

---

# CSS Modules

---

# Interoperable CSS?

---

# CSS Modules

### 🔽

# ICSS

---

### **CSS Modules** is what we wanted.<br/>**ICSS** is how we did it.

---

#### Problem #1
## Global namespace

---

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

```css
.MyHeader {}
.MyHeader__MyComponent {}
.MyHeader__MyComponent__MySomethingElse--large {}
.MyHeader__MyComponent__MySomethingElse--small {}
```

<div></div>

```js
window.NAMESPACE = window.NAMESPACE || {};
window.NAMESPACE.Widgets = window.NAMESPACE.Widgets || {};
window.NAMESPACE.Widgets.FooBar = function() {}
```

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

## Local-by-default

---

<meta slide="white"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
</div>

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
  background-color: hsla(210, 61%, 51%, 0.1);
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
  background-color: hsla(210, 61%, 51%, 0.1);
}
```

---
<meta slide="examples"></meta>

```css
/* components/submit-button.css */
.normal {
  /* styles here... */
}
```

```js
/* components/submit-button.jsx */
import styles from './submit-button.css';

return <button className={styles.normal}>Submit</button>
```

<div data-bullet></div>

```html
<!-- Renders this HTML -->
<button class="normal_f34f7fa0">Submit</button>
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

<div data-bullet></div>

```html
<!-- Renders this HTML -->
<button class="normal_f34f7fa0">Submit</button>
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
._components_submit_button__normal {
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
<button class="_components_submit_button__normal">Submit</button>
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
.normal {
  /* styles here... */
}
```

```css
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
# :export

```css
:export {
  localName: obfuscated_string;
}
```

---

## Loaders + ICSS

### Loads an ICSS file and produces *both* CSS and JS
---
* Webpack (css-loader)
* JSPM (jspm-loader-css-modules)
* Browserify (cssmodulesify)
* NodeJS (css-modules-require-hook)

---

### **7 Problems**
* Global Namespaces ✅
* Dependencies
* Dead Code Elimination
* Minification
* Sharing Constants
* Non-deterministic Resolution
* Isolation

---

## Isolation
### is largely *solved* by fixing naming

---

<meta slide="sideways"></meta>

```css
.My_um_thing {
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
### **7 Problems**
* Global Namespaces ✅
* Dependencies
* Dead Code Elimination
* Minification
* Sharing Constants
* Non-deterministic Resolution
* Isolation ✅
---
### "Sharing Constants"
# Reuse
---

---

> ***The language*** needs a standard way to include other modules and for those modules to live in discreet namespaces. There are easy ways to do namespaces...

```css
/* No imports needed, since it's global... */
.Namespace__Widgets__FooBar {
  /* ... */
}
```

---

```css
@import "variables.scss";
@import "mixins.scss";

.Namespace__Widgets__FooBar {
  @include some-widget();
  color: $primary;
}
```

---

> ***The language*** is very fragmented. A script that ***does something beyond the original design of the language*** can't be used without modification... A framework is very much tied to its interpreter and is often forced to create a bunch of APIs that ***other languages*** take for granted.

---

## :export

```css
:export {
  Nav: _nav_nav_afd97dfs867;
  Logo: _nav_logo_97fd867fsfg;
}
._nav_nav_afd97dfs867 { /* nav styles */ }
._nav_logo_97fd867fsfg { /* logo styles */ }
```

```js
import styles from './nav.css';
// styles: { Nav: "_nav_nav_afd97dfs867", Logo: "_nav_logo_97fd867fsfg" }
```

---

## :import

```css
/* utils.css */
:export {
  HorizontalNav: _utils_horizontalnav_c7ab86431;
  SharedUtilVar: rgb(200, 100, 0);
}
```
```css
:import("./utils.css") {
  i__util_class_1: HorizontalNav;
  i__util_var_1: SharedUtilVar;
}
```

---

##### ✅


---

## Everything CSS Modules does is powered by ICSS

### &

## ICSS is an (evolving) specification

---

### Implementations exist for
## Webpack

## Browserify

## JSPM

---

### Server-side rendering?

## NodeJS (coming)

## Rails

## PHP


---

# Thanks!

### github.com/css-modules/icss

@glenmaddern

---

#### Links:

http://www.blueskyonmars.com/2010/01/29/commonjs-the-first-year/

https://github.com/joyent/node/issues/5132#issuecomment-15432598

http://nodegeek.net/2013/12/18/nodejs-v8-history/

http://www.niallkennedy.com/blog/2008/09/google-chrome.html
