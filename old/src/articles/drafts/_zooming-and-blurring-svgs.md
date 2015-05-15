#### ...a surprisingly difficult task

SVGs are a strange beast. They are surprisingly versatile, usually perform quite well, and can look great at every resolution. But the specification has never been completely implemented, and it's quite difficult to predict how certain features will behave in different browsers.

## Blending HTML and SVG

SVG often finds a home off to the side of the main HTML layout, as illustrations or animations. Consider the home page of [SnapSVG](http://snapsvg.io/), an awesome library written by the creator of Raphaël, Dmitry Baranovskiy, or the home page for [CSSConf AU](http://2014.cssconf.com.au/), which I'm helping organise. Both of these use HTML layouts, and use SVG as a drop-in replacement for images. And with the [widespread ability](http://caniuse.com/#feat=svg-img) to use an SVG as the `src` attribute on an `img` tag, that use-case is well supported.

But what about the other direction?

## SVG 'Layout'

A project I've been working on has used SVG as the primary interface:

{<1>}![Animating in an SVG](http://d.pr/i/DPKs.gif)

The initial illustrations are provided as SVG paths, then animated in with some custom JavaScript (look at [Lazy Line Painter](http://lazylinepainter.info/) for something similar). Once it's drawn in, we want to be able to click on the dotted lines, enter our data like a normal form element, then continue on with the animation. Here's what that looks like:

{<2>}![Asking for input](http://d.pr/i/n8YQ.gif)

The difficulty arises because SVG has no concept of input fields. In the above example, the input fields are a plain-old HTML `input type=text`. But there are two immediate problems:

### 1. It's not particularly straightforward to know where the SVG elements, in the case the dots, are drawn on screen, to place the HTML element there.

In our case, we use a SVG set to 100% height and width, and use the `viewbox` property on the SVG element to ensure it always fits on screen without distoring aspect ratio. But we wanted to avoid having to reverse-engineer this behaviour to place our HTML elements in the same place.

### 2. The input field probably needs to be bigger than the space in the illustration.

Depending on the illustration, the input field might only occupy a small part of the screen, but the user needs a normal-sized input field. A similar effect occurs on mobile devices when input fields are far too small to be used - the browser zooms in until only the current input is in view.

## Zooming with SVG

Our initial attempt used JS to animate the `viewbox` property using SnapSVG. This works, but can be quite janky:

    var box = rect.getBBox(),
        viewbox = svg.attr('viewBox'),
        zoomedIn = [box.x, box.y, box.width, box.height],
        zoomedOut = [viewbox.x, viewbox.y, viewbox.width, viewbox.height],
        zoom = function (mid) {
          svg.attr({viewBox: mid.join(' ')})
        };
    
    rect.click(function () {
      Snap.animate(zoomedOut, zoomedIn, zoom, 1000, mina.easeinout, function () {
        // zoom complete
      });
    });

Where `svg` is the SnapSVG 'paper' (wrapping the SVG element itself) and `rect` is an invisible (no stroke or fill) path that acts as both a click handler and a bounding box for the animation.

## Zooming with CSS

Rather than using the viewbox property, we can simply use CSS transformations and the scale property to zoom in on tbe object. The only question is where to 'zoom' in on. We can approximate this by comparing the box and ciewbox properties from earlier, and put it in terms of percentage:

code

using the transform origin and transform properties, we get a smooth zoom in, since the browser is accelerating the transition.

pre-lifting

unfortunately, right now the browser is being too clever. it is happily transitioning the element, but when the transition is complete, the browser re-draws the SVG. this is normal - whatever element size the SvG element takes up, the browser draws a nice, crisp version of it. for our purposes, once the zoom has started we want it to be treated as a raster. Layers to the rescue!

code

The translateZ hack is probably overused, but here it's perfect. by lifting the layer to thr GPU, the SVG is rasteeized before scalong. neat!

## Adding the blur

SVG has its own blur...

## Pre-lifting the element
