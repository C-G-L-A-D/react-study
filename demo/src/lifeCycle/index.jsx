import { Component } from 'react'

export default class LifeCycle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: '元'
    }
    console.log('constructor---触发')
  }

  handleClick() {
    this.setState({
      unit: '千克'
    })
  }

  render() {
    console.log('render---触发')
    const { unit } = this.state

    return (
      <>
        <p>这是类组件 - 单位 - {unit}</p>
        <button onClick={() => this.handleClick()}>更改状态，触发生命周期</button>
      </>
    )
  }

  /**
   * 组件被渲染，挂载在DOM上「组件被挂载欧立即调用 」
   * 触发顺序： constructor -> render -> componentDidMount
   */
  componentDidMount() {
    console.log('生命周期函数----componentDidMount---触发')
  }

  /**
   *
   * 组件是否应该更新，「返回true更新，返回false不允许更新」
   * 触发顺序： render -> componentDidUpdate
   * @param {*} state 新的 state
   * @param {*} props 新的 props
   */
  shouldComponentUpdate(state, props) {
    console.log('生命周期函数----shouldComponentUpdate---触发', state, props)
  }

  /**
   *
   * 组件更新完成
   * 触发顺序： render -> componentDidUpdate
   * @param {*} prevState 旧的 state
   * @param {*} prevProps 旧的 props
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('生命周期函数----componentDidUpdate---触发', prevProps, prevState)
  }

  /**
   *
   * 组件被卸载及销毁之前立即调用，从DOM上移除
   * 触发顺序：componentWillUnmount
   */
  componentWillUnmount() {
    console.log('生命周期函数----componentWillUnmount---触发')
  }
}
