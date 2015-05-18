import pluginPostcss from 'plugin-postcss'
import Autoprefixer from './autoprefixer'
import inlineComment from 'postcss-inline-comment'
import nested from 'postcss-nested'

import TCSS from './tcss-plugin'

let tcss = new TCSS()
let plugins = [inlineComment, tcss.getPlugin(), nested],
  { fetch: __fetch, hotReload, bundle } = pluginPostcss(plugins)

let fetch = (load, f) => {
  return __fetch(load, f).then(_ => {
    let filename = load.metadata.pluginArgument.replace(/\?.*$/, '')
    return `module.exports = ${tcss.getClasses(filename)}`
  })
}

export { fetch, hotReload, bundle };
