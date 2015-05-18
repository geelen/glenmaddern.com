import postcss from 'postcss'
import Rule from 'postcss/lib/rule'
import AtRule from 'postcss/lib/at-rule'

const blackList = [':root', ':host']

export default class TCSS {
  constructor() {
    this.scopes = new Map()
  }

  getPlugin() {
    return this.plugin.bind(this)
  }

  getClasses(filename) {
    let classMappings = this.scopes.get(filename)
    return JSON.stringify(classMappings || {})
  }

  plugin(css, result) {
    this.currentFile = null
    css.each(rule => {
      if (rule.type == "comment" && rule.text.startsWith("SOURCE")) {
        this.handleSourceComment(rule)
      } else if (rule.type == "rule" && rule.selector.startsWith(":") && blackList.indexOf(rule.selector) === -1) {
        this.handlePlaceholder(rule)
      } else if (rule.type == "atrule" && rule.name == "trait") {
        this.defineTrait(rule)
      }
    })
  }

  handleSourceComment(rule) {
    let match = rule.text.match(/SOURCE=(.*)/);
    this.currentFile = match ? match[1] : null;
  }

  handlePlaceholder(rule) {
    let toClassName = (f) => `${f.replace(/\W/g, '_')}`
    if (this.currentFile) {
      if (!this.scopes.get(this.currentFile)) this.scopes.set(this.currentFile, {})
      this.key = rule.selector.replace(/^:/, '')
      let oneOffs = []
      rule.each(child => {
        if (child.type === 'decl') {
          let traitName = child.prop;
          this.addClass(`t-${ traitName}`)
          if (child.value) child.value.split(" ").forEach(v => {
            this.addClass(`t-${traitName}--${v}`)
          })
        } else if (child.type === 'rule' && child.selector === '&') {
          oneOffs = oneOffs.concat(child.nodes)
        }
        child.removeSelf()
      })
      if (oneOffs.length > 0) {
        let className = toClassName([this.currentFile, rule.selector].join())
        this.addClass(className)
        rule.selector = "." + className
        rule.nodes = oneOffs
      } else {
        rule.removeSelf()
      }
    } else {
      console.error(`Missing SOURCE to export scoped rule ${rule.selector}`)
    }
  }

  addClass(newClass) {
    let scope = this.scopes.get(this.currentFile)
    scope[this.key] = scope[this.key] ? `${scope[this.key]} ${newClass}` : newClass
  }

  defineTrait(rule) {
    let breakpoints = {classes: [], medias: []},
      traitVariants = []
    //rule.parent.insertBefore(rule, new Rule({selector: `.t-${rule.params}`, nodes: rule.nodes}))
    rule.each(child => {
      if (child.type === 'rule' && child.nodes) {
        if (child.selector === ':default') {
          child.selector = `.t-${rule.params}`
        } else {
          child.selector = `.t-${rule.params}--${child.selector.replace(/([^\w\-_])/g, "\\$1")}`
        }
        traitVariants.push(child)
      } else if (child.type === 'atrule') {
        if (child.name === 'breakpoint-class') {
          breakpoints.classes.push(child.params)
        } else if (child.name === 'breakpoint-media') {
          let [name,...expr] = child.params.split(' ')
          breakpoints.medias.push({name, expr: expr.join(' ')})
        }
      }
    })

    traitVariants.forEach(variant => {
      rule.parent.insertBefore(rule, variant)
    })
    breakpoints.medias.forEach(media => {
      let postfix = variant => variant.clone({selector: `${variant.selector}--${media.name}`})
      rule.parent.insertBefore(rule, new AtRule({name: 'media', params: media.expr, nodes: traitVariants.map(postfix)}))
    })
    breakpoints.classes.forEach(name => {
      let postfix = variant => variant.clone({selector: `.breakpoint-${name} ${variant.selector}--${name}`})
      rule.parent.insertBefore(rule, new AtRule({name: 'media', nodes: traitVariants.map(postfix)}))
    })

    rule.removeSelf()
  }
}
