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

// 2.  不使用extraReducers调用异步方法
export const fetchMultidataOtherAction = createAsyncThunk(
  'fetch/categorymultidateother',
  async (state, action) => {
    try {
      console.log(state, action)
      const { dispatch, getState } = action

      const res = await axios.get('http://123.207.32.32:8000/home/multidata')
      const banners = res.data.data.banner.list || []
      const recommonds = res.data.data.recommend.list || []

      dispatch(changeBannersAction(banners))
      dispatch(changeRecommondsAction(recommonds))
    } catch (error) {
      console.log(error)
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState: {
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
  },
  // 用于监听异步的action状态
  // extraReducers: {
  //   // 监听 fetchMultidataAction 派发中状态
  //   [fetchMultidataAction.pending](state, action) {
  //     console.log('pengding 状态')
  //   },
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
  extraReducers: builder => {
    builder
      .addCase(fetchMultidataAction.pending, (state, { payload }) => {
        console.log('pengding 状态')
      })
      .addCase(fetchMultidataAction.fulfilled, (state, { payload }) => {
        state.banners = payload.data.banner.list || []
        state.recommonds = payload.data.recommend.list || []
        console.log('fulfilled 状态')
      })
      .addCase(fetchMultidataAction.rejected, (state, { payload }) => {
        console.log('rejected 状态')
      })
  }
})

export const { changeBannersAction, changeRecommondsAction } = categorySlice.actions

export default categorySlice.reducer
