import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <div>
      学习项目
      <Provider store={store}>
        <App></App>
      </Provider>
    </div>
  </React.StrictMode>
)
