---
title: CSS filters, GIFs, and performance
strap: Or, how to persist in not learning Photoshop
date: "2013-07-02"
---
A few months ago, I blatantly ripped off Charlie Gleason's idea. His [presentation](http://superhighfives.github.io/tweetflight-presentation/) at MelbJS featured greyscale, full-screen, animated GIFs (of his own face, among other things) behind the text on many slides. I discovered that he'd painstakingly edited and optimised each GIF in Photoshop so it looked good behind the text on each slide.

I wanted to do the same thing, but without all that work.

<figure className={styles.figure}>
<img className={styles.img} src="https://d262ilb51hltx0.cloudfront.net/max/800/0*9q22pEjd4s_jm1vU.png" />
<figcaption className={styles.figcaption}>The opening slide of my presentation</figcaption>
</figure>

My [presentation](http://geelen.github.io/web-directions-talk) about strict mode in Javascript at Web Directions Code a few months ago was the result. You might want to open that in a tab now because I use 24MB of gifs and it can take quite some time to load. Oh, and because it was only built to run on my machine, it may not work at all on yours. Sorry about that. (If you're interested in the topic, here's [a video of the talk](http://www.webdirections.org/resources/javascripts-slightly-stricter-mode-video-presentation-from-glen-maddern/)).

This post is about some of the things I learned along the way.

## GIFs are Awesome

If you're trying to convey an emotion in a presentation, it's hard to beat a well-chosen GIF. Alternatively, if you're procrastinating instead of writing your presentation, searching for the perfect GIF will distract you for hours. It's a win-win.

<figure className={styles.figure}>
<img className={styles.figure_img} src="https://d262ilb51hltx0.cloudfront.net/max/600/0*e3xBfsYk9_YJGZBy.gif" />
<figcaption className={styles.figcaption}>Sneakers (1999)<br/>&lt;3: IWDRM.tumblr.com</figcaption>
</figure>

Most GIFs out there are poor-quality, badly optimised and jarring when looped. But not all. Blogs like [If We Don't, Remember Me](http://iwdrm.tumblr.com/) and [Tech Noir](http://technoir.nl/) prove just what's possible with the format, capturing the feeling of a particular scene from a film in a way no static image can (note: [All Movie Gifs](http://allmoviegifs.tumblr.com/allmovies) has a great list of film GIFs, but of usually far lower quality). So the lesson is, good GIFs are out there: find them!

## CSS Filters + Fullscreen GIFs are Slow

I'm not sure if that headline will surprise anyone. But it turns out, trying to render 4MB of image data in a file format [defined in 1989](http://www.w3.org/Graphics/GIF/spec-gif89a.txt), then stretch it over the millions of pixels in your display, then apply a Working Draft CSS Filter spec that's [only supported](http://caniuse.com/#search=filter%20effects) in Webkit browsers, and even then only recently, you're in for a bad time.

How bad? [This bad](http://codepen.io/geelen/pen/EJGsd). Maximise this and feel the slowness. Jump into Timeline mode and watch that 60fps (and even the 30fps) target sail past:

<figure className={styles.figure}>
<img className={styles.figure_img} src="https://d262ilb51hltx0.cloudfront.net/max/800/0*DWd75neDN6BXoCM1.png" />
<figcaption className={styles.figcaption}>Timeline profile for the 'Slow' version.</figcaption>
</figure>


## Blur is the culprit, and it hates pixels

After a bunch of experimentation, and with a variety of GIFs, the real problem was using the **blur** filter, which is a shame since that's quite a useful one if you're trying to make a background out of a GIF. So we have a problem.

But this, like all CSS problems, can be solved with **MOAR CSS!**

## A magical conflagration of transforms and filters

I honestly don't know if this is a "good idea", but it solves this particular problem. My reasoning goes like this:

*   The GIF isn't very big, dimensions-wise
*   Scaling up the image takes work
*   Applying the filter takes work proportional to the number of pixels
*   Why not apply the filter first?

It turns out that [that's indeed possible](http://codepen.io/geelen/pen/HvLFu), and using CSS transforms we can scale up the image using the GPU, which gives us a reasonable performance boost.

Firstly, we make the background element smaller, say 20% of the viewport, rather than filling the full width:

```css
position: absolute;
top: 0;
left: 0;
width: 20%;
height: 20%;
```

Then, we apply the background like we did before:

```css
background-image: url(...);
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
```

Then we apply the filter and scale the image up to fit:

```css
-webkit-filter: blur(2px) grayscale(0.8) brightness(0.8);
-webkit-transform-origin: top left;
-webkit-transform: scale(5);
```

And then we're done:

<figure className={styles.figure}>
<img className={styles.figure_img} src="https://d262ilb51hltx0.cloudfront.net/max/800/0*5s7eIjD8fsyl57QA.png" />
<figcaption className={styles.figcaption}>Timeline profile for the "fast" version</figcaption>
</figure>

At first glance, it looks like we only sped things up by 40% (160ms/frame down to 100ms), but this is actually a 10fps GIF, so Chrome is just waiting until the next GIF frame is ready. All our painting, blurring and scaling is actually happening in the first 30ms.

Hooray for GPUs!
