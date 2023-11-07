const { NAME_CHANGE } = require('./constants')

// 创建 action 修改数据
const nameAction = name => ({
  name,
  type: NAME_CHANGE
})

module.exports = {
  nameAction
}
