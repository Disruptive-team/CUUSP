import { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './exam.css'

class Exam extends Component{
    state = {
        exam: [{
            place: '东3211',
            course: '计算机操作系统',
            teacher: '马立平',
            date: '2020/1/30',
            section_length: '1-2'
            },{
                place: '东3211',
                course: '计算机操作系统',
                teacher: '马立平',
                date: '2020/1/30',
                section_length: '1-2'
            }
        ]
    }
    goBack(){
        Taro.navigateBack()
    }
    render(){
        return (
            <View>
                <View className='head'>
                    <Text className='back' onClick={this.goBack}>{'<'}</Text>
                    <Text style="margin-right: 12%;letter-spacing: 3rpx;">考试</Text>
                </View>
               { this.state.exam.map((item, index)=>{
                    return <View className='examView'>
                                <View className='examTime'>{item.date}</View>
                                <Text style='position:absolute'>{item.course}({item.teacher})</Text>
                                <Text>{item.place}(第{item.section_length}节)</Text>
                           </View>
                    })
               } 
            </View>
        )
    }
}

export default Exam