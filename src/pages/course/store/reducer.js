import { WEEK_NUM, SELECT_WEEK, SELECT_SPECIFIC_WEEK } from './contants'

const defaultStore = {
  course_d: [[[{
    place: '东3211',
    course: '计算机操作系统',
    teacher: '马立平',
    week: [1,2,3,4,5,6],
    start_section: 1,
    section_length: 2
  }, {
    place: '东3211',
    course: '计算机网络',
    teacher: '马立平',
    week: [6,7,8,9,10],
    start_section: 1,
    section_length: 2
  }], [{
    place: '东3211',
    course: '数据库',
    teacher: '马立平',
    week: [2,3,4,5,6,8,9],
    start_section: 2,
    section_length: 2
  }]], [[{
    place: '东3211',
    course: '计算机操作系统',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 2
  }, {
    place: '东3211',
    course: '计算机网络',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 4
  }], [{
    place: '东3211',
    course: '数据库',
    teacher: '马立平',
    week: [2,3,4,5,6,8,9],
    start_section: 3,
    section_length: 2
  }]], [[{
    place: '东3211',
    course: '计算机操作系统',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 2
  }, {
    place: '东3211',
    course: '计算机网络',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 4
  }], [{
    place: '东3211',
    course: '数据库',
    teacher: '马立平',
    week: [2,3,4,5,6,8,9],
    start_section: 3,
    section_length: 2
  }]], [[{
    place: '东3211',
    course: '计算机操作系统',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 2
  }, {
    place: '东3211',
    course: '计算机网络',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 4
  }], [{
    place: '东3211',
    course: '数据库',
    teacher: '马立平',
    week: [2,3,4,5,6,8,9],
    start_section: 3,
    section_length: 2
  }]], [[{
    place: '东3211',
    course: '计算机操作系统',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 2
  }, {
    place: '东3211',
    course: '计算机网络',
    teacher: '马立平',
    week: [1,3,4,5,6,7,8,9,10],
    start_section: 1,
    section_length: 4
  }], [{
    place: '东3211',
    course: '数据库',
    teacher: '马立平',
    week: [2,3,4,5,6,8,9],
    start_section: 5,
    section_length: 4
  }]], [], []],
  left_data: [1, 2, 3, 4, '中', 5, 6, 7, 8, '晚', 9, 10, 11, 12],
  margin_top: 60,
  arrow_up: false,
  select_week: 2,
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
    default:
      return state
  }
}

export default course
