const { store } = require('./store')
const { nameAction } = require('./store/actionCreators')

// 获取 store 数据
console.log(store.getState())

store.dispatch(nameAction)
console.log(store.getState())
