import {SET_USER_INFO, SET_STUDENT_INFO} from './constant'

export const user_info = (data) =>{
    return {
        data,
        type: SET_USER_INFO
    }
}

export const student_info = (data) => {
    return {
        data,
        type: SET_STUDENT_INFO
    }
}