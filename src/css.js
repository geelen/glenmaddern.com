import pluginPostcss from 'plugin-postcss'

let plugins = [],
  { fetch, hotReload, bundle } = pluginPostcss(plugins)

export { fetch, hotReload, bundle };
