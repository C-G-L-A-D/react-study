import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 100
  },
  reducers: {
    addNumber(state, action) {
      state.counter += action.payload
    },
    subNumber(state, action) {
      state.counter -= action.payload
    }
  }
})

export const { addNumber, subNumber } = homeSlice.actions

export default homeSlice.reducer
