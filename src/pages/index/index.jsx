import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.css'
import Calendar from '../../components/calendar/Calendar'
import CourseComponent from '../../components/course/CourseComponent'


// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  state = {
    course_d: [{
      place: '东3211',
      course: '计算机操作系统',
      teacher: '马立平',
      week: '01-13',
      section_length: '1-2',
    }, {
      place: '东3211',
      course: '计算机操作系统',
      teacher: '马立平',
      week: '01-13',
      section_length: '1-4',
    }]
  }

  render () {
    Taro.navigateTo({
      url: '../login/login'
    })
    return (
      <View className='index'>
        <Calendar week='3' start_date='2020-01-06' />
        <CourseComponent bg_color='pink' course_data={this.state.course_d} />
      </View>
    )
  }
}

export default Index
