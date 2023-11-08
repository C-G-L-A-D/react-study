import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 开启 redux-devtool
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true // 开启 redux-devtool 的 trace 追踪代码
      })
    : compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
