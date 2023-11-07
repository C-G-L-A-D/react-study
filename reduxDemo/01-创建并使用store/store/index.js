const { createStore } = require('redux')

// 初始化数据
const initialState = {
  name: 'luo ad',
  age: 22
}

/**
 * 定义 reducer 函数（纯函数）
 * @param {*} state - 保存的数据，需设置默认初始值「不能直接修改」
 * @param {*} action - 操作 state 的方法配置
 * @returns
 */
function reducer(state = initialState, action) {
  console.log(state, action)
  if (action.type === 'change_name') {
    return { ...state, name: action.name }
  }
  // 将最新的 state 返回
  return state
}

// 创建 store
const store = createStore(reducer)

module.exports = {
  store
}
