import { WEEK_NUM, SELECT_WEEK, SELECT_SPECIFIC_WEEK, GET_COURSE_INFO, DETAIL_COURSE, DELETE_MASK } from './constants'

const defaultStore = {
  course_d: [[], [], [], [], [], [], []],
  left_data: [1, 2, 3, 4, '中', 5, 6, 7, 8, '晚', 9, 10, 11, 12],
  margin_top: 60,
  arrow_up: false,
  select_week: 2,
  detail_week: 0,
  detail_course: '',
  is_click: false,
  start_section: 1
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
        select_week: action.item
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
    default:
      return state
  }
}

export default course
