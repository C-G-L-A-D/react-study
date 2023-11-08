import * as actionType from './constants'

const initialState = {
  banners: [],
  recommonds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.CHANGE_BANNERS:
      return { ...state, banners: action.list }
    case actionType.CHANGE_RECOMMONDS:
      return { ...state, recommonds: action.list }
    default:
      return state
  }
}
