import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1,
      c_week: props.week,
      c_start_date: props.start_date,
      chineseNum: [['一'], ['二'], ['三'], ['四'], ['五'], ['六'], ['日']]
    }
  }
  componentDidMount() {
    this.dealTime({
      c_week: this.state.c_week,
      c_start_date: this.state.c_start_date
    })
  }

  componentWillReceiveProps (nextProps) {
    this.dealTime({
      c_week: nextProps.week,
      c_start_date: nextProps.start_date
    })
  }

  dealTime (data) {
    // 起始时间的时间戳
    let start_Time = new Date(data.c_start_date).getTime()
    // 过了多少周的时间
    start_Time += (parseInt(data.c_week)-1)*7*24*3600*1000
    // 到指定时间
    let this_week = new Date(start_Time)
    // 获取当前日
    let today = new Date().getDate()
    // 获取当前月份
    let month = new Date().getMonth()
    let chinese_num = [['一'], ['二'], ['三'], ['四'], ['五'], ['六'], ['日']]
    for(let i=0;i<7;i++) {
      chinese_num[i].push(this_week.getDate()+i+'')
      if(this_week.getDate()+i===today&&this_week.getMonth()===month) {
        chinese_num[i].push('today')
      } else {
        chinese_num[i].push('')
      }
    }
    this.setState({
      month: this_week.getMonth()+1,
      chineseNum: chinese_num
    })
  }



  render() {
    return (
      <View className='calendar'>
        <View className='month'>
          <View>{this.state.month}</View>
          <View>月</View>
        </View>
        <View className='week-chinese'>
          {this.state.chineseNum.map((item, index) => {
            return (<View key={index} className={classNames('date-item', item[2])}>
              <View>{item[0]}</View>
              <View>{item[1]}</View>
            </View>)
          })}
        </View>
      </View>
    )
  }
}

export default Calendar
