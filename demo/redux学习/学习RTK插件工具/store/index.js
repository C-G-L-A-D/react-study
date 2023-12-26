import { configureStore } from '@reduxjs/toolkit' // 默认集成 redux-thunk 和 redux-devtool
import homeSlice from './featrures/home'
import categorySlice from './featrures/category'
const store = configureStore({
  reducer: {
    home: homeSlice,
    category: categorySlice
  }
})

export default store
