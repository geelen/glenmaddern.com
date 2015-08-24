# Interoperable CSS

&nbsp;

by @glenmaddern

---

<meta slide="dramatic"></meta>

#### Part 1

## Machine interfaces

---

## September 1st 2008

---

![](https://upload.wikimedia.org/wikipedia/commons/c/c6/IPhone_PSD_White_3G.png)

---

<meta slide="3-up"></meta>

![](https://upload.wikimedia.org/wikipedia/commons/5/5c/N95_Front-slide-open.jpg)
![](http://www.blogcdn.com/www.engadget.com/media/2008/05/htc-touch-diamond-official.jpg)
![](http://www.onecellular.com/167-736-thickbox/blackberry-curve-8330-red-telus.jpg)

---

<meta slide="movies"></meta>

<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/b/b6/Twilight_%282008_film%29_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/9/93/The_Twilight_Saga-_New_Moon_poster.JPG)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/d/d7/Eclipse_Theatrical_One-Sheet.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/c/c2/Breaking_Dawn_Part_1_Poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/4/49/The_Twilight_Saga_Breaking_Dawn_Part_2_poster.jpg)</span>

---

<meta slide="movies-small"></meta>

![](https://upload.wikimedia.org/wikipedia/en/7/70/Ironmanposter.JPG)
![](https://upload.wikimedia.org/wikipedia/en/8/88/The_Incredible_Hulk_poster.jpg)
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/e/ed/Iron_Man_2_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/f/fc/Thor_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America_The_First_Avenger_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/d/d5/Iron_Man_3_theatrical_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/7/7e/Thor_-_The_Dark_World_poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/e/e8/Captain_America_The_Winter_Soldier.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/8/8f/GOTG-poster.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/1/1b/Avengers_Age_of_Ultron.jpg)</span>
<span className={styles.nope}>![](https://upload.wikimedia.org/wikipedia/en/7/75/Ant-Man_poster.jpg)</span>

---

![](https://dl.dropboxusercontent.com/u/1349167/GFC.png)

---

![](https://dl.dropboxusercontent.com/u/1349167/bieber.png)

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

<meta x-gif src="http://media0.giphy.com/media/CMvLdjfjQnQAg/giphy.gif"></meta>

---

## September 2nd 2008

---

![](https://dl.dropboxusercontent.com/spa/a9i2yebxv7pg2ex/jb8vivcf.png)
!TODO note: Launched this to tell everyone what a browser was, because you either did and were using Firefox, or you didn't and you were using IE

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


> Server side JavaScript is very fragmented. [Rhino, v8, Spidermonkey and JavaScriptCore don't work] in the same way. A JavaScript web framework is very much tied to its interpreter and is often **forced to create a bunch of APIs that Python, Ruby and Java programmers take for granted**.

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

!TODO *nice* image/gif here

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

### You can ***change the human interface*** of a language without needing to change the machine interface. 

---

# CSS?

---

<meta x-gif src="/assets/images/is-it-possible.gif" n-times="1"></meta>

---

# Interoperable CSS

#### June 21, 2015

---

## ICSS

* Compile target, not a human interface
* Consumed by a loader (Webpack/JSPM/Browserify) to emit *both* CSS and JS
* Built to support **CSS Modules**

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

<meta slide="dramatic"></meta>

#### Part 2

## Human interfaces

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


#### Problem #1
## Global namespace

---

```css
#document .content p:first-child a strong {
  color: red;
}
```
<div data-bullet></div>

```css
.strong-in-an-a-in-the-first-paragraph-in-content-in-document {
  color: red;
}
```

---

```css
#document .content p:first-child a strong {
  color: red;
}
```

```css
.strong-in-an-a-in-the-first-paragraph-in-content-in-document {
  color: red;
}
```

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
/* CSS */
.normal {
  /* styles here... */
}
```

!TODO maybe go ICSS -> React -> DOM?

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

<meta slide="white"></meta>

!TODO drop this down to just 2 buttons

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Error!</button>
</div>

---

<meta slide="white-sideways"></meta>

```css
.SubmitButton {
  /* COMMON STYLES */
}
.SubmitButton--normal,
  color: hsl(210, 61%, 31%);
  background-color: hsla(210, 61%, 51%, 0.1);
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
.SubmitButton--normal,
  color: hsl(210, 61%, 31%);
  background-color: hsla(210, 61%, 51%, 0.1);
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
  background-color: hsla(210, 61%, 51%, 0.1);
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

## "State changes are UI changes"

#### Michael Chan, July 6, 2015

---


```js
export default class SubmitButton extends React.Component {
  render() {
    let state = this.props.error
      ? { text: 'Error!', style:{color:'red', backgroundColor:'white'}}
      : { text: 'Submit' }
    
    return <button className="SubmitButton" style={state.style || {}}>
      { state.text }
    </button>
  }
}
```
---

```js
import styles from "./submit-button.css";

export default class SubmitButton extends React.Component {
  render() {
    let state = this.props.error
      ? { text: 'Error!', classes: styles.error }
      : { text: 'Submit', classes: styles.normal }
    
    return <button className={ state.classes }>
      { state.text }
    </button>
  }
}
```
---
## "Name your states!"
---

```js
import styles from "./submit-button.css";
const labels = { error: 'Error!', normal: 'Submit' }

export default class SubmitButton extends React.Component {
  render() {
    let state = this.props.error ? 'error' : 'normal'
    
    return <button className={ styles[state] }>
      { labels[state] }
    </button>
  }
}
```

---

## Multi-file composition

---

```css
.base {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
}
.normal {
  composes: base;
  composes: blue light-blue-bg from "./colors.css";
}
```
---
```css
:export {
  blue: blue_c22950a8;
  light-blue-bg: light-blue-bg_ea7f0091;
}
```

```css
:import("./colors.css") {
  blue: tmp_var_1;
  light-blue-bg: tmp_var_2;
}
:export {
  base: base_81f12d56;
  normal: base_81f12d56 tmp_var_1 tmp_var_2 normal_f34f7fa0;
}
```
---

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

## Good design

### should lead you to good practice

## Good 
---

## Why is ICSS distinct from CSS Modues

### This is CSS. Nobody knows what they're doing. Least of all us. If we can make all the loaders work of a low-level format *you* can build your own tools. If it's

---
## CSS Modules
* Webpack (css-loader w/ modules flag)
* JSPM (jspm-loader-css-modules)
* Browserify (cssmodulesify)
* NodeJS (css-modules-require-hook)
---
## ICSS
* Webpack (css-loader)
* JSPM (jspm-loader-css)

---

# Thanks!

### github.com/css-modules/icss

@glenmaddern
