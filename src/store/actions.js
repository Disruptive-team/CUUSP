import {SET_COMMON_INFO, UPDATE_START_TIME} from './constant'

export const common_info = (data) =>{
    return {
        data,
        type: SET_COMMON_INFO
    }
}
export const update_start_time = (start_time) => {
  return {
    type: UPDATE_START_TIME,
    start_time
  }
}
