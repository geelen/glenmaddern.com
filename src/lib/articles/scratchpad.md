

## The Divide

If there was one overarching disagreement about the future of CSS, it would have to be on the role of JavaScript. The rise of React & immediate-mode rendering has changed the people think about the DOM, from it being the source of truth for your application to it being a rendering artefact from your component hierarchy. Proponents of the latter can point to a whole class of bugs that disappear when you make the switch, so people (myself included) switch. But then the question of style arises, and it's unclear whether the same arguments make sense.

Allow me to present the fairest comparison of the two approaches that I've been able to find. The question of responsive styles:

```css
/* this CSS: */
.GalleryImage {
  flex: 0 0 33.33%;
}
@media screen and (max-width: 600px) {
	.GalleryImage {
	  flex: 0 0 100%;
	}
}
```

```js
/* vs this JS: */
export default class GalleryImage extends React.Component {
  render() {
    let style = window.innerWidth < 600
      ? { flex: "0 0 100%" }
      : { flex: "0 0 33.33%" }
    return <img style={style} src={props.url} />
  }
}
```

Forget the particulars of the syntax, just think about the differences in *intent*. The CSS one declares "these rules apply under these conditions", in JS it's "run this code to figure out what styles to render". CSS proponents may say that the simplicity and predictability of a media-query beats a custom-every-time JS solution, and that deficiencies in syntax can be covered by the Custom Media [spec](http://dev.w3.org/csswg/mediaqueries/#custom-mq) ([polyfill](https://github.com/postcss/postcss-custom-media)) or something like [Metaquery](http://glenmaddern.com/articles/metaquery-and-the-end-of-media-queries). JS proponents may point to the fact that *anything* can be used to branch styles here, not just window width ([element queries](https://github.com/marcj/css-element-queries), anyone?), and since it's just JS you can refactor & control how these checks are written and executed.

I can appreciate both arguments, and I don't think there's a clear winner, which is pretty much how I feel about the whole CSS-vs-style-in-JS debate.


## The Progression of Ideas

Let's start with the basic assumption of styling components — that you have a single CSS file for each component in your application, and they should be neighbours on the file system. If you're not doing that already, or just if you haven't seen it, watch [Nicolas Gallagher's brilliant talk](https://www.youtube.com/watch?v=m0oMHG6ZXvo) from CSSConfAU 2014.

So, if you're using React & Sass, you might have this

```
components/
  gallery/
    gallery.scss
    gallery.js
  gallery-image/
    gallery-image.scss
    gallery-image.js
```

Using Sass you'd need to go through and `@include` each `.scss` file somewhere, or use something like Gulp to glob & concatenate them all before processing them. So while you've placed the Sass files next to their JS counterpart, they're not actually linked in any way.
