import * as actionType from './constants'

const initialState = {
  counter: 100
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.INCREASING:
      return { ...state, counter: state.counter + action.num }
    case actionType.DECREASING:
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}
