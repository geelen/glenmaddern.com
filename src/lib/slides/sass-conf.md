### CSS Modules:
# From Extension to Composition 

#### —

by @glenmaddern

---

<meta slide="dramatic"></meta>

## Today

* The problem with @extends
* How CSS Modules works
* Composition & Modular Style

---

<meta slide="dramatic"></meta>

#### Part 1:

# The problem 
#### with
# @extends

---

#### "What Nobody Told You About Sass’s @extend"
#### "Why You Should Avoid Sass @extend"
#### "Extending In Sass Without Creating A Mess"
#### "Sass doesn't create bad code. Bad coders do."

---

<meta slide="excellent"></meta>

## When @extends
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
.SubmitButton--normal { /* BLUE COLOURS */ }
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
.SubmitButton--normal { /* BLUE COLOURS */ }
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
.SubmitButton--normal { /* BLUE COLOURS */ }
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
.SubmitButton--normal { /* BLUE COLOURS */ }
.SubmitButton--danger { /* RED COLOURS */ }
```

```html
<button class='SubmitButton--normal'>            ⏐
  Submit
</button>

<button class='SubmitButton--danger'>
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
.SubmitButton--normal { @extends .SubmitButton; /* ... */ }
.SubmitButton--danger { @extends .SubmitButton; /* ... */ }
```

```html
<button class='SubmitButton--normal'>            ⏐
  Submit
</button>

<button class='SubmitButton--danger'>
  Delete!
</button>
```

---
