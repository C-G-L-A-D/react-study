import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMultidataAction = createAsyncThunk(
  'fetch/categorymultidate',
  async (state, action) => {
    try {
      const res = await axios.get('http://123.207.32.32:8000/home/multidata')
      const banners = res.data.data.banner.list || []
      const recommend = res.data.data.recommend.list || []
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
  extraReducers: {
    // 监听 fetchMultidataAction 派发中状态
    [fetchMultidataAction.pending](state, action) {},
    [fetchMultidataAction.fulfilled](state, action) {},
    [fetchMultidataAction.rejected](state, action) {}
  }
})

export const { changeBannersAction, changeRecommondsAction } = categorySlice.actions

export default categorySlice.reducer
