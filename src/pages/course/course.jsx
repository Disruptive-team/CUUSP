import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './course.css'
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
class Course extends Component {

  config = {
    navigationBarTitleText: '课表',
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount() {
    let week_num = []
    for(let i=1;i<25;i++) {
      week_num.push(i)
    }
    console.log(week_num)
    this.setState({week_num})
  }

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
    }],
    arrow_up: true,
    week_num: []
  }

  render () {
    return (
      <View className='course'>
        <View className='top'>
          <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe6cd;</View>
          {this.state.arrow_up && <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 10 周 &#xe6b9;</View>}
          {!this.state.arrow_up && <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 10 周 &#xe797;</View>}
          <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe623;</View>
        </View>
        <View className='week'>
          {this.state.arrow_up && <View className='week_inner'>{
            this.state.week_num.map((item, index) => {
              return (<View key={index}>{item}</View> )
            })
          }</View>}
        </View>
        <Calendar week='3' start_date='2020-01-06' />
        <CourseComponent bg_color='pink' course_data={this.state.course_d} />
      </View>
    )
  }
}

export default Course
