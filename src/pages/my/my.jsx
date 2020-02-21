import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button, Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './my.css'
import {action} from './store'
import {updateUserInfo} from '../../Interface/user'

@connect(({ userInfo }) => ({
    userInfo
  }), (dispatch) => ({
    setUserInfo(data) {
      dispatch(action.user_info(data))
    }
  }))
class My extends Component{
    constructor(props){
        super(props)
        console.log(this.props)
        let name = '', school = '', img = '', id = ''
        if(this.props.userInfo){
            name = this.props.nick_name
            school = this.props.studentSchool
            img = this.props.avatar_url
            id = this.props.studentID
        }
        this.state = {
            userId: id,
            userName: name,
            userSchool: school,
            userImgSrc: img,
        }
    }
    componentDidMount(){
        let that = this
        Taro.getSetting({
            success: function(res){
                if(res.authSetting['scope.userInfo']){
                    Taro.getUserInfo().then(rr=>{
                        that.setState({
                            userImgSrc: rr.userInfo.avatarUrl,
                            userName: rr.userInfo.nickName
                        })
                    })
                }
            }
        })
    }
    getUserInfo(){
        let that = this
        if(Taro.getEnv() === 'WEAPP'){
            Taro.getUserInfo().then(res=>{
                Taro.getStorage({
                    key: 'auth_token',
                    success: function(r){
                        that.props.setUserInfo({
                            nick_name: res.userInfo.nickName,
                            gender: res.userInfo.gender,
                            avatar_url: res.userInfo.avatarUrl,
                            country: res.userInfo.country,
                            city: res.userInfo.city,
                            auth_token: r.data
                        })
                        that.setState({
                            userImgSrc: res.userInfo.avatarUrl,
                            userName: res.userInfo.nickName
                        })
                        updateUserInfo({
                            nick_name: res.userInfo.nickName,
                            gender: res.userInfo.gender,
                            avatar_url: res.userInfo.avatarUrl,
                            country: res.userInfo.country,
                            city: res.userInfo.city,
                            auth_token: r.data
                        }).then(rr=>{
                            console.log('rr')
                        })
                    },
                    fail: function (r) {
                      console.log('sadfsd')
                    }
                })

            }).catch(res=>{
                console.log(res)
            })
            Taro.showModal({
                title: '提示',
                content: '是否现在绑定教务处账号?',
            }).then(res=>{
                if(res.confirm){
                    Taro.navigateTo({
                        url: '../register/register'
                    })
                }
            })

        }
    }
    onShareAppMessage(res){
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
          }
          return {
            title: '分享',
            path: '/page/home/home'
          }
    }
    toPerson(){

    }
    toRegister(){
        Taro.navigateTo({
            url: '../register/register'
        })
    }
    render(){
        return(
            <View>
                <View className='head-image'>
                    {this.state.userImgSrc
                    ?<Image src={this.state.userImgSrc} className='name' />
                    :<View className='name'>请登录</View>}

                    {this.state.userName
                    ?<View style='padding-left: 8%;line-height: 145rpx;font-size: 40rpx;'>
                        <Text>你好！{this.state.userName}</Text>
                        {/* <View className='textHidden' style='margin-bottom: 5px;margin-top: 7px;'>昵称：{this.state.user}\n</View>
                        <View className='textHidden' >学校：{this.state.userSchool}</View> */}
                    </View>
                    : <Button className='loginBnt' openType='getUserInfo' onGetUserInfo={this.getUserInfo} >登录</Button>}
                </View>
                <View className='group'>
                    <Button className='choose bnt' onClick={this.toPerson} >
                        <Text className='icongerenxinxi iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>个人信息</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                    <Button className='choose bnt' onClick={this.toRegister}>
                        <Text className='iconjiaowuchu iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>修改教务信息</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                </View>
                <View className='group'>
                    <Button className='choose bnt' onClick={this.share} openType='share' >
                        <Text className='iconfenxiang iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>分享</Text>
                        <Text className='iconfont iconapp-go go' ></Text>
                    </Button>

                    <Button className='choose bnt' onClick={this.opinion} openType='feedback'>
                        <Text className='iconyijianfankui iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>意见反馈</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                    <Button className='choose bnt' onClick={this.about} >
                        <Text className='iconwode-guanyuwomen iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>关于我们</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default My
