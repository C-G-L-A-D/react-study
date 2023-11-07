import * as actionType from './constants'
import axios from 'axios'

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

export const fetchMultidataAction = () => {
  return (dispatch, getState) => {
    axios
      .get('http://123.207.32.32:8000/home/multidata')
      .then(res => {
        const banners = res.data.data.banner.list || []
        const recommend = res.data.data.recommend.list || []
        dispatch(changeBannersAction(banners))
        dispatch(changeRecommondsAction(recommend))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
