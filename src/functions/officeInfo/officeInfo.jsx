import Taro,{ Component } from "@tarojs/taro";
import { View, Text} from "@tarojs/components";
import './officeInfo.css'
import {getUserInfo} from '../../Interface/common'


class OfficeInfo extends Component{

    config = {
        navigationBarTitleText: '教务处信息',
    }

    constructor(props){
        super(props)
    }
    state = {
        studentID: '',
        studentSchool: '',
        studentName: '',
        studentClass: ''
    }
    componentDidMount(){
        let that = this
        Taro.getStorage({
            key: 'auth_token',
            success: function(res){
                getUserInfo({
                    auth_token: res.data
                }).then(rr=>{
                    console.log(rr)
                })
            },
            fail: function(){
                Taro.showToast({
                    title: '登录信息失效，请重新登录',
                    icon: 'none'
                })
            }
        })
    }
    goBack(){
        Taro.navigateBack()
    }
    render(){
        return (
            <View>
                <View className='head'>
                    <Text className='iconfont iconback' onClick={this.goBack} style='font-size: 40rpx;float: left;'></Text>
                    <Text style='margin-right: 12%;letter-spacing: 3rpx;'>教务处信息</Text>
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
            </View>
        )
    }
}

export default OfficeInfo