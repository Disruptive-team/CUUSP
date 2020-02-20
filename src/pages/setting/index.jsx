import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { wfw_url } from '../../utils/url'

import './index.css'
import resolve_course from '../course/resolve/resolve_course'

class Setting extends Component {

  config = {
    navigationBarTitleText: 'Setting',
  }

  getLastCourse () {
    let Authorization
    try {
      Authorization = Taro.getStorageSync('')
    } catch (e) {}
    Taro.request({url: wfw_url + '/api/course/getAllRealTime', header: {Authorization}}).then(res => {
      if (res.code === 200) {
        let res_d = resolve_course(res.data.data)
        Taro.setStorage({
          key: 'course_data',
          data: res_d
        }).then(() => {
          Taro.redirectTo({url: 'pages/course/course'})
        })
      } else {
        Taro.showToast({title: '获取失败'})
      }
    })
  }

  render() {
    return (
      <View className='list_item'>
        <View onClick={this.getLastCourse}>刷新课表</View>
      </View>
    )
  }
}

export default Setting
