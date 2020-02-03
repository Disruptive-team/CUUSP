import { WEEK_NUM, SELECT_WEEK, SELECT_SPECIFIC_WEEK } from './contants'

const deal_week_num = () => {
  let week_num = []
  for (let i = 1; i < 25; i++) {
    week_num.push(i)
  }
  return week_num
}

const compute_margin_top = (arrow_up, margin_top) => {
  console.log(margin_top)
  return arrow_up ? margin_top - 30 : margin_top + 30
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

export const select_specific_week = (item) => {
  return {
    type: SELECT_SPECIFIC_WEEK,
    item
  }
}

