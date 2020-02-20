import Taro from '@tarojs/taro'
import { WEEK_NUM, SELECT_WEEK, SELECT_SPECIFIC_WEEK, GET_COURSE_INFO, DETAIL_COURSE, DELETE_MASK } from './constants'
import resolve_course from '../resolve/resolve_course'

import { url, wfw_url } from '../../../utils/url'

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
  course_d: res || [[], [], [], [], [], [], []]
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
    try {
      let course_data = Taro.getStorageSync('course_data')
      if (!course_data) {
        Taro.request({url: wfw_url + '/api/course/getAllLast'}).then(res => {
          let res_d = resolve_course(res.data.data)
          Taro.setStorage({
            key: 'course_data',
            data: res_d
          }).then(() => {})
          dispatch(getCourseInfo(res_d))
        }).catch(err => {
          console.log(err)
        })
      } else {
        Taro.getStorage({key: 'course_data'}).then((r) => {
          dispatch(getCourseInfo(r.data))
        })
      }
    } catch (e) {

    }
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
