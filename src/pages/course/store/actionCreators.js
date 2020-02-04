import Taro from '@tarojs/taro'
import { WEEK_NUM, SELECT_WEEK, SELECT_SPECIFIC_WEEK, GET_COURSE_INFO, DETAIL_COURSE, DELETE_MASK } from './constants'

import { url } from '../../../utils/url'

const deal_week_num = () => {
  let week_num = []
  for (let i = 1; i < 25; i++) {
    week_num.push(i)
  }
  return week_num
}

const compute_margin_top = (arrow_up, margin_top) => {
  console.log(margin_top)
  return arrow_up ? margin_top - 70 : margin_top + 70
}

const getCourseInfo = (res) => ({
  type: GET_COURSE_INFO,
  course_d: res.data || [[], [], [], [], [], [], []]
})
// eslint-disable-next-line import/prefer-default-export
export const week_num = () => {
  return {
    type: WEEK_NUM,
    week_num: deal_week_num()
  }
}

export const select_week = (arrow_up, margin_top) => {
  return {
    type: SELECT_WEEK,
    margin_top: compute_margin_top(arrow_up, margin_top)
  }
}

export const select_specific_week = (item, index) => {
  return {
    type: SELECT_SPECIFIC_WEEK,
    item,
    index
  }
}

export const get_course_info = () => {
  return (dispatch) => {
    Taro.request({url: url + '/api/course_info'}).then(res => {
      dispatch(getCourseInfo(res))
    }).catch(err => {
      console.log(err)
    })
  }
}

export const detail_course = (detail_week, detail_courses, start_section) => {
  return {
    type: DETAIL_COURSE,
    detail_week,
    detail_courses,
    start_section
  }
}

export const delete_mask = () => {
  return {
    type: DELETE_MASK
  }
}
