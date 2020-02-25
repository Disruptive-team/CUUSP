import Taro from '@tarojs/taro'
import {
  WEEK_NUM,
  SELECT_WEEK,
  SELECT_SPECIFIC_WEEK,
  GET_COURSE_INFO,
  DETAIL_COURSE,
  DELETE_MASK,
  ONLY_SHOW_CURRENT_WEEK,
  CACHE_TO_STORE
} from './constants'
import resolve_course from '../resolve/resolve_course'

import { wfw_url } from '../../../utils/url'
import {actionCreators} from '../../home/store'
import {update_today_course} from '../../../utils/deal_today_course'

/**
 * @desc 初始化周数
 * @returns {[]}
 */
const deal_week_num = () => {
  let week_num = []
  for (let i = 1; i < 25; i++) {
    week_num.push(i)
  }
  return week_num
}
/**
 * @desc 根据arrow_up计算课表的margin-top
 * @param arrow_up
 * @param margin_top
 * @returns number
 */
const compute_margin_top = (arrow_up, margin_top) => {
  return arrow_up ? margin_top - 70 : margin_top + 70
}

const getCourseInfo = (res, week) => ({
  type: GET_COURSE_INFO,
  course_d: res || [[], [], [], [], [], [], []],
  select_week: week
})
/**
 * @desc 请求课表
 * @param url
 * @param dispatch
 */
const requestCourseData = (url, dispatch) => {
  let Authorization
  try {
    // 获取缓存Authorization
    Authorization = Taro.getStorageSync('auth_token')
  } catch (e) {}
  if (url === wfw_url + '/api/course/getAllRealTime') {
      Taro.showLoading({title: '正在爬取课表...'})
  }
  Taro.request({url, header: {Authorization}, method: 'GET'}).then(res => {
    Taro.hideLoading()
    if (res.data.code === 200) {
      Taro.showToast({title: '刷新成功', duration: 2000}).then(() => {
        Taro.switchTab({url: '/pages/course/course'})
      })
      // 解析课表数据
      let res_d = resolve_course(res.data.data)
      // 将课表数据和当前周存入缓存
      Taro.setStorage({
        key: 'course_data',
        data: { res_d, week: res.data.data.body.week }
      }).then(() => {})
      dispatch(getCourseInfo(res_d, res.data.data.body.week))
      dispatch(actionCreators.get_today_course(update_today_course(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, res_d, res.data.data.body.week)))
    } else {
      if (url === wfw_url + '/api/course/getAllRealTime') {
        Taro.showModal({title: '~温馨提示~', content: '获取课表失败，请检查学号密码是否正确或者查看学校教务处是否可用后重新绑定'})
      } else {
        Taro.showToast({title: '刷新失败', icon: 'none'})
      }
    }
  }).catch(() => {
    Taro.hideLoading()
    Taro.showToast({title: '刷新失败', icon: 'none'})
  })
}
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

export const get_course_info = (url) => {
  return (dispatch) => {
    requestCourseData(url, dispatch)
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

export const only_show_current_week = (data) => {
  return {
    type: ONLY_SHOW_CURRENT_WEEK,
    only_current_week: data
  }
}

export const cache_to_store = (course_data) => {
  return {
    type: CACHE_TO_STORE,
    course_data
  }
}
