import marked from 'marked'
import highlightJs from 'highlight.js'
let renderer = new marked.Renderer()
import reactTools from 'react-tools'

renderer.heading = (text, level) => {
  return `<h${level} className="\${styles['h' + ${level}]}">${text}</h${level}>`
}

export let fetch = (load, fetch) => {
  return fetch(load).then(text => {
    console.log(text)
    return `
      export default (styles) => {
        console.log("Styles!")
        console.log(styles)
        console.log("Text!")
        console.log(\`${marked(text, {renderer}).replace(/`/g,"\\`")}\`)
      }
    `
  })
}
