import {
  WEEK_NUM,
  SELECT_WEEK,
  SELECT_SPECIFIC_WEEK,
  GET_COURSE_INFO,
  DETAIL_COURSE,
  DELETE_MASK,
  ONLY_SHOW_CURRENT_WEEK, CACHE_TO_STORE
} from './constants'

const defaultStore = {
  course_d: [[], [], [], [], [], [], []],
  left_data: [1, 2, 3, 4, '中', 5, 6, 7, 8, '晚', 9, 10, 11, 12],
  margin_top: 60,
  arrow_up: false,
  select_week: 1,
  detail_week: 0,
  detail_course: '',
  is_click: false,
  start_section: 1,
  only_current_week: false,
  select_aim_color: ['#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999', '#999']
}

const deal_color = (index, color) => {
  for(let i=0;i<color.length;i++) {
    color[i] = '#999'
  }
  color[index] = '#00BFFF'
  return color
}


const course = (state = defaultStore, action) => {
  switch (action.type) {
    case WEEK_NUM:
      return {
        ...state,
        week_num: action.week_num
      }
    case SELECT_WEEK:
      return {
        ...state,
        arrow_up: !state.arrow_up,
        margin_top: action.margin_top < 60 ? 60 : action.margin_top
      }
    case SELECT_SPECIFIC_WEEK:
      return {
        ...state,
        select_week: action.item,
        select_aim_color: deal_color(action.index, state.select_aim_color)
      }
    case GET_COURSE_INFO:
      return {
        ...state,
        course_d: action.course_d
      }
    case DETAIL_COURSE:
      return {
        ...state,
        detail_week: action.detail_week,
        detail_course: action.detail_courses,
        start_section: action.start_section,
        is_click: true
      }
    case DELETE_MASK:
      return {
        ...state,
        is_click: false
      }
    case ONLY_SHOW_CURRENT_WEEK:
      return {
        ...state,
        only_current_week: !state.only_current_week
      }
    case CACHE_TO_STORE:
      return {
        ...state,
        course_d: action.course_data
      }
    default:
      return state
  }
}

export default course
