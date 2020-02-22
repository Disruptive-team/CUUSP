import Taro, { Component } from '@tarojs/taro'
import { View, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.css'
import { actionCreators } from '../course/store'

@connect(({course}) => ({
  course
}), (dispatch) => ({
  onGetCourseInfo (source) {
    dispatch(actionCreators.get_course_info(source))
  },
  onOnlyShowCurrentWeek () {
    //Taro.switchTab({url: '/pages/course/course'})
    dispatch(actionCreators.only_show_current_week())
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
    this.props.onGetCourseInfo(2)
  }

  render() {
    return (
      <View className='list_item'>
        <View onClick={this.getLastCourse}>刷新课表</View>
        <View className='only-show-current-week'>
          <View>仅显示当前课表</View>
          <View>
            <Switch checked={!this.props.course.only_current_week} onClick={this.props.onOnlyShowCurrentWeek} />
          </View>
        </View>
      </View>
    )
  }
}

export default Setting
