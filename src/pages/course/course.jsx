import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './course.css'
import Calendar from '../../components/calendar/Calendar'
import CourseDetail from '../../components/course_detail'

import { actionCreators } from './store'
import { wfw_url } from '../../utils/url'

@connect(({ course, commonInfo }) => ({
  course_d: course.course_d || [],
  margin_top: course.margin_top,
  left_data: course.left_data,
  week_num: course.week_num,
  arrow_up: course.arrow_up,
  select_week: course.select_week,
  detail_week: course.detail_week,
  detail_course: course.detail_course,
  is_click: course.is_click,
  start_section: course.start_section,
  select_aim_color: course.select_aim_color,
  only_current_week: course.only_current_week,
  isBind: commonInfo.bindID
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
  onGetCourseInfo (url) {
    dispatch(actionCreators.get_course_info(url))
  },
  onDetailCourse (detail_week, detail_course, start_section) {
    dispatch(actionCreators.detail_course(detail_week, detail_course, start_section))
  },
  onDeleteMask () {
    dispatch(actionCreators.delete_mask())
  },
  onCacheToStore (course_data) {
    dispatch(actionCreators.cache_to_store(course_data))
  },
  onOnlyShowCurrentWeek (data) {
    dispatch(actionCreators.only_show_current_week(data))
  }
}))
class Course extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '课表',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDealWeekNum()
    Taro.getStorage({key: 'course_data'}).then((res) => {
      this.props.onCacheToStore(res.data.res_d)
    }).catch(() => {})
    // 从缓存中读出是否仅显示当前周
    let current_week
    try {
      current_week = Taro.getStorageSync('current_week')
    } catch (e) {}
    if (current_week) {
      this.props.onOnlyShowCurrentWeek(current_week)
    }
    // let auth_token
    // try {
    //   // Taro.showLoading({title: 'loading'})
    //   auth_token = Taro.getStorageSync('auth_token')
    // } catch (e) {
    // }
    // if (auth_token) {
    //   Taro.hideLoading()
    //   this.props.onGetCourseInfo(0)
    // }
    // else {
    //   setTimeout(() => {
    //     this.props.onGetCourseInfo(0)
    //     Taro.hideLoading()
    //   }, 3000)
    // }
  }

  onPullDownRefresh() {
    // 判断是否绑定学号
    console.log(this.props.isBind)
    if (this.props.isBind) {
      this.props.onGetCourseInfo(wfw_url + '/api/course/getAllLast')
    } else {
      Taro.showModal({title: '~温馨提示~', content: '未绑定学号，前往绑定中心绑定'}).then(res => {
        if (res.confirm) {
          Taro.navigateTo({url: '/pages/register/register'})
        }
      })
    }
    //
    // let Authorization
    // try {
    //   Authorization = Taro.getStorageSync('auth_token')
    // } catch (e) {}
    // whetherBindID({auth_token: Authorization}).then(r => {
    //   if (r.data.data.bind === 0) {
    //     Taro.showModal({title: '~温馨提示~', content: '未绑定学号，前往绑定中心绑定'}).then(rr => {
    //       if (rr.confirm) {
    //         Taro.switchTab({url: '/pages/my/my'})
    //       }
    //     })
    //   } else {
    //     Taro.startPullDownRefresh().then(() => {
    //       Taro.showModal({title: '温馨提示', content: pullDownRefreshContent}).then(res => {
    //         if (res.confirm) {
    //           this.props.onGetCourseInfo(1)
    //         }
    //       })
    //     })
    //   }
    // })
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
    Taro.navigateTo({url: '/pages/setting/index'})
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
                      {this.isWeekIn(this.props.select_week, item1[0].week) && <View onClick={this.course_detail.bind(this, index, item1[0].course, item1[0].start_section, item1[0].teacher, item1[0].section_length)} className='course-item' style={'height: '+(item1[0].section_length*60-2)+'PX;top: '+this.position_course_item(item1[0].start_section)+'PX;background-color: '+item1[0].color}>@{item1[0].place}{item1[0].course}</View>}
                      {this.props.only_current_week && !this.isWeekIn(this.props.select_week, item1[0].week) && <View onClick={this.course_detail.bind(this, index, item1[0].course, item1[0].start_section, item1[0].teacher, item1[0].section_length)} className='course-item' style={'height: '+(item1[0].section_length*60-2)+'PX;top: '+this.position_course_item(item1[0].start_section)+'PX;color: #ccc'}>@{item1[0].place}{item1[0].course}</View>}
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
