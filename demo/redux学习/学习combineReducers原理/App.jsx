import React, { PureComponent } from 'react'
import Home from './pages/Home'
import Category from './pages/Category'

export class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <div>
          <Home />
          <Category />
        </div>
      </div>
    )
  }
}

export default App
