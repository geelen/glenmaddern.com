import React from 'react'
import AbstractArticle from './abstract-article.jsx!'

let JavascriptIn2015 = <AbstractArticle
  key="javascript-in-2015"
  title="JavaScript in 2015"
  strap="A whole new world"
  date="2015-01-07"
>{`
In the last few days of 2014, I resurrected my long-neglected GIF-beatmatching project [DJGif](https://github.com/geelen/djgif) to throw a New Year's party on my rooftop:

<figure>
![DJGif in full flight on NYE](/assets/images/djgif.jpg)
<figcaption>[Ʌbelard](https://soundcloud.com/jetaimeabelard) playing his first set of 2015</figcaption>
</figure>

A DJ using Ableton Live, a huge bundle of MaxMSP emitting a UDP stream of beat information (courtesy of the immensely pro [Cade](http://cade.io)), a UDP&nbsp;➝&nbsp;WebSockets server, and DJGif pulling hundreds of GIFs off various Tumblrs to beatmatch [&lt;x-gif&gt;](http://geelen.github.io/x-gif/) on two projectors makes for a hell of a good show.

But that's a topic for another time (soon!), because along the way I discovered some new things about JavaScript that really surprised me.

## JavaScript got good

I don't just mean that JavaScript of 2015 is *better*, I mean it's **good**. Good modules, good syntax, a great package ecosystem, a sensible development workflow. This isn't the JS I knew and loved despite its flaws. This is something else.

Take a look at the [ES6 Compatibility Table](http://kangax.github.io/compat-table/es6/) by [@kangax](https://twitter.com/kangax) for a sense of the sheer number of new features that make up the [ES6 spec](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) as well as the impressive progress of ES6 compilers such as [Traceur](https://github.com/google/traceur-compiler) and [6to5](https://6to5.org/). Arrow functions, classes, destructuring, template strings, symbols & promises are all there and usable today. They've actually been usable for a while, actually, and I was vaguely familiar with most of them, but for DJGif I added the final missing piece — modules.

## JSPM + SystemJS - a new in-browser workflow

[SystemJS](https://github.com/systemjs/systemjs) is a "universal dynamic module loader" that works with files using ES6, CommonJS, AMD or those exporting global variables. It's effectively a backwards-compatible version of the [ES6 Loader Polyfill](https://github.com/ModuleLoader/es6-module-loader), which tracks the [JavaScript Loader Spec](http://whatwg.github.io/loader/).

[JSPM](http://jspm.io/) is a package manager with a CLI intended to replace the need for NPM or Bower for front-end projects, but, because SystemJS works with pretty much anything, happily works with code from NPM or Github. It's pretty much exactly like what the NPM team recommended as [a solution to front-end dependency management](http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging) on their blog.

They're both incredible pieces of open-source work with burgeoning communities, but it's worth mentioning that they owe their existence largely to the tireless efforts of [Guy Bedford](https://twitter.com/guybedford). Damn fine work, Mr Bedford.

## Action!

Rather than go on in detail about how this all hangs together, I thought I'd try my hand at a screencast that shows you, in 10-and-a-half minutes, what using JSPM, SystemJS and ES6 is like. We're going to build something that scrapes the top GIFs from [/r/perfectloops](http://www.reddit.com/r/perfectloops) and displays them.

<figure>
<div am-Youtube="screencast">
<iframe src="//www.youtube.com/embed/iukBMY4apvI" frameborder="0" allowfullscreen></iframe>
</div>
</figure>

The resulting [source code](https://github.com/geelen/loopgifs) and [live version](http://geelen.github.io/loopgifs) are up on GitHub, but the interesting bit is the process in getting there, so watch the vid.

---

#### Call for Feedback

This is my first serious attempt at a screencast, so if you watched it and have some thoughts, get in touch! And if you'd like to hear about when the next one launches, pop your email in here:

<form action="http://glenmaddern.createsend.com/t/t/s/hyshd/" method="post">
  <input id="fieldEmail" name="cm-hyshd-hyshd" type="email" required placeholder="Email" />
  <button type="submit">Subscribe</button>
</form>
`}</AbstractArticle>

export default JavascriptIn2015
