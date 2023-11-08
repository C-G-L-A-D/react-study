import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import homeReducer from './home'
import categoryReducer from './category'

const reducer = combineReducers({
  home: homeReducer,
  category: categoryReducer
})

// 开启 redux-devtool
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true // 开启 redux-devtool 的 trace 追踪代码
      })
    : compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
