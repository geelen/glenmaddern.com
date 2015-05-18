import postcss from 'postcss'
import Rule from 'postcss/lib/rule'

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
      } else if (rule.type == "rule" && rule.selector.startsWith(":")) {
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
      rule.eachInside(child => {
        if (child.type == "rule" && child.selector == "traits") {
          this.handleTraits(child)
        } else if (child.type == "atrule") {
          this.handleAtTrait(child)
        }
      })
      if (rule.nodes.length > 0) {
        let className = toClassName([this.currentFile, rule.selector].join())
        this.addClass(className)
        rule.selector = "." + className
      } else {
        rule.removeSelf()
      }
    } else {
      console.error(`Missing SOURCE to export scoped rule ${rule.selector}`)
    }
  }

  handleTraits(traitNode) {
    if (this.key) {
      traitNode.each(rule => {
        let traitName = rule.prop;
        this.addClass(`t-${ traitName}`)
        if (rule.value) rule.value.split(" ").forEach(v => {
          this.addClass(`t-${traitName}--${v}`)
        })
      })
      traitNode.removeSelf()
    } else {
      console.error(`Traits can only be included within placeholders!`)
    }
  }

  handleAtTrait(rule) {
    if (this.key) {
      let traitName = rule.name;
      this.addClass(`t-${traitName}`)
      if (rule.params) rule.params.split(" ").forEach(v => {
        this.addClass(`t-${traitName}--${v}`)
      })
      rule.removeSelf()
    } else {
      console.error(`Traits can only be included within placeholders!`)
    }
  }

  addClass(newClass) {
    let scope = this.scopes.get(this.currentFile)
    scope[this.key] = scope[this.key] ? `${scope[this.key]} ${newClass}` : newClass
  }

  defineTrait(rule) {
    //rule.parent.insertBefore(rule, new Rule({selector: `.t-${rule.params}`, nodes: rule.nodes}))
    rule.each(child => {
      if (!(child.type == 'rule' && child.nodes)) return
      if (child.selector == ':default') {
        child.selector = `.t-${rule.params}`
      } else {
        child.selector = `.t-${rule.params}--${child.selector.replace(/([^\w\-_])/g, "\\$1")}`
      }
      rule.parent.insertBefore(rule, child)
    })
    rule.removeSelf()
  }
}
