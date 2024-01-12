import React, { PureComponent } from 'react'
import Home from './pages/Home'
import Category from './pages/Category'

import { Route, Routes, Link } from 'react-router-dom'

export class App extends PureComponent {
  render() {
    return (
      <div>
        <div className='header'>
          <span>Header</span>
          <div className='nav'>
            <Link to='home'>首页</Link>
            <Link to='category'>分类</Link>
          </div>
          <hr />
        </div>
        <div className='main-content'>
          <Routes>
            {/* react router 6 设置组件方式 */}
            <Route path='/home' element={<Home />}></Route>
            {/* react router 5 设置组件方式 */}
            <Route path='/category' Component={Category} exact></Route>
          </Routes>
        </div>
        <div className='footer'>
          <hr />
          Footer
        </div>
      </div>
    )
  }
}

export default App
