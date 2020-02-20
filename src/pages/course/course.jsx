import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './course.css'
import Calendar from '../../components/calendar/Calendar'
import CourseDetail from '../../components/course_detail'

import { actionCreators } from './store'

import { pullDownRefreshContent } from '../../utils/globalConstant'

@connect(({ course }) => ({
  course_d: course.course_d,
  margin_top: course.margin_top,
  left_data: course.left_data,
  week_num: course.week_num,
  arrow_up: course.arrow_up,
  select_week: course.select_week,
  detail_week: course.detail_week,
  detail_course: course.detail_course,
  is_click: course.is_click,
  start_section: course.start_section,
  select_aim_color: course.select_aim_color
}), (dispatch) => ({
  onDealWeekNum () {
    dispatch(actionCreators.week_num())
  },
  onSelectWeek (arrow_up, margin_top) {
    dispatch(actionCreators.select_week(arrow_up, margin_top))
  },
  onSelectSpecificWeek (item, index) {
    dispatch(actionCreators.select_specific_week(item, index))
  },
  onGetCourseInfo () {
    dispatch(actionCreators.get_course_info())
  },
  onDetailCourse (detail_week, detail_course, start_section) {
    dispatch(actionCreators.detail_course(detail_week, detail_course, start_section))
  },
  onDeleteMask () {
    dispatch(actionCreators.delete_mask())
  }
}))
class Course extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '课表',
    enablePullDownRefresh: true
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDealWeekNum()
    this.props.onGetCourseInfo()
  }

  onPullDownRefresh() {
    Taro.startPullDownRefresh().then(() => {
      Taro.showModal({title: '温馨提示', content: pullDownRefreshContent}).then(r => {
        if (r.confirm) {
          this.props.onGetCourseInfo()
        }
      })
    })
    Taro.stopPullDownRefresh()
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

  course_detail (index, course, start_section) {
    this.props.onDetailCourse(index, course, start_section)
  }

  delete_mask (e) {
    if(e.target.id === 'course') {
      this.props.onDeleteMask()
    }
  }

  setting () {
    Taro.navigateTo({url: '/pages/setting/index'}).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <View className='course'>
        <View className='position_fixed' id='position_fixed'>
          <View className='top'>
            {/*<View className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe6cd;</View>*/}
            {this.props.arrow_up && <View onClick={this.props.onSelectWeek.bind(this, this.props.arrow_up, this.props.margin_top)} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe797;</View>}
            {!this.props.arrow_up && <View onClick={this.props.onSelectWeek.bind(this, this.props.arrow_up, this.props.margin_top)} className='iconfont' style='font-size: 16px;padding: 8px 8px'>第 {this.state.select_week} 周 &#xe6b9;</View>}
            <View onClick={this.setting} className='iconfont' style='font-size: 16px;padding: 8px 8px'>&#xe69d;</View>
          </View>
          <View className='week'>
            {this.props.arrow_up &&
            <View className='scroll_view'>
              {this.props.week_num.map((item, index) => {
                return (<View onClick={this.props.onSelectSpecificWeek.bind(this, item, index)} key={index} className='week_item'>
                  <View className='week_top' style='display: inline-block; width: 50px; text-align: center'>第{item}周</View>
                  <View className='iconfont' style={'font-size: 30px; color: '+this.props.select_aim_color[index]+'; text-align: center'}>&#xe606;</View>
                </View>)
              })}
            </View>
            }
          </View>
          <Calendar week={this.props.select_week} start_date='2020-2-17' />
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
            {this.props.is_click && <View id='course' className='course_detail' onClick={this.delete_mask}>
              <View className='course_detail_wrapper'>
                <CourseDetail detail={{course_d: this.props.course_d, detail_week: this.props.detail_week, detail_course: this.props.detail_course, start_section: this.props.start_section}} />
              </View>
            </View>}
            {this.props.course_d.map((item, index) => {
              return (<View key={index} className='col'>
                <View className='col-wrapper'>
                  {item.map((item1, index1) => {
                    item1 = this.dealItem(this.props.select_week, item1)
                    return (<View key={index1} className='course-item-outer'>
                      {this.isOverLap(this.props.select_week, item1) && <View className='overlap'>重</View>}
                      {this.isWeekIn(this.props.select_week, item1[0].week) && <View onClick={this.course_detail.bind(this, index, item1[0].course, item1[0].start_section, item1[0].teacher, item1[0].section_length)} className='course-item' style={'height: '+(item1[0].section_length*60-2)+'PX;top: '+this.position_course_item(item1[0].start_section)+'PX'}>@{item1[0].place}{item1[0].course}</View>}
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
