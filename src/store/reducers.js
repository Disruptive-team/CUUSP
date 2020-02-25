import { combineReducers } from 'redux'
import { course } from '../pages/course/store/index'
import { userInfo } from '../pages/my/store/index'
import { home } from '../pages/home/store'

import {SET_COMMON_INFO, UPDATE_START_TIME} from './constant'

const initState = {
  bindID: false,
  start_time: ''
}

const commonInfo = (state = initState, action) => {
  switch (action.type) {
    case SET_COMMON_INFO:
      console.log(action.data)
      return {
        ...state,
        bindID: action.data.bindID,
      }
    case UPDATE_START_TIME:
      return {
        ...state,
        start_time: action.start_time
      }
    default:
      return state
  }
}

export default combineReducers({
  userInfo,
  course,
  commonInfo,
  home
})
