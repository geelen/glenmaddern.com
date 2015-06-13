import marked from 'marked'
import highlightJs from 'highlight.js'
let renderer = new marked.Renderer()
import reactTools from 'react-tools'

renderer.code = (code, language) => `<pre className={styles.pre}><code className={styles.pre_code}>${code}</code></pre>`
renderer.paragraph = (text) => `<p className={styles.p}>${text}</p>`
renderer.codespan = (code) => `<code className={styles.code}>${code}</code>`
renderer.heading = (text, level) => `<h${level} className={styles['h' + ${level}]}>${text}</h${level}>`
renderer.image = (href, title, text) => ``

export let fetch = (load, fetch) => {
  return fetch(load).then(text => {
    console.log(text)
    let md = marked(text, {renderer}).replace(/`/g,"\\`")
    return `
      import React from 'react'
      export default (styles) => {
        console.log("Styles!")
        console.log(styles)
        console.log("Text!")
        let md = \`${md}\`
        console.log(md)
        return ${reactTools.transformWithDetails( `<div>${md}</div>`, { es6module: true } ).code}
      }
      export let __hotReload = true
    `
  })
}
