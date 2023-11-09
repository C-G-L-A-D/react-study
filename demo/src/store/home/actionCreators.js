import * as actionType from './constants'

export const increasingAction = num => ({
  type: actionType.INCREASING,
  num
})

export const decreasingAction = num => ({
  type: actionType.DECREASING,
  num
})
