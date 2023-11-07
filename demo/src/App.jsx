import React, { PureComponent } from 'react'
import Home from './pages/Home'
import store from './store/index'

// PureComponent 可以帮助监听组件是否发生变化，从而决定是否更新组件

export default class App extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      counter: store.getState().counter
    }
  }

  // 组件挂载时监听store变化
  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({ counter: state.counter })
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>App Counter: {counter}</h2>
        <div>
          <Home />
        </div>
      </div>
    )
  }
}
