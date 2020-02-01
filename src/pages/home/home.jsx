import Taro, { Component } from '@tarojs/taro'
import {Swiper, View, SwiperItem, Image, Text} from '@tarojs/components'
import './home.css'
import exam from '../../images/home/exam.png'
import achievement from '../../images/home/grade.png'
import card from '../../images/home/card.png'
import lose from '../../images/home/lost.png'
import classPhoto from '../../images/class.png'
import Exam from '../../components/exam/exam'

class Home extends Component{
    state = {
        todayCourse: [{
            place: '东3211',
            course: '计算机操作系统',
            teacher: '马立平',
            week: '01-13',
            section_length: '1-2'
        },{
            place: '东3211',
            course: '计算机操作系统',
            teacher: '马立平',
            week: '01-13',
            section_length: '1-2'
        }],
        examTime: false
    }

    toExam(){
        this.setState({
            examTime: true
        })          
    }
    toAchievement(){
        Taro.navigateTo({
            url: '../achievement/achievement'
        })
    }
    render(){
        return (
            <View>
            { this.state.examTime
                ?<Exam />
                :<View>
                    <Swiper indicatorDots indicatorActiveColor='#C0C0C0' indicatorColor='#DCDCDC' autoplay interval = '3000' style='background: white;'>
                        <SwiperItem>
                            <View>123</View>
                        </SwiperItem>
                        <SwiperItem>
                            <View>456</View>
                        </SwiperItem>
                    </Swiper>

                    <View style='background: white;padding: 10rpx;margin-top: 15rpx;'>
                        <View className='functionEntryView' onClick={this.toExam}>
                            <Image src={exam} className='functionEntry'></Image>
                            <Text style='display:block'>考试</Text>
                        </View>
                        <View className='functionEntryView' onClick={this.toAchievement}>
                            <Image src={achievement} className='functionEntry'></Image>
                            <Text style='display:block'>成绩</Text>
                        </View>
                        <View className='functionEntryView'>
                            <Image src={card} className='functionEntry'></Image>
                            <Text style='display:block'>一卡通</Text>
                        </View>
                        <View className='functionEntryView'>
                            <Image src={lose} className='functionEntry'></Image>
                            <Text style='display:block'>失物招领</Text>
                        </View>

                    </View>

                    <View style="padding: 10rpx;">
                        <Text style="font-size: 35rpx;color: gray;">今日课表</Text>
                        {
                            this.state.todayCourse.map((item, index)=>{
                                return (
                                    <View key={index} className='todayClass'>
                                        <Image src={classPhoto} style="width: 100rpx;height: 100rpx;margin-right: 34rpx;"/>
                                        <Text style='position: absolute'>{item.course}({item.teacher})</Text>
                                        <Text>{item.place}(第{item.section_length}节)</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            }
            </View>

        )
    }
}

export default Home