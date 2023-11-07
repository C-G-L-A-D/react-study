import React, { PureComponent } from 'react'
import store from '../store'
import { decreasingAction } from '../store/actionCreators'

export default class Profile extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({ counter: state.counter })
    })
  }

  decreaseNum(num) {
    store.dispatch(decreasingAction(num))
  }

  render() {
    const { counter } = this.state
    return (
      <div>
        <h2>Profile Counter: {counter}</h2>
        <div>
          <button onClick={() => this.decreaseNum(1)}>-1</button>
          <button onClick={() => this.decreaseNum(5)}>-5</button>
          <button onClick={() => this.decreaseNum(8)}>-8</button>
        </div>
      </div>
    )
  }
}
