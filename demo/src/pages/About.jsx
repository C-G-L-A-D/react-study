import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

// 使用高阶组件获取store，避免冗余
class About extends PureComponent {
  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>About Counter: {counter}</h2>
      </div>
    )
  }
}

/**
 * connect 返回一个高阶组件
 * mapStateToProps - store 中的 state 映射到当前组件的 props
 */

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}
export default connect(mapStateToProps)(About)
