import * as actionType from './constants'

export const increasingAction = num => ({
  type: actionType.INCREASING,
  num
})

export const decreasingAction = num => ({
  type: actionType.DECREASING,
  num
})

export const changeBannersAction = list => ({
  type: actionType.CHANGE_BANNERS,
  list
})

export const changeRecommondsAction = list => ({
  type: actionType.CHANGE_RECOMMONDS,
  list
})
