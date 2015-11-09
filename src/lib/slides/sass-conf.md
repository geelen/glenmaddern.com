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

<meta slide="examples"></meta>

<div className={styles.demo}>
  <button className={styles.examples.normal}>Submit</button>
  <button className={styles.examples.invalid}>Delete!</button>
</div>

```css
.SubmitButton { /* COMMON STYLES */ }                     ⏐
.SubmitButton--normal { 
  @extends .SubmitButton;
  /* BLUE COLOURS */
}
.SubmitButton--danger { 
  @extends .SubmitButton;
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

```css
.bacon-pancake { @extends .normal-pancake; }
```

<div data-bullet></div>

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---
```css
.bacon-pancake { @extends .normal-pancake; }
```

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

<div data-bullet></div>

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---

```css
.bacon-pancake { @extends .normal-pancake; }
```

### **a bacon pancake <br/> = a normal pancake <br/> + more (e.g bacon)**

## (in the simple case only) <br/> <span className={styles.emoji}>😕</span>

---
