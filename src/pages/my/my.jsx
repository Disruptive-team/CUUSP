import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './my.css'
import configStore from '../../store'
import {updateUserInfo} from '../../Interface/user'

const store = configStore()
class My extends Component{
    constructor(){
        console.log(store.getState())
           
    }
    state = {
        userId: '',
        userName: '',
        userSchool: '',
    }
    exit(){
        Taro.navigateTo({
            url: '../register/register'
        })
    }
    login(){
        if(Taro.getEnv() === 'WEAPP'){
            Taro.getUserInfo().then(res=>{
                console.log(res)
                Taro.getStorage({
                    key: 'auth_token',
                    success: function(r){
                        console.log(r)
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
                    }
                })
                
            })
        //    Taro.navigateTo({
        //        url: '../login/login'
        //    })
        }
    }
    componentWillMount(){

    }
    render(){
        return(
            <View>
                <View style='padding-top: 5px;background: white;padding-left: 20rpx;display:flex'>
                    <View className='name'>
                        {this.state.userName?this.state.userName:'请登录'}
                    </View>
                    {this.state.userId && this.state.userSchool 
                    ?<View style='padding-left: 5%;'>
                        <View className='textHidden' style='margin-bottom: 5px;margin-top: 7px;'>学号：{this.state.userId}\n</View>
                        <View className='textHidden' >学校：{this.state.userSchool}</View>
                    </View>
                    : <Button className='loginBnt' onClick={this.login}>登录</Button>}
                </View>
                <View className='choose'>
                    <Text className='iconfont iconmodifyPassword icon'></Text>
                    <Text style='padding-left: 35rpx;'>修改密码</Text>
                    <Text className='iconfont iconapp-go go'></Text>
                </View>
                <View className='choose' onClick={this.exit}>
                    <Text className='iconchange iconfont icon'></Text>
                    <Text style='padding-left: 20rpx;'>更换绑定</Text>
                    <Text className='iconfont iconapp-go go'></Text>
                </View>

            </View>
        )
    }
}

export default My