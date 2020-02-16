import { combineReducers } from 'redux'
import {SET_USER_INFO} from './constants'

const initialState = {
    userInfo: {
        nick_name: '12323'
    }
}



export function setUserInfo(state = initialState, action){
    console.log(state, action)
    console.log(SET_USER_INFO == 'setUserInfo ', action.type == 'setUserInfo')
    switch(action.type){
        case SET_USER_INFO: 
            console.log(action.value)
            return {
                ...state,
                userInfo: action.value
            }
        default: 
            return state
    }

}
export default combineReducers({
    setUserInfo
})
