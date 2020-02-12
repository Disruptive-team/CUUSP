import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.css'
import Home from '../home/home'


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
    return (
      <View className='index'>
        <Home />
      </View>
    )
  }
}

export default Index
