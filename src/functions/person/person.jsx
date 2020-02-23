import Taro,{ Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
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
                            gender: res.userInfo.gender,
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
                    <OpenData type='userAvatarUrl' className='img'></OpenData>
                    <OpenData type='userNickName'></OpenData>
                    <Button className='update' openType='getUserInfo' onGetUserInfo={this.getUserInfo} >更新昵称和头像</Button>
                </View>

                <View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>姓名</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.studentName?this.state.studentName:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>学号</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.studentID?this.state.studentID:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>班级</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.studentClass?this.state.studentClass:'待完善'}</Text>
                    </View>
                    <View className='info'>
                        <Text style='margin-left: 20rpx'>学校</Text>
                        <Text className='iconfont iconapp-go go'></Text>
                        <Text style='padding-left: 20rpx;float:right'>{this.state.studentSchool?this.state.studentSchool:'待完善'}</Text>
                    </View>
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