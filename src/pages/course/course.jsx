import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'

import './course.css'
import Calendar from '../../components/calendar/Calendar'
import CourseComponent from '../../components/course/CourseComponent'

class Course extends Component {

  config = {
    navigationBarTitleText: '课表',
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidMount() {
    let week_num = []
    for (let i = 1; i < 25; i++) {
      week_num.push(i)
    }
    this.setState({week_num})
    this.getTopHeight()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  getTopHeight() {
    Taro.createSelectorQuery().select('#position_fixed').fields({
      dataset: true,
      size: true
    }, res => {
      this.setState({
        margin_top: res.height + 2
      })
    }).exec()
  }

  selectWeek() {
    this.setState({
      arrow_up: !this.state.arrow_up,
      margin_top: this.state.margin_top + 30
    })
    if (this.state.arrow_up) {
      this.setState({
        margin_top: this.state.margin_top - 30
      })
    }
  }

  selectSpecificWeek(item) {
    this.setState({
      select_week: item
    })
  }

  isWeekIn (current_week, week_list) {
    return week_list.includes(current_week);
  }

  position_course_item (start_section) {
    if (start_section<3) {
      return (start_section-1)*120
    } else if (start_section<5) {
      return (start_section-1)*120 + 60
    } else {
      return start_section*120
    }
  }

  dealItem (week, item) {
    if(item.length>0&&item[0].week.includes(week)) {
      if(item[0].week.includes(week)) return item
    }
    for(let i=1;i<item.length;i++) {
      if(item[i].week.includes(week)) {
        let temp = item[i]
        item[i] = item[0]
        item[0] = temp
        break
      }
    }
    return item
  }

  isOverLap (week, item) {
    if(item.length<=1) return false
    let flag = 0
    for(let i=0;i<item.length;i++) {
      if(item[i].week.includes(week)) {
        flag++
      }
    }
    return flag >= 2
  }

  state = {
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
    arrow_up: false,
    week_num: [],
    margin_top: 64,
    left_data: [1, 2, 3, 4, '中', 5, 6, 7, 8, '晚', 9, 10, 11, 12],
    select_week: 2
  }

  render() {
    return (
      <View className='course'>
        <View className='position_fixed' id='position_fixed'>
          <View className='top'>
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe6cd;</View>
            {this.state.arrow_up && <View onClick={this.selectWeek} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe797;</View>}
            {!this.state.arrow_up && <View onClick={this.selectWeek} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe6b9;</View>}
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe623;</View>
          </View>
          <View className='week'>
            {this.state.arrow_up &&
            <ScrollView className='scroll_view' scrollX='false'>
              {this.state.week_num.map((item, index) => {
                return (<View onClick={this.selectSpecificWeek.bind(this, item)} key={index} className='week_item'>
                  <Text style='display: inline'>{item}</Text>
                </View>)
              })}
            </ScrollView>}
          </View>
          <Calendar week={this.state.select_week} start_date='2019-8-26' />
        </View>
        <View className='course-content' style={'margin-top: ' + this.state.margin_top + 'px'}>
          <View className='left-section'>
            <View className='left-section-wrapper'>
              {this.state.left_data.map((item, index) => {
                return (<View key={index}>{item}</View>)
              })}
            </View>
          </View>
          <View className='course-content-right'>
            {this.state.course_d.map((item, index) => {
              return (<View key={index} className='col'>
                <View className='col-wrapper'>
                  {item.map((item1, index1) => {
                    item1 = this.dealItem(this.state.select_week, item1)
                    return (<View key={index1} className='course-item-outer'>
                      {this.isOverLap(this.state.select_week, item1)&&<View className='overlap'>重</View>}
                      {this.isWeekIn(this.state.select_week, item1[0].week) && <View className='course-item' style={'height: '+(item1[0].section_length*60-2)+'PX;top: '+this.position_course_item(item1[0].start_section)+'PX'}>@{item1[0].place}{item1[0].course}</View>}
                    </View>)
                  })}
                </View>
              </View>)
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Course
