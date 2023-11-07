const { store } = require('./store/index.js')
const { nameAction } = require('./store/actionCreators')
/**
 * 订阅（监听）数据变化
 * 返回值为取消订阅函数
 */
const unsubscribe = store.subscribe(() => {
  console.log('数据变化：', store.getState())
})

store.dispatch(nameAction('luo hhh'))
store.dispatch(nameAction('hhh'))

// 取消订阅
unsubscribe()

// 取消订阅后不能自动获取数据变化通知
store.dispatch(nameAction('xxx'))

console.log('手动获取数据变化：', store.getState())
