// eslint-disable-next-line import/prefer-default-export
export const compute_week = (start_time) => {
  return parseInt(''+(new Date().getTime() - new Date(start_time))/(7*24*3600*1000))+1
}
