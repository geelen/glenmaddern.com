import { CSSLoader, Core } from 'jspm-loader-css'
import nested from 'postcss-nested'

const traitRegexp = /\:traits$/
function traits( css ) {
  // Find our path to the trait files
  let traitPath;
  css.eachAtRule( 'traits', rule => {
    traitPath = rule.params.replace( /^\(['"]|['"]\)$/g, '' )
    rule.removeSelf()
  } )
  if ( !traitPath ) return

  // Translate any .module:traits usages
  css.eachRule( rule => {
    if ( rule.selector.match( traitRegexp ) ) {
      rule.selector = rule.selector.replace( traitRegexp, '' )
      rule.eachDecl( decl => {
        decl.value = `${decl.prop} ${decl.value} from "${traitPath}${decl.prop}.css"`
        decl.prop = 'composes'
      } )
    }
  } )
}

export default new CSSLoader( [
  nested,
  traits,
    //css => console.log(css.toResult().css),
  Core.localByDefault,
    //css => console.log(css.toResult().css),
  Core.extractImports,
  Core.scope,
  css => {}//console.log(css.toResult().css)
], __moduleName )