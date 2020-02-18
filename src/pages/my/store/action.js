import {SET_USER_INFO} from './constant'

export const user_info = (data) =>{
    return {
        data,
        type: SET_USER_INFO
    }
}