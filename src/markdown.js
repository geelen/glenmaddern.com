import showdown from 'showdown'
let converter = new showdown.converter()

export default (source) => {
  console.log(source)
  return "hiyo"
}

export let __hotReload = true
