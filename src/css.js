import { CSSLoader, Plugins } from 'jspm-loader-css'
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

Plugins.scope.generateScopedName = function(exportedName, path) {
  return `${exportedName}(${path.replace(/^\//,'')}:${Math.random().toString().slice(-2)})`
}

export default new CSSLoader( [
  nested,
  traits,
  Plugins.localByDefault,
  Plugins.extractImports,
  Plugins.scope,
  Plugins.autoprefixer()
], __moduleName )
