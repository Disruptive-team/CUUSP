import Taro, {Component} from '@tarojs/taro'
import {View, Input, Text, Button} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import './register.css'
import {bindWX} from '../../Interface/user'
import {action} from '../my/store'
import {actionCreators} from '../course/store'
import {wfw_url} from '../../utils/url'
import {common_info} from '../../store/actions'

@connect(({userInfo}) => ({
  userInfo
}), (dispatch) => ({
  setStudentInfo(data) {
    dispatch(action.student_info(data))
  },
  onGetCourse(url) {
    dispatch(actionCreators.get_course_info(url))
  },
  onSaveBind (data) {
    dispatch(common_info(data))
  }
}))

class Register extends Component {

  config = {
    navigationBarTitleText: '绑定到统一服务平台',
  }
  constructor(props) {
    super(props);
    let user_and_password
    try {
      user_and_password = Taro.getStorageSync('user_and_password')
    } catch (e) {}
    console.log(user_and_password)
    this.state = {
      studentNumber: user_and_password.user || '',
      studentPassWord: user_and_password.password || '',
      seePwd: false
    }
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
    console.log(that.state)
    if (!this.state.studentNumber) {
      Taro.showToast({
        title: '请输入学号',
        icon: 'none'
      })
      return
    }
    if (!this.state.studentPassWord) {
      Taro.showToast({
        title: '请输入一站式服务大厅密码',
        icon: 'none'
      })
      return
    }
    Taro.getStorage({key: 'auth_token'}).then(r => {
      bindWX({
        student_number: that.state.studentNumber,
        password: that.state.studentPassWord,
        auth_token: r.data
      }).then(res => {
        Taro.setStorage({key: 'isBind', data: 1})
        Taro.setStorage({key: 'user_and_password', data: {user: that.state.studentNumber, password: that.state.studentPassWord}})
        if (res.data.code === 200) {
          this.props.onSaveBind({bindID: 1})
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
            }).then(() => {
              this.props.onGetCourse(wfw_url + '/api/course/getAllRealTime')
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

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <View className='user-and-password'>
          <View className='user-number'>
            <Text className='iconfont iconiconfontyonghuming' style='color: gray;font-size: 40rpx;' />
            <Input placeholder='请输入学号' onInput={this.getNumber} value={this.state.studentNumber} />
          </View>
          <View className='user-password'>
            <Text className='iconfont iconfont iconmima' style='color: gray;font-size: 40rpx;' />
            <Input placeholder='一站式服务大厅密码' onInput={this.getPassword} value={this.state.studentPassWord} type={this.state.seePwd ? '' : 'password'} />
            <Text className={this.state.seePwd ? 'iconfont iconchakanmima' : 'iconfont iconbiyan'} style='color: gray;font-size: 40rpx;' onClick={this.seePassword} />
          </View>
          <View className='bind' onClick={this.register}>绑定</View>
        </View>
      </View>
      // <View style='text-align:center'>
      //   <Text className='iconfont iconkebiao' style='font-size: 150rpx;margin-top: 30%;display: block;' />
      //   <View style='display: flex;justify-content: center;'>
      //     <Text className='iconfont iconiconfontyonghuming' style='color: gray;font-size: 50rpx;line-height: 100rpx;' />
      //     <Input className='optionIpt' placeholder='请输入学号' onInput={this.getNumber} value={this.state.studentNumber} />
      //   </View>
      //   <View style='display: flex;justify-content: center;margin-left: 47rpx;'>
      //     <Text className='iconfont iconmima' style='color: gray;font-size: 50rpx;line-height: 100rpx;' />
      //     <Input className='optionIpt' onInput={this.getPassword} value={this.state.studentPassWord} placeholder='一站式服务大厅密码' type={this.state.seePwd ? '' : 'password'} />
      //     <Text className={this.state.seePwd ? 'iconfont iconchakanmima' : 'iconfont iconbiyan'} style='font-size: 21px;line-height: 42px;z-index: 10;margin-top: 10rpx;transform: translateX(-80rpx);width: 50rpx;' onClick={this.seePassword} />
      //
      //   </View>
      //   <Button className='bnt' onClick={this.register}>绑 定</Button>
      // </View>
    )
  }
}

export default Register
