import Taro,{ Component } from "@tarojs/taro";
import { View, Button, Text, OpenData } from "@tarojs/components";
import './person.css'
import {updateUserInfo} from '../../Interface/user'


class Person extends Component{

    config = {
        navigationBarTitleText: '个人信息',
    }

    constructor(props){
        super(props)
    }
    state = {
        gender: '',
        country: '',
        city: '',
        studentID: '',
        studentSchool: '',
        studentName: '',
        studentClass: ''
    }
    componentDidMount() {
      this.getUserInfo()
    }
    convert_gender(gender){
      if (gender===2){
        return "女"
      }
      else if (gender===1){
        return "男"
      }else{
        return "未设置"
      }
    }

  getUserInfo(){
        let that = this
        if(Taro.getEnv() === 'WEAPP'){
            Taro.getUserInfo().then(res=>{
                console.log(res)
                Taro.getStorage({
                    key: 'auth_token',
                    success: function(r){
                        updateUserInfo({
                            nick_name: res.userInfo.nickName,
                            gender: res.userInfo.gender,
                            avatar_url: res.userInfo.avatarUrl,
                            country: res.userInfo.country,
                            city: res.userInfo.city,
                            auth_token: r.data
                        }).then(rr=>{
                            console.log(rr)
                        })
                        that.setState({
                            gender: that.convert_gender(res.userInfo.gender),
                            country: res.userInfo.country,
                            city: res.userInfo.city,
                        })
                    }
                })

            }).catch(res=>{
                console.log(res)
            })

        }
    }
    render(){
        return (
            <View>
                <View className='head-image'>
                    <OpenData type='userAvatarUrl' className='img'/>
                    <OpenData type='userNickName'/>
                    <Button className='update' openType='getUserInfo' onGetUserInfo={this.getUserInfo} >更新昵称和头像</Button>
                </View>

                <View style='margin-top: 30rpx'>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5;'>
                        <Text style='margin-left: 20rpx'>性别</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.gender?this.state.gender:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>城市</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.city?this.state.city:'待完善'}</Text>
                    </View>
                    <View className='info'>
                        <Text style='margin-left: 20rpx'>国家</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.country?this.state.country:'待完善'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Person
