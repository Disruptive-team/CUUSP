import {SET_USER_INFO} from './constant'

const initState = {
    nick_name: '',
    gender: '',
    avatar_url: '',
    country: '',
    city: '',
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
        default:
            return state
    }
}

export default userInfo
