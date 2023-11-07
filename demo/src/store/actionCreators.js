import { INCREASING, DECREASING } from './constants'

export const increasing = num => ({
  type: INCREASING,
  num
})

export const decreasing = num => ({
  type: DECREASING,
  num
})
