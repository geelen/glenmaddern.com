# Interoperable CSS
#### Welcome to the future

&nbsp;

by @glenmaddern

---

First up, some history

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

---



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
module.exports = function() {
  ...
};
```

---

# CommonJS

---

# NodeJS
#### Started Feb 09
#### Introduced at JSConf EU, Nov 09

