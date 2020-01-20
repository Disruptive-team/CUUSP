import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.css'
import Calendar from '../../components/calendar/Calendar'


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

  render () {
    Taro.navigateTo({
      url: '../main/main'
    })
    return (
      <View className='index'>
        <Calendar week='3' start_date='2020-01-06' />
      </View>
    )
  }
}

export default Index
