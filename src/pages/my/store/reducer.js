import {SET_USER_INFO, SET_STUDENT_INFO} from './constant'

const initState = {
    nick_name: '',
    gender: '',
    avatar_url: '',
    country: '',
    city: '',
    studentID: '',
    studentSchool: ''
}

const userInfo = (state = initState, action) => {
    switch(action.type){
        case SET_USER_INFO:
            console.log(action.data)
            return {
                ...state,
                nick_name: action.data.nick_name,
                gender: action.data.gender,
                avatar_url: action.data.avatar_url,
                country: action.data.country,
                city: action.data.city,
            }
<<<<<<< HEAD
        case SET_STUDENT_INFO:
            return {
                ...state,
                studentID: action.data.studentID,
                studentSchool: action.data.studentSchool
            }
        default: 
=======
        default:
>>>>>>> d91c6ad71377daa8db9fe49a3175a5fe769a2ef4
            return state
    }
}

export default userInfo
