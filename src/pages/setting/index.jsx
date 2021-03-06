import Taro, { Component } from '@tarojs/taro'
import { View, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.css'
import { actionCreators } from '../course/store'
import { wfw_url } from '../../utils/url'
import { update_start_time } from '../../store/actions'

@connect(({ course, commonInfo}) => ({
  course,
  isBind: commonInfo.bindID
}), (dispatch) => ({
  onGetCourseInfo (url) {
    dispatch(actionCreators.get_course_info(url))
  },
  onOnlyShowCurrentWeek (data) {
    dispatch(actionCreators.only_show_current_week(data))
  },
  onUpdateSchoolOpenTime (data) {
    dispatch(update_start_time(data))
  }
}))
class Setting extends Component {

  config = {
    navigationBarTitleText: 'Setting',
  }
  constructor(props) {
    super(props);
  }

  getLastCourse () {
    let isBind
    try {
      isBind = Taro.getStorageSync('isBind')
    } catch (e) {}
    if (isBind !== this.props.isBind) {
      Taro.showToast({title: '无网络', icon: 'none'})
      return
    }
    // 是否绑定学号
    if (this.props.isBind) {
      this.props.onGetCourseInfo(wfw_url + '/api/course/getAllRealTime')
    } else {
      Taro.showModal({title: '~温馨提示~', content: '未绑定学号，前往绑定中心绑定'}).then(res => {
         if (res.confirm) {
           Taro.navigateTo({url: '/pages/register/register'})
        }
      })
    }
  }

  saveOnlyShowCurrentWeek () {
    let current_week
    try {
      current_week = Taro.getStorageSync('current_week')
      this.props.onOnlyShowCurrentWeek(!current_week)
      Taro.setStorageSync('current_week', !current_week)
    } catch (e) {
      Taro.setStorageSync('current_week', this.props.course.only_current_week)
    }
  }

  componentDidMount() {}

  update_school_time () {
    Taro.showLoading({title: 'loading...'})
    Taro.request({url: wfw_url + '/api/getStartTime'}).then(res => {
      if (res.data.code === 200) {
        try {
          Taro.setStorageSync('start_time', res.data.data)
        } catch (e) {}
        this.props.onUpdateSchoolOpenTime(res.data.data)
        Taro.hideLoading()
        Taro.showToast({title: '已更新'})
      } else {
        Taro.hideLoading()
        Taro.showToast({title: '已更新', icon: 'none'})
      }
    }).catch(() => {
      Taro.hideLoading()
      Taro.showToast({title: '已更新', icon: 'none'})
    })
  }

  render() {
    return (
      <View className='list_item'>
        <View onClick={this.getLastCourse}>刷新课表</View>
        <View className='only-show-current-week'>
          <View>仅显示当前课表</View>
          <View>
            <Switch checked={!this.props.course.only_current_week} onClick={this.saveOnlyShowCurrentWeek} />
          </View>
        </View>
        <View onClick={this.update_school_time}>更新开学时间</View>
      </View>
    )
  }
}

export default Setting
