import { combineReducers } from 'redux'
import { course } from '../pages/course/store/index'
import {userInfo} from '../pages/my/store/index'  

import {SET_COMMON_INFO} from './constant'

const initState = {
    bindID: false
}

const commonInfo = (state = initState, action) => {
    switch(action.type){
        case SET_COMMON_INFO:
            console.log(action.data)
            return {
                ...state,
                bindID: action.data.bindID,
            }
        default:
            return state
    }
}

export default combineReducers({
    userInfo,
    course,
    commonInfo
})
