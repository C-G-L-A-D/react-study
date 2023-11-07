const { createStore } = require('redux')

const initialState = {
  name: 'luo ad',
  age: 22
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'change_name':
      return { ...state, name: action.name }
    default:
      return state // 将最新的 state 返回
  }
}

const store = createStore(reducer)

module.exports = {
  store
}