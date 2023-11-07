const { store } = require('./store')

// 获取 store 数据
console.log(store.getState())

// 创建 action 修改数据
const nameAction = { type: 'change_name', name: 'ggg' }

store.dispatch(nameAction)
console.log(store.getState())
