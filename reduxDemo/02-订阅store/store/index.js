const { createStore } = require('redux')
const { NAME_CHANGE } = require('./constants')
const { reducer } = require('./reducer')

const store = createStore(reducer)

module.exports = {
  store
}
