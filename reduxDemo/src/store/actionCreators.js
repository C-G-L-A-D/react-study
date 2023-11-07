// 创建 action 修改数据
const nameAction = name => ({
  name,
  type: 'change_name'
})

module.exports = {
  nameAction
}
