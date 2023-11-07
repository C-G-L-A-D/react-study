import React, { PureComponent } from 'react'
import store from '../store'
import { increasingAction } from '../store/actionCreators'

export default class Home extends PureComponent {
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

  addNumber(num) {
    store.dispatch(increasingAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <div>
          <button onClick={() => this.addNumber(1)}>+1</button>
          <button onClick={() => this.addNumber(5)}>+5</button>
          <button onClick={() => this.addNumber(8)}>+8</button>
        </div>
      </div>
    )
  }
}
