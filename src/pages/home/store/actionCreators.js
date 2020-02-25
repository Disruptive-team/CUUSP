import {GET_TODAY_COURSE} from './constants'

// eslint-disable-next-line import/prefer-default-export
export const get_today_course = (today_course) => {
  return {
    type: GET_TODAY_COURSE,
    today_course
  }
}
