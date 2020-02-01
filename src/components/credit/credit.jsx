import { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './credit.css'

class Credit extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            avgGPA: 0.11,
            obligatoryGPA: 0,
            academicDegreeGPA: 0,
            allCredit: 0,
            obligatoryCredit: 0,
            academicDegreeCredit: 0,
            electiveCredit: 0,
            generalCredit: 0,
            PECredit: 0,
            failCredit: 0, 
        })
      }
    render(){
        return (
            <View>
                <View className='card'>
                    <Text className='name'>平均绩点：\n</Text>
                    <Text className='score'>{this.state.avgGPA}</Text>
                </View>
                <View className='card' style='color: #9400D3;border: 15rpx solid #9400D3'>
                    <Text className='name'>必修课绩点：\n</Text>
                    <Text className='score'>{this.state.obligatoryGPA}</Text>
                </View>
                <View className='card' style='color: #C71585;border: 15rpx solid #C71585' >
                    <Text className='name'>学位课绩点：\n</Text>
                    <Text className='score'>{this.state.academicDegreeGPA}</Text>
                </View>
                <View className='card' >
                    <Text className='name'>总学分：\n</Text>
                    <Text className='score'>{this.state.allCredit}</Text>
                </View>
                <View className='card' style='color: #FF1493;border: 15rpx solid #FF1493' >
                    <Text className='name'>必修课学分：\n</Text>
                    <Text className='score'>{this.state.obligatoryCredit}</Text>
                </View>
                <View className='card' style='color: #6A5ACD;border: 15rpx solid #6A5ACD' >
                    <Text className='name'>学位课学分：\n</Text>
                    <Text className='score'>{this.state.academicDegreeCredit}</Text>
                </View>
                <View className='card' style='color: #B22222;border: 15rpx solid #B22222' >
                    <Text className='name'>选修课学分：\n</Text>
                    <Text className='score'>{this.state.electiveCredit}</Text>
                </View>
                <View className='card' style='color: #C71585;border: 15rpx solid #C71585' >
                    <Text className='name' style='font-size: 33rpx;'>全校通选课学分：\n</Text>
                    <Text className='score'>{this.state.generalCredit}</Text>
                </View>
                <View className='card' style='color: #228B22;border: 15rpx solid #228B22' >
                    <Text className='name'>体育课学分：\n</Text>
                    <Text className='score'>{this.state.PECredit}</Text>
                </View>
                <View className='card' style='color: #2F4F4F;border: 15rpx solid #2F4F4F' >
                    <Text className='name' style='font-size: 33rpx;'>不及格课程学分：\n</Text>
                    <Text className='score'>{this.state.failCredit}</Text>
                </View>
            </View>
        )
    }
}

export default Credit