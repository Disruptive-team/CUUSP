import { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './achievement.css'
import Select from '../select/select'

class Achievement extends Component{
    defaultProps = {}
    state = {
        achievement: [{
            semester: 5,
            achievement: 100.0,
            course: 'Windows程序设计',
            supplementaryExam: null,
            credit: 4.0,
            GPA: 20.00,
            pass: true,
        },{
            semester: 5,
            achievement: 59.99,
            course: 'Windows程序设计',
            supplementaryExam: 60,
            credit: 4.0,
            GPA: 20.00,
            pass: true,
        },{
            semester: 5,
            achievement: null,
            course: 'Windows程序设计',
            supplementaryExam: null,
            credit: 4.0,
            GPA: 20.00,
            pass: true,
        },{
            semester: 5,
            achievement: null,
            course: 'Windows程序设计',
            supplementaryExam: null,
            credit: 4.0,
            GPA: 20.00,
            pass: false,
        }],
        GPA: 4.000
    }

    componentDidMount(){
        let buffer = this.state.achievement
        this.state.achievement.map((item, index)=>{
            if(item.achievement >= 85){
                buffer[index]['color'] = '#00FF7F'
                buffer[index]['result'] = item.achievement
            }else if(item.achievement >= 60 && item.achievement < 85){
                buffer[index]['color'] = '#FFFACD'
                buffer[index]['result'] = item.achievement
            }else{
                if(item.supplementaryExam >= 85){
                    buffer[index]['color'] = '#00FF7F'
                    buffer[index]['result'] = item.supplementaryExam
                }else if(item.supplementaryExam >= 60 && item.supplementaryExam < 85){
                    buffer[index]['color'] = '#00FF7F'
                    buffer[index]['result'] = item.supplementaryExam
                }else {
                    buffer[index]['color'] = '#FF6347'
                    buffer[index]['result'] = item.supplementaryExam
                }
            }
            if(!buffer[index]['result'] && buffer[index]['pass']){
                buffer[index]['result'] = '通过'
            }else if(!buffer[index]['result'] && !buffer[index]['pass']){
                buffer[index]['result'] = '不通过'
            }
        })
        this.setState({
            achievement: buffer
        })
    }
    changeSemester(semester){
        console.log(semester)

    }
    render(){
        let element = ['第1学期','第2学期','第3学期','第4学期','第5学期','第6学期']
        let width = 230
        let height = 70
        let color = 'black'
        let background = 'transparent'
        return (
            <View>
                <View style="height: 55rpx;">
                    <Select element={element} width={width} height={height} color={color} background={background} changeOption={this.changeSemester.bind(this)}></Select>

                    <Text style="float: right;margin-right: 15%;color: gray;font-size: 25rpx;line-height: 40rpx;">必修课学分绩点: {this.state.GPA}</Text>
                </View>
                <View>
                    {this.state.achievement.map((item, index)=>{
                        let style = `background: ${item.color}`
                        return <View style="background: white;height: 150rpx;border-bottom: 2px solid #F5F5F5;">
                                    <View style={style} className='result'>{item.result}</View>
                                    <View style="width: 80%;display: inline;position: absolute;padding-left: 3%;">
                                        <Text >{item.course}\n</Text>
                                        <Text className='info'>正考：{item.achievement?item.achievement:item.result}</Text>
                                        <Text className='info'>补考：{item.supplementaryExam?item.supplementaryExam:''}</Text>
                                        <Text className='info' style="position: relative;top: -15rpx;">学分：{item.credit}</Text>
                                        <Text className='info' style="position: relative;top: -15rpx;">绩点：{item.GPA}</Text>
                                    </View>
                                </View>
                    })}
                </View>
            </View>
        )

    }
}

export default Achievement

