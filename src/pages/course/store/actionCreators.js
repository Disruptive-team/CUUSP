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

const requestCourseData = (url, dispatch) => {
  let Authorization
  try {
    // 获取缓存Authorization
    Authorization = Taro.getStorageSync('auth_token')
  } catch (e) {}
  if (url === wfw_url + '/api/course/getAllRealTime') {
      Taro.showLoading({title: '正在爬取课表...'})
  }
  console.log('URL:'+url)
  Taro.request({url, header: {Authorization}, method: 'GET'}).then(res => {
    Taro.hideLoading()
    console.log(res)
    if (res.data.code === 200) {
      Taro.showToast({title: '刷新成功'})
      // 解析课表数据
      let res_d = resolve_course(res.data.data)
      // 将课表数据和当前周存入缓存
      Taro.setStorage({
        key: 'course_data',
        data: { res_d, week: res.data.data.body.week }
      }).then(() => {})
      dispatch(getCourseInfo(res_d, res.data.data.body.week))
    } else {
      if (url === wfw_url + '/api/course/getAllRealTime') {
        Taro.showModal({title: '~温馨提示~', content: '获取课表失败，请查看学校教务处是否可用'})
      } else {
        Taro.showToast({title: '刷新失败', icon: 'none'})
      }
    }
  }).catch(() => {
    Taro.hideLoading()
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
    // let course_data
    // let Authorization
    // try {
    //   // 获取缓存课表数据
    //   course_data = Taro.getStorageSync('course_data')
    //   // 获取缓存Authorization
    //   Authorization = Taro.getStorageSync('auth_token')
    // } catch (e) {
    //
    // }
    // // 手动下拉刷新
    // if (source === 1) {
    //   requestData('/api/course/getAllLast', Authorization, dispatch)
    // }
    // //手动刷新最新课表
    // if (source === 2) {
    //   requestData('/api/course/getAllRealTime', Authorization, dispatch, 2)
    // }
    // // 若缓存没有课表数据 加载course时
    // if (!course_data && source === 0) {
    //   // 请求数据库课表数据
    //   Taro.request({url: wfw_url + '/api/course/getAllLast', header: {Authorization}}).then(res => {
    //     if (res.data.code === 200) {
    //       // 解析课表数据
    //       let res_d = resolve_course(res.data.data)
    //       // 将课表数据和当前周存入缓存
    //       Taro.setStorage({
    //         key: 'course_data',
    //         data: { res_d, week: res.data.data.body.week }
    //       }).then(() => {})
    //       dispatch(getCourseInfo(res_d, res.data.data.body.week))
    //     } else {
    //       // 数据库中没有课表数据
    //       Taro.showLoading({title: 'loading'})
    //       // 首次请求教务处
    //       Taro.request({url: wfw_url + '/api/course/getAllRealTime', header: {Authorization}}).then(res1 => {
    //         if (res1.data.code === 200) {
    //           let res_d = resolve_course(res.data.data)
    //           Taro.setStorage({
    //             key: 'course_data',
    //             data: { res_d, week: res.data.data.body.week }
    //           }).then(() => {
    //             Taro.hideLoading()
    //           }).catch(() => {})
    //           dispatch(getCourseInfo(res_d, res1.data.data.body.week))
    //         } else {
    //           Taro.hideLoading()
    //           whetherBindID({auth_token: Authorization}).then(r => {
    //             if (r.data.data.bind === 0) {
    //               Taro.showModal(BindStudentNumberTips).then(rr => {
    //                 if (rr.confirm) {
    //                   Taro.switchTab({url: '/pages/my/my'})
    //                 }
    //               })
    //             } else {
    //               Taro.showModal({title: '~温馨提示~', content: '获取课表失败，请查看学校教务处是否可用'})
    //             }
    //           })
    //         }
    //       }).catch(() => {
    //         Taro.showModal({title: '~温馨提示~', content: '平台罢工，请稍后再试！'})
    //       })
    //     }
    //   })
    // } else {
    //   Taro.getStorage({key: 'course_data'}).then((r) => {
    //     dispatch(getCourseInfo(r.data.res_d, r.data.week))
    //   })
    // }
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

export const only_show_current_week = () => {
  return {
    type: ONLY_SHOW_CURRENT_WEEK
  }
}

export const cache_to_store = (course_data) => {
  return {
    type: CACHE_TO_STORE,
    course_data
  }
}
