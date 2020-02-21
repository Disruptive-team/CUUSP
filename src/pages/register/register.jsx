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
    state = {
        studentNumber: '',
        studentPassWord: '',
        studentConfirmPassWord: ''
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
    getConfirmPassword(e){
        console.log(e)
        this.setState({
            studentConfirmPassWord: e.detail.value
        })
    }
    register(){
        let that = this
        console.log(that.state)
        if(that.state.studentPassWord !== that.state.studentConfirmPassWord){
            Taro.showModal({
                title: '提示',
                content: '两次输入密码不一致',
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
    render () {
        return (
            <View style='text-align:center'>
                <Text style='font-size: 85rpx;margin-top: 20%;display: block;'>查课表</Text>
                <View style='margin-top:10%;'>
                    <Input className='optionIpt' placeholder='账号' onInput={this.getNumber} value={this.state.studentNumber} />
                    <Input className='optionIpt' onInput={this.getPassword} value={this.state.studentPassWord} placeholder='密码' type='password' />
                    <Input className='optionIpt' onInput={this.getConfirmPassword} value={this.state.studentConfirmPassWord} placeholder='确认密码' type='password' />

                </View>
                <Button className='bnt' onClick={this.register}>注   册</Button>
            </View>
        )
    }
}

export default Register