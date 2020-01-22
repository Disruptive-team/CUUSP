import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'

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
    this.setState({week_num})
    this.getTopHeight()
  }

  getTopHeight () {
    Taro.createSelectorQuery().select('#position_fixed').fields({
      dataset: true,
      size: true
    }, res => {
      console.log(res.height)
      this.setState({
        margin_top: res.height+2
      })
    }).exec()
  }

  selectWeek () {
    this.setState({
      arrow_up: !this.state.arrow_up
    })
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
    arrow_up: false,
    week_num: [],
    margin_top: 64,
    left_data: [1, 2, 3, 4, '中\n午', 5, 6, 7, 8, '晚\n上', 9, 10, 11, 12]
  }

  render () {
    return (
      <View className='course'>
        <View className='position_fixed' id='position_fixed'>
          <View className='top'>
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe6cd;</View>
            {this.state.arrow_up && <View onClick={this.selectWeek} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 10 周 &#xe797;</View>}
            {!this.state.arrow_up && <View onClick={this.selectWeek} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 10 周 &#xe6b9;</View>}
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe623;</View>
          </View>
          <View className='week'>
            {this.state.arrow_up &&
              <ScrollView className='scroll_view' scrollX='false'>
                {this.state.week_num.map((item, index) => {
                  return (<View key={index} className='week_item'>
                      <Text style='display: inline'>{item}</Text>
                  </View>)
                })}
              </ScrollView>}
          </View>
          <Calendar week='3' start_date='2020-01-06' />
        </View>
        <View className='course-content' style={'margin-top: '+this.state.margin_top+'px'}>
          <View className='left-section'>
            <View className='left-section-wrapper'>
              {this.state.left_data.map((item, index) => {
                return (<View key={index}>{item}</View>)
              })}
            </View>
          </View>
          <View className='course-content'>
            <CourseComponent bg_color='pink' course_data={this.state.course_d} />
          </View>
        </View>
      </View>
    )
  }
}

export default Course
