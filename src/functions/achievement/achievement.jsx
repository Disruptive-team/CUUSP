import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './achievement.css'
import Achievement from '../../components/achievement/achievement'
import Credit from '../../components/credit/credit'

class AchievementCredit extends Component{
    
    config = {
        navigationBarTitleText: '成绩',
    }
    state={
        showContent: false,
        achievement: 'color: black',
        credit: 'color: gray'
    }
    clickAchievement(){
        this.setState({
            showContent: false,
            achievement: 'color: black',
            credit: 'color: gray'
        })
    }
    clickCredit(){
        this.setState({
            showContent: true,
            achievement: 'color: gray',
            credit: 'color: black'
        })
    }
    goBack(){
        Taro.navigateBack()
    }
    render(){
        return (
            <View>
                <View className='head'>
                    <Text className='iconfont iconback' style="font-size: 40rpx;float: left;" onClick={this.goBack}></Text>
                    <Text style="margin-right: 12%;letter-spacing: 3rpx;">考试</Text>
                </View>
                <View style="height: 110rpx;background: white;margin-bottom: 35rpx;">
                    <View className='list' onClick={this.clickAchievement} style={this.state.achievement}>学期成绩</View>
                    <View className='list' onClick={this.clickCredit} style={this.state.credit}>学分修读进度</View>
                </View>
                {this.state.showContent
                ?<Credit />
                :<Achievement />}
            </View>
        )
    }
}

export default AchievementCredit