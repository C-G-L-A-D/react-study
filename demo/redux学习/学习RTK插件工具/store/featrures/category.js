import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
  extraReducers: {
    // 监听 fetchMultidataAction 派发中状态
    [fetchMultidataAction.pending](state, action) {
      console.log('pengding 状态')
    },
    [fetchMultidataAction.fulfilled](state, { payload }) {
      state.banners = payload.data.banner.list || []
      state.recommonds = payload.data.recommend.list || []
      console.log('fulfilled 状态')
    },
    [fetchMultidataAction.rejected](state, action) {
      console.log('rejected 状态')
    }
  }
})

export const { changeBannersAction, changeRecommondsAction } = categorySlice.actions

export default categorySlice.reducer
