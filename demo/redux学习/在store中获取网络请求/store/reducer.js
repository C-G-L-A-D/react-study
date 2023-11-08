import * as actionType from './constants'

const initialState = {
  counter: 100,
  banners: [],
  recommonds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.INCREASING:
      return { ...state, counter: state.counter + action.num }
    case actionType.DECREASING:
      return { ...state, counter: state.counter - action.num }
    case actionType.CHANGE_BANNERS:
      return { ...state, banners: action.list }
    case actionType.CHANGE_RECOMMONDS:
      return { ...state, recommonds: action.list }
    default:
      return state
  }
}
