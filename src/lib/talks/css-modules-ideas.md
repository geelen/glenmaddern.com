
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

<meta slide="white"></meta>

!TODO drop this down to just 2 buttons

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Submit</button>
</div>
<div className={styles.demo}>
  <button className={styles.examples.disabled}>Submit</button>
  <button className={styles.examples.inProgress}>Submit</button>
</div>

---

<meta slide="white-sideways"></meta>

```css
.SubmitButton {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
}
.SubmitButton--error {
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
​
​
```
```css
.SubmitButton--normal,
.SubmitButton--disabled {
  color: hsl(210, 61%, 31%);
  background-color: hsla(210, 61%, 51%, 0.1);
}
.SubmitButton--disabled {
  opacity: 0.5;
}
.SubmitButton--in-progress {
  color: hsl(210, 61%, 31%);
  background: linear-gradient(-45deg, hsl(0, 100%, 100%), hsl(0, 100%, 100%) 25%, hsl(221, 100%, 97%) 25%, hsl(221, 100%, 97%) 50%, hsl(0, 100%, 100%) 50%, hsl(0, 100%, 100%) 75%, hsl(221, 100%, 97%) 75%, hsl(221, 100%, 97%)) 0 0 / 8rem 8rem;
  animation: shiftBackgroundLeft4rem 2s linear infinite;
}
```

---

<meta slide="white-sideways"></meta>

```css
.base {
  min-width: 9em;
  padding: 0.4rem 1rem 0.45rem;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 0.25rem;
}
.error {
  composes: base;
  color: hsla(0, 61%, 51%, 0.5);
  background: white;
}
​
​
​

```
```css
.normal {
  composes: base;
  color: hsl(210, 61%, 31%);
  background-color: hsla(210, 61%, 51%, 0.1);
}
.disabled {
  composes: normal
  opacity: 0.5;
}
.inProgress {
  composes: base;
  color: hsl(210, 61%, 31%);
  background: linear-gradient(-45deg, hsl(0, 100%, 100%), hsl(0, 100%, 100%) 25%, hsl(221, 100%, 97%) 25%, hsl(221, 100%, 97%) 50%, hsl(0, 100%, 100%) 50%, hsl(0, 100%, 100%) 75%, hsl(221, 100%, 97%) 75%, hsl(221, 100%, 97%)) 0 0 / 8rem 8rem;
  animation: shiftBackgroundLeft4rem 2s linear infinite;
}
```

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
<meta slide="examples"></meta>

```css
:export {
  blue: blue_c22950a8;
  light-blue-bg: light-blue-bg_ea7f0091;
}
```

```css
:import("./colors.css") {
  tmp_var_1: blue;
  tmp_var_2: light-blue-bg;
}
:export {
  base: base_81f12d56;
  normal: base_81f12d56 tmp_var_1 tmp_var_2 normal_f34f7fa0;
}
```
