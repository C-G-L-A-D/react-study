import React, { PureComponent } from 'react'
import { addNumber, subNumber } from '../store/featrures/home'
import { connect } from 'react-redux'
class Home extends PureComponent {
  constructor(props) {
    super()
  }

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

const mapStateToProps = state => {
  return {
    counter: state.home.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNumber(num) {
      dispatch(addNumber(num))
    },
    subNumber(num) {
      dispatch(subNumber(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
