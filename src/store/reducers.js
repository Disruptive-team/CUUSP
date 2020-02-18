import { combineReducers } from 'redux'
import { course } from '../pages/course/store/index'
import {userInfo} from '../pages/my/store/index'  

export default combineReducers({
    userInfo,
    course
})
