import { INCREASING, DECREASING } from './constants'

const initialState = {
  counter: 100
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASING:
      return { ...state, counter: state.counter + action.num }
    case DECREASING:
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}
