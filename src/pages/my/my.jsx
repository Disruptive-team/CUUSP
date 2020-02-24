import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button, OpenData} from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './my.css'
import {action} from './store'
// import {whetherBindID} from '../../Interface/common'

@connect(({ userInfo }) => ({
    userInfo
  }), (dispatch) => ({
    setUserInfo(data) {
      dispatch(action.user_info(data))
    }
  }))
class My extends Component{
    config = {
        navigationBarTitleText: '我的',
    }
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
            scopeUserInfo: false
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
                            userName: rr.userInfo.nickName,
                            scopeUserInfo: true
                        })
                    })
                }
            }
        })
    }
    scope(){
        Taro.getStorage({key: 'isBind'}).then((r)=>{
            let isbind = r.data
            if(isbind!==1){
              Taro.showToast({
                title: '请先绑定，再进行该操作',
                icon: 'none'
              })
            }
        }).catch((e)=>{

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
        Taro.navigateTo({
            url: `../../functions/person/person`
        })
    }
    toRegister(){
        Taro.navigateTo({
            url: '../register/register'
        })
    }
    about(){
    }
    clearStorge(){
        Taro.clearStorageSync()
        Taro.showToast({
            title: '清除缓存完成',
            icon: 'none'
        })
    }
    toOfficeInfo(){
        Taro.navigateTo({
            url: '../../functions/officeInfo/officeInfo'
        })
    }
    render(){
      let Bind
      try {
        Bind = Taro.getStorageSync("isBind")
      }catch (e) {
        Bind=0
      }
        return(
            <View>
                <View className='head-image'>
                    <OpenData type='userAvatarUrl' className='img'></OpenData>
                    <OpenData type='userNickName'></OpenData>
                </View>
                <View className='group'>
                    <Button className='choose bnt' onClick={this.toPerson} >
                        <Text className='icongerenxinxi iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>个人信息</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                    <Button className='choose bnt' onClick={this.toOfficeInfo} >
                        <Text className='icongerenxinxi iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>教务处信息</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                    <Button className='choose bnt' onClick={this.toRegister}>
                        <Text className='iconjiaowuchu iconfont icon'></Text>
                      {Bind
                        ? <Text style='padding-left: 20rpx;'>修改教务信息</Text>
                        : <Text style='padding-left: 20rpx;'>绑定教务信息</Text>
                      }
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                </View>
                <View className='group'>
                    <Button className='choose bnt' openType='share' >
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
                    <Button className='choose bnt' onClick={this.clearStorge} >
                        <Text className='iconwode-guanyuwomen iconfont icon'></Text>
                        <Text style='padding-left: 20rpx;'>清除缓存</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                    </Button>
                </View>

            </View>
        )
    }
}

export default My
