import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import '../../icon.css'
import './index.css'

class CourseDetail extends Component {

  defaultProps = {}

  constructor(props) {
    super(props);
    if(Object.keys(props).toString())
      this.state.detail_content = this.deal_data(props.detail)
  }

  state = {
    detail_content: [],
    index: [999,0,0,0,0,0,0,0,0,0,0,0,0,0],
    flag: 1,
    time: ['', '8:00-8:45', '8:55-9:40', '10:00-10:45', '10:55-11:40', '14:00-14:45', '14:55-15:40', '16:00-16:45', '16:55-17:40', '19:00-19:45', '19:55-20:40', '21:00-21:45', '21:55-22:40']
  }

  deal_data (detail) {
    let res = []
    let detail_week = detail.detail_week
    let start_section = detail.start_section
    let current_section = detail.course_d[detail_week]
    for(let i=0;i<current_section.length;i++) {
      for(let j=0;j<current_section[i].length;j++) {
        if(current_section[i][j].start_section === start_section) {
          res.push(current_section[i][j])
        }
      }
    }
    return res
  }

  static options = {
    addGlobalClass: true
  }

  switch_detail () {
    let temp = this.state.index
    for(let i=0;i<this.state.detail_content.length;i++) {
      temp[i] = 0
    }
    temp[this.state.flag] = 999
    this.setState({
      index: temp,
      flag: (this.state.flag+1)%this.state.detail_content.length
    })
  }

  render() {
    const detail_content = this.state.detail_content
    console.log(this.state)
    return (
      <View className='root'>
        <View className='content'>
          {this.state.detail_content.map((item, index) => {
            return (<View key={index} className={classNames('detail_content', 'detail_content_wrapper')} style={'z-index: '+this.state.index[index]+';background: '+item.color} onClick={this.switch_detail}>
              <View className='iconfont' style='font-size: 24px;text-align: center;color: #fff;margin-bottom: 6px'>&#xe637;</View>
              <View className='item'>{item.course}</View>
              <View className='item'>{item.teacher}</View>
              <View className='item'>{item.place}</View>
              <View className='item'>节次: {item.start_section*2-1}-{(item.start_section-1)*2+item.section_length}</View>
              <View className='item'>第{(item.start_section-1)*2+1}节: {this.state.time[(item.start_section-1)*2+1]}</View>
              <View className='item'>第{(item.start_section)*2}节: {this.state.time[(item.start_section)*2]}</View>
              <View className='item'>周次: {item.week[0]}-{item.week[item.week.length-1]}</View>
              <View className='page'>第{index+1}/{detail_content.length}页</View>
            </View>)
          })}
        </View>
      </View>
    )
  }
}

export default CourseDetail
