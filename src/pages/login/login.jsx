import Taro, { Component } from '@tarojs/taro'
import {View, Input, Text, Button} from '@tarojs/components'
import './login.css'

class Login extends Component{
    
    config = {
        navigationBarTitleText: '登录',
    }
    render () {
        return (
            <View style='text-align:center'>
                <Text style='font-size: 85rpx;margin-top: 20%;display: block;'>查课表</Text>
                <View style='margin-top:10%;'>
                    <Text className='option'>账号</Text> 
                    <Input className='optionIpt' />
                    <Text className='option'>\n密码</Text> 
                    <Input className='optionIpt' />

                </View>
                <Button className='bnt'>登   录</Button>
            </View>
        )
    }
}

export default Login