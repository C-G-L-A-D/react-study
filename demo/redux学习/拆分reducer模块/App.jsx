import React, { PureComponent } from 'react'
import Home from './pages/Home'
import Category from './pages/Category'

// PureComponent 可以帮助监听组件是否发生变化，从而决定是否更新组件

export default class App extends PureComponent {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <h2>App</h2>
        <div>
          <Home />
          <Category />
        </div>
      </div>
    )
  }
}
