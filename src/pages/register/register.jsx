import Taro, { Component } from '@tarojs/taro'
import {View, Input, Text, Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './register.css'
import {bindWX} from '../../Interface/user'
import {action} from '../my/store'

@connect(({ userInfo }) => ({
    userInfo
  }), (dispatch) => ({
    setStudentInfo(data) {
      dispatch(action.student_info(data))
    }
  }))

class Register extends Component{
    
    config = {
        navigationBarTitleText: '绑定到统一服务平台',
    }
    state = {
        studentNumber: '',
        studentPassWord: '',
        seePwd: true
    }
    getNumber(e){
        this.setState({
            studentNumber: e.detail.value
        })
    }
    getPassword(e){
        this.setState({
            studentPassWord: e.detail.value
        })
    }
    register(){
        let that = this
        console.log(that.state)
        if(!this.state.studentNumber){
            Taro.showToast({
                title: '请输入学号',
                icon: 'none'
            })
            debugger
            return
        }
        if(!this.state.studentPassWord){
            Taro.showToast({
                title: '请输入教务处密码',
                icon: 'none'
            })
            return 
        }
        Taro.getStorage({
            key: 'auth_token',
            success: function(r){
                bindWX({
                    student_number: that.state.studentNumber,
                    password: that.state.studentPassWord,
                    auth_token: r.data
                }).then(res=>{
                    console.log(res)
                    if(res.data.code === 200){
                        Taro.showToast({
                            title: '绑定成功',
                            icon: 'success'
                        }).then(r=>{
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
                    }else{
                        Taro.showToast({
                            title: '系统繁忙，请稍后再试~',
                            icon: 'none'
                        })
                    }
                })
            }
        })
    }
    seePassword(){
        let buffer = this.state.seePwd
        this.setState({
            seePwd: !buffer
        })
    }
    render () {
        return (
            <View style='text-align:center'>
                <Text className='iconfont iconkebiao' style='font-size: 150rpx;margin-top: 30%;display: block;'></Text>
                <View style='display: flex;justify-content: center;'>
                    <Text className='iconfont iconiconfontyonghuming' style='color: gray;font-size: 50rpx;line-height: 100rpx;'></Text>
                    <Input className='optionIpt' placeholder='账号' onInput={this.getNumber} value={this.state.studentNumber} />
                </View>
                <View style='display: flex;justify-content: center;margin-left: 47rpx;'>
                    <Text className='iconfont iconmima' style='color: gray;font-size: 50rpx;line-height: 100rpx;'></Text>
                    <Input className='optionIpt' onInput={this.getPassword} value={this.state.studentPassWord} placeholder='密码' type={this.state.seePwd?'':'password'} />
                    <Text className={this.state.seePwd?'iconfont iconchakanmima':'iconfont iconbiyan'} style='font-size: 21px;line-height: 42px;z-index: 10;margin-top: 10rpx;transform: translateX(-60rpx);' onClick={this.seePassword}></Text>

                </View>
                <Button className='bnt' onClick={this.register}>绑   定</Button>
            </View>
        )
    }
}

export default Register