import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.css'
import { actionCreators } from '../course/store'

@connect(({course}) => ({
  test: course
}), (dispatch) => ({
  onGetCourseInfo (source) {
    dispatch(actionCreators.get_course_info(source))
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
      </View>
    )
  }
}

export default Setting
