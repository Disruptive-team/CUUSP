import Taro, { Component } from '@tarojs/taro'
import {View, Input, Text, Button} from '@tarojs/components'
import './register.css'

class Register extends Component{
    render () {
        return (
            <View style='text-align:center'>
                <Text style='font-size: 85rpx;margin-top: 20%;display: block;'>查课表</Text>
                <View style='margin-top:10%;'>
                    <Text className='option'>账号</Text> 
                    <Input className='optionIpt' />
                    <Text className='option'>\n密码</Text> 
                    <Input className='optionIpt' />
                    <Text className='option'  style='margin-right: -4rpx;'>\n确认密码</Text> 
                    <Input className='optionIpt' style='margin-right: 26px;' />

                </View>
                <Button className='bnt'>注   册</Button>
            </View>
        )
    }
}

export default Register