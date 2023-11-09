import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import homeReducer from './home'
import categoryReducer from './category'

// const reducer = combineReducers({
//   home: homeReducer,
//   category: categoryReducer
// })

// combineReducers原理
function reducer(state = {}, action) {
  // 返回一个对象, store的state
  return {
    category: categoryReducer(state.category, action),
    home: homeReducer(state.home, action)
  }
}

// 开启 redux-devtool
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true // 开启 redux-devtool 的 trace 追踪代码
      })
    : compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
