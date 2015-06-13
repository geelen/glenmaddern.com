import marked from 'marked'
import hljs from 'highlight.js'
let renderer = new marked.Renderer()
import reactTools from 'react-tools'

const SimpleTag = ( tagName ) => ( body ) => `<${tagName} className={styles.${tagName}}>${body}</${tagName}>`
renderer.code = ( code, language ) => `<pre className={styles.pre}><code className={styles.pre_code} dangerouslySetInnerHTML={{__html: ${JSON.stringify( hljs.highlight( language, code, true ).value )} }}></code></pre>`
renderer.paragraph = SimpleTag( 'p' )
renderer.codespan = SimpleTag( 'code' )
renderer.heading = ( text, level ) => `<h${level} className={styles['h' + ${level}]}>${text}</h${level}>`
renderer.image = ( href, title, text ) => `<img className={styles.img} src="${href}" title="${title}"/>`
renderer.blockquote = SimpleTag( 'blockquote' )
renderer.hr = () => `<hr className={styles.hr} />`
renderer.list = ( body, ordered ) => ordered ? SimpleTag( 'ol' )( body ) : SimpleTag( 'ul' )( body )
renderer.listitem = SimpleTag( 'li' )
renderer.strong = SimpleTag( 'strong' )
renderer.em = SimpleTag( 'em' )
renderer.del = SimpleTag( 'del' )
renderer.link = ( href, title, text ) => `<a className={styles.a} href="${href}" target="${/^https?:\/\//.exec( href ) ? '_blank' : '_self'}">${text}</a>`

export let fetch = ( load, fetch ) => {
  return fetch( load ).then( text => {
    //console.log(fm)
    //let content = fm( text );
    let
      mdToJsx = marked( text, { renderer, tables: false, smartypants: true } ).replace( /`/g, "\\`" ),
      JsxToJs = reactTools.transformWithDetails( `<div className={styles.markdown}>${mdToJsx}</div>`, { es6module: true } )
    return `
      import React from 'react'
      export default {
        render: (styles, components) => ${JsxToJs.code}
      }
      export let __hotReload = true
    `
  } )
}
