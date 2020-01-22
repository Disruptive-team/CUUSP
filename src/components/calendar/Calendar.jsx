import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    month: 1,
  }
  componentDidMount() {
    let start_Time = new Date(this.props.start_date).getTime()
    start_Time += (parseInt(this.props.week)-1)*7*24*3600*1000
    let this_week = new Date(start_Time)
    let today = new Date().getDate()
    for(let i=0;i<7;i++) {
      this.chineseNum[i].push(this_week.getDate()+i+'')
      if(this_week.getDate()+i===today) {
        this.chineseNum[i].push('today')
      } else {
        this.chineseNum[i].push('')
      }
    }
    this.setState({
      month: this_week.getMonth()+1
    })
  }
  // 组件内部数据
  // 假设2020-1-6为第一周
  chineseNum = [['一'], ['二'], ['三'], ['四'], ['五'], ['六'], ['日']]

  render() {
    return (
      <View className='calendar'>
        <View className='month'>
          <View>{this.state.month}</View>
          <View>月</View>
        </View>
        <View className='week-chinese'>
          {this.chineseNum.map((item, index) => {
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
