import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function ShoppingCat(props) {
  return (
    <>
      <p>这是普通函数式组件 - {props.userName} 的购物车 </p>
      <ul>
        <li>
          <Goods name="手机" price={6100} />
        </li>
        <li>
          <Goods name="电脑" price={10000} />
        </li>
        <li>
          <Goods />
        </li>
      </ul>
    </>
  )
}

export const Goods = props => {
  return (
    <div>
      <p>这是箭头函数式组件 - {props.name} </p>
      <div>
        <Price price={props.price}></Price>
      </div>
    </div>
  )
}

export class Price extends Component {
  constructor(props) {
    super()
    this.state = {
      unit: '元'
    }
  }

  render() {
    // 会编译成 React.createElement，返回React元素
    return (
      <>
        <p>
          这是类组件 - {this.props.price}
          {this.state.unit}
        </p>
      </>
    )
  }
}

// 设置组件默认的props
Goods.defaultProps = {
  price: 30,
  name: '商品'
}

// 设置组件props的默认类型
Price.propTypes = {
  price: PropTypes.number.isRequired
}
