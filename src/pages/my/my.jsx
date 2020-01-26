<<<<<<< HEAD
import Taro, {Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'

class My extends Component{
    render(){
        return (
            <View>
                <Text>my</Text>
=======
import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './my.css'

class My extends Component{
    state = {
        userId: '123456',
        userName: '哈哈hahah哈哈',
        userSchool: 'South Weast University Science Technology',
    }
    exit(){
        Taro.navigateTo({
            url: '../register/register'
        })
    }
    render(){
        return(
            <View>
                <View style='padding-top: 5px;background: white;padding-left: 20rpx;'>
                    <View className='name'>
                        {this.state.userName}
                    </View>
                    <View style='display: inline-block;width: 78%;position: absolute;margin-left: 30rpx;'>
                        <View className='textHidden' style='margin-bottom: 5px;margin-top: 7px;'>学号：{this.state.userId}\n</View>
                        <View className='textHidden' >学校：{this.state.userSchool}</View>

                    </View>
                </View>
                <View className='choose'>
                    <Text>修改密码</Text>
                    <Text className='arrow'>></Text>
                </View>
                <View className='choose' onClick={this.exit}>
                    <Text>退出登录</Text>
                    <Text className='arrow'>></Text>
                </View>

>>>>>>> feature/20200115-pastry
            </View>
        )
    }
}

export default My