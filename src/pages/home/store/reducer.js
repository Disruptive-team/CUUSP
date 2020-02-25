import {GET_TODAY_COURSE} from './constants'

const defaultStore = {
  today_course: []
}

export const home = (state = defaultStore, action) => {
  switch (action.type) {
    case GET_TODAY_COURSE:
      return {
        ...state,
        today_course: action.today_course
      }
    default:
      return state
  }
}

export default home
