import Taro, {Component} from '@tarojs/taro'
import {View, Input, Text, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import './register.css'
import {bindWX} from '../../Interface/user'
import {action} from '../my/store'
import {actionCreators} from '../course/store'
import {wfw_url} from "../../utils/url"

@connect(({userInfo}) => ({
  userInfo
}), (dispatch) => ({
  setStudentInfo(data) {
    dispatch(action.student_info(data))
  },
  onGetCourse(url) {
    dispatch(actionCreators.get_course_info(url))
  }
}))

class Register extends Component {

  config = {
    navigationBarTitleText: '绑定',
  }
  state = {
    studentNumber: '',
    studentPassWord: '',
    seePwd: true
  }

  getNumber(e) {
    this.setState({
      studentNumber: e.detail.value
    })
  }

  getPassword(e) {
    this.setState({
      studentPassWord: e.detail.value
    })
  }

  register() {
    let that = this
    Taro.getStorage({key: 'auth_token'}).then(r => {
      bindWX({
        student_number: that.state.studentNumber,
        password: that.state.studentPassWord,
        auth_token: r.data
      }).then(res => {
        if (res.data.code === 200) {
          this.props.onGetCourse(wfw_url + '/api/course/getAllRealTime')
          Taro.showToast({
            title: '绑定成功',
            icon: 'success'
          }).then(() => {
            that.props.setStudentInfo({
              studentID: that.state.studentNumber,
              studentSchool: '西南科技大学'
            })
            Taro.setStorage({
              key: 'auth_token',
              data: res.data.data.auth_token
            })
            Taro.switchTab({
              url: '/pages/home/home'
            })
          })
        } else {
          Taro.showToast({
            title: '系统繁忙，请稍后再试~',
            icon: 'none'
          })
        }
      })
    })
  }

  seePassword() {
    let buffer = this.state.seePwd
    this.setState({
      seePwd: !buffer
    })
  }

  render() {
    return (
      <View style='text-align:center'>
        <Text style='font-size: 85rpx;margin-top: 20%;display: block;margin-bottom: 10%;'>查课表</Text>
        <View style='display: flex;justify-content: center;'>
          <Text className='iconfont iconiconfontyonghuming' style='font-size: 50rpx;line-height: 100rpx;'></Text>
          <Input className='optionIpt' placeholder='账号' onInput={this.getNumber} value={this.state.studentNumber}/>
        </View>
        <View style='display: flex;justify-content: center;'>
          <Text className='iconfont iconmima' style='font-size: 50rpx;line-height: 100rpx;'></Text>
          <Input className='optionIpt' onInput={this.getPassword} value={this.state.studentPassWord} placeholder='密码'
                 type={this.state.seePwd ? '' : 'password'}/>
          <Text className={this.state.seePwd ? 'iconfont iconchakanmima' : 'iconfont iconbiyan'}
                style='font-size: 50rpx;line-height: 100rpx;position: absolute;;right: 19%;top: 38%;z-index: 10;'
                onClick={this.seePassword}></Text>

        </View>
        <Button className='bnt' onClick={this.register}>绑 定</Button>
      </View>
    )
  }
}

export default Register
