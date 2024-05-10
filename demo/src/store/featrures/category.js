import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 1. 使用 extraReducers 监听状态获取数据进行存储
export const fetchMultidataAction = createAsyncThunk(
  'fetch/categorymultidate',
  async (state, action) => {
    try {
      const res = await axios.get('http://123.207.32.32:8000/home/multidata')
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
)

// 2.  不使用extraReducers调用异步方法, createAsyncThunk创建异步action
export const fetchMultidataOtherAction = createAsyncThunk(
  'fetch/categorymultidateother', // fetch 为dispatch时action的命名空间
  async (state, action) => {
    try {
      console.log(state, action)
      const { dispatch, getState } = action

      const res = await axios.get('http://123.207.32.32:8000/home/multidata')
      const banners = res.data.data.banner.list || []
      const recommonds = res.data.data.recommend.list || []

      // 4. 同步派发action，更新state（或者可以在Slice模块的extraReducers中监听这个action的状态，通过fulfilled状态获取结果更新state）
      dispatch(changeBannersAction(banners))
      dispatch(changeRecommondsAction(recommonds))
    } catch (error) {
      console.log(error)
    }
  }
)

// 3. 通过createSlice 创建一个Slice模块
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    // 初始化state
    banners: [],
    recommonds: []
  },
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeRecommondsAction(state, { payload }) {
      state.recommonds = payload
    }
  }
  // 4. 用于监听异步的action状态（可用于在action状态中获取变更后的state）
  // extraReducers: {
  //   // 监听 fetchMultidataAction 派发中状态
  //   [fetchMultidataAction.pending](state, action) {
  //     console.log('pengding 状态')
  //   },
  //   // 监听 fetchMultidataAction 派发完成后的状态
  //   [fetchMultidataAction.fulfilled](state, { payload }) {
  //     state.banners = payload.data.banner.list || []
  //     state.recommonds = payload.data.recommend.list || []
  //     console.log('fulfilled 状态')
  //   },
  //   [fetchMultidataAction.rejected](state, action) {
  //     console.log('rejected 状态')
  //   }
  // }
  // 另一种写法（链式调用）
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchMultidataAction.pending, (state, { payload }) => {
  //       console.log('pengding 状态')
  //     })
  //     .addCase(fetchMultidataAction.fulfilled, (state, { payload }) => {
  //       // 处理 异步action 成功返回的结果，变更state
  //       state.banners = payload.data.banner.list || []
  //       state.recommonds = payload.data.recommend.list || []
  //       console.log('fulfilled 状态')
  //     })
  //     .addCase(fetchMultidataAction.rejected, (state, { payload }) => {
  //       console.log('rejected 状态')
  //     })
  // }
})

export const { changeBannersAction, changeRecommondsAction } = categorySlice.actions

export default categorySlice.reducer
