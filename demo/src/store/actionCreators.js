import { INCREASING, DECREASING } from './constants'

export const increasingAction = num => ({
  type: INCREASING,
  num
})

export const decreasingAction = num => ({
  type: DECREASING,
  num
})
