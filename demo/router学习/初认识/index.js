import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    {/* 设置路由模式，可选 BrowserRouter 或 HashRouter */}
    <HashRouter>
      <div>
        router学习项目
        <App />
      </div>
    </HashRouter>
  </StrictMode>
)
