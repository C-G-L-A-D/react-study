import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { decreasingAction, increasingAction } from '../store/actionCreators'

// 使用高阶组件获取store，避免冗余
class About extends PureComponent {
  calcNumber(num, isAdd) {
    if (isAdd) {
      this.props.addNumber(num)
    } else {
      this.props.subNumber(num)
    }
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>About Counter: {counter}</h2>
        <div>
          <button onClick={() => this.calcNumber(50, true)}>+50</button>
          <button onClick={() => this.calcNumber(100, true)}>+100</button>
          <button onClick={() => this.calcNumber(50, false)}>-50</button>
          <button onClick={() => this.calcNumber(100, false)}>-100</button>
        </div>
      </div>
    )
  }
}

/**
 * connect 返回一个高阶组件
 * mapStateToProps - store 中的 state 映射到当前组件的 props
 * mapStateToProps - store 中的 action 方法映射到当前组件的 props
 */

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNumber(num) {
      dispatch(increasingAction(num))
    },
    subNumber(num) {
      dispatch(decreasingAction(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
