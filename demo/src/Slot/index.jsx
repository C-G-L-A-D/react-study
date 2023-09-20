import React, { Component } from 'react'

/**
 * 1. 通过 children 实现插槽
 * 弊端：只能使用索引获取插槽内容，容易出错
 */
export class NavBarByChildren extends Component {
  render() {
    const { children } = this.props
    return (
      <>
        <div>NavBar</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{children[0]}</div>
          <div>{children[1]}</div>
          <div>{children[2]}</div>
        </div>
      </>
    )
  }
}

// 2. 通过 props 实现插槽
export class NavBarByProps extends Component {
  render() {
    return (
      <>
        <div>NavBarByProps</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{this.props.leftSlot}</div>
          <div>{this.props.centerSlot}</div>
          <div>{this.props.rightSlot}</div>
        </div>
      </>
    )
  }
}

export default class Header extends Component {
  render() {
    return (
      <>
        <NavBarByChildren>
          <button>按钮</button>
          <h2>标题</h2>
          <i>x</i>
        </NavBarByChildren>
        <NavBarByProps
          leftSlot={<div>111</div>}
          rightSlot={<div>333</div>}
          centerSlot={<div>222</div>}
        ></NavBarByProps>
      </>
    )
  }
}
