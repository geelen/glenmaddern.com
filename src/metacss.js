import pluginPostcss from 'plugin-postcss'
import Autoprefixer from './autoprefixer'

import TCSS from './tcss-plugin'

let tcss = new TCSS()
let plugins = [tcss.getPlugin()],
  { fetch: __fetch, hotReload, bundle } = pluginPostcss(plugins)

let fetch = (load, f) => {
  return __fetch(load, f).then(_ => {
    let filename = load.metadata.pluginArgument.replace(/\?.*$/, '')
    return `module.exports = ${tcss.getClasses(filename)}`
  })
}

export { fetch, hotReload, bundle };
