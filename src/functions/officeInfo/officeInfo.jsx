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
        studentInstitute: '',
        studentName: '',
        studentClass: '',
        studentLevel: '',
        studentBirth: '',
        studentSubject: '',
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
                    that.setState({
                        studentID: rr.data.data.id,
                        studentInstitute: rr.data.data.institute,
                        studentName: rr.data.data.name,
                        studentClass: rr.data.data.class,
                        studentLevel: rr.data.data.level,
                        studentBirth: rr.data.data.birthday,
                        studentSubject: rr.data.data.subject,
                    })
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
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentName?this.state.studentName:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>生日</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentBirth?this.state.studentBirth:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>学号</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentID?this.state.studentID:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>班级</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentClass?this.state.studentClass:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>专业</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentSubject?this.state.studentSubject:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>学院</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentInstitute?this.state.studentInstitute:'待完善'}</Text>
                    </View>
                    <View className='info' style='border-bottom: solid 1px #F5F5F5'>
                        <Text style='margin-left: 20rpx'>学历</Text>
                        <Text style='padding-left: 50px;color: gray;font-size: 13px;'>{this.state.studentLevel?this.state.studentLevel:'待完善'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default OfficeInfo