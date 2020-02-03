import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './course.css'
import Calendar from '../../components/calendar/Calendar'

import { actionCreators } from './store'

@connect(({ course }) => ({
  course_d: course.course_d,
  margin_top: course.margin_top,
  left_data: course.left_data,
  week_num: course.week_num,
  arrow_up: course.arrow_up,
  select_week: course.select_week,
}), (dispatch) => ({
  onDealWeekNum () {
    dispatch(actionCreators.week_num())
  },
  onSelectWeek (arrow_up, margin_top) {
    dispatch(actionCreators.select_week(arrow_up, margin_top))
  },
  onSelectSpecificWeek (item) {
    dispatch(actionCreators.select_specific_week(item))
  }
}))
class Course extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '课表',
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDealWeekNum()
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

  render() {
    return (
      <View className='course'>
        <View className='position_fixed' id='position_fixed'>
          <View className='top'>
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe6cd;</View>
            {this.props.arrow_up && <View onClick={this.props.onSelectWeek.bind(this, this.props.arrow_up, this.props.margin_top)} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe797;</View>}
            {!this.props.arrow_up && <View onClick={this.props.onSelectWeek.bind(this, this.props.arrow_up, this.props.margin_top)} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe6b9;</View>}
            <View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe623;</View>
          </View>
          <View className='week'>
            {this.props.arrow_up &&
            <ScrollView className='scroll_view' scrollX='false'>
              {this.props.week_num.map((item, index) => {
                return (<View onClick={this.props.onSelectSpecificWeek.bind(this, item)} key={index} className='week_item'>
                  <Text style='display: inline'>{item}</Text>
                </View>)
              })}
            </ScrollView>}
          </View>
          <Calendar week={this.props.select_week} start_date='2019-8-26' />
        </View>
        <View className='course-content' style={'margin-top: ' + this.props.margin_top + 'px'}>
          <View className='left-section'>
            <View className='left-section-wrapper'>
              {this.props.left_data.map((item, index) => {
                return (<View key={index}>{item}</View>)
              })}
            </View>
          </View>
          <View className='course-content-right'>
            {this.props.course_d.map((item, index) => {
              return (<View key={index} className='col'>
                <View className='col-wrapper'>
                  {item.map((item1, index1) => {
                    item1 = this.dealItem(this.props.select_week, item1)
                    return (<View key={index1} className='course-item-outer'>
                      {this.isOverLap(this.props.select_week, item1)&&<View className='overlap'>重</View>}
                      {this.isWeekIn(this.props.select_week, item1[0].week) && <View className='course-item' style={'height: '+(item1[0].section_length*60-2)+'PX;top: '+this.position_course_item(item1[0].start_section)+'PX'}>@{item1[0].place}{item1[0].course}</View>}
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
