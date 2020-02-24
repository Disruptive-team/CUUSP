import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro'
import { Swiper, View, SwiperItem, Image, Text } from '@tarojs/components'
import './home.css'
import exam from '../../images/home/exam.png'
import achievement from '../../images/home/grade.png'
import cardPng from '../../images/home/card.png'
import lose from '../../images/home/lost.png'
import classPhoto from '../../images/class.png'
import {getActiveSwiper} from '../../Interface/images'

@connect(({commonInfo})=>({
  commonInfo
}))
class Home extends Component{
  config = {
    navigationBarTitleText: '主页',
  }
  constructor(props) {
    super(props);
    let course
    try {
      course = Taro.getStorageSync('course_data')
    } catch (e) {

    }
    let t = new Date().getDay()
    t = t === 0 ? 7 : t
    t = t - 1
    let course_data = []
    if (course) {
      try {
        for (let i = 0; i < course.res_d[t].length; i++) {
          for (let j = 0; j < course.res_d[t][i].length; j++) {
            if (course.res_d[t][i][j].week.indexOf(course.week) !== -1) {
              course_data.push(course.res_d[t][i][j])
            }
          }
        }
      } catch (e) {}
    }
    this.state = {
      today_course: course_data,
      week: course.week,
      t,
      mon_sun_chinese: ['一', '二', '三', '四', '五', '六', '日'],
      iconList: 'iconfont icondown functionEntryIcon',
        bindID: this.props.commonInfo.bindID,
        swiperImgs: []
    }
    }

    componentDidMount() {
        console.log(this.state)
        Taro.hideToast()
        this.getSwiperImgs()
    }
    ifBind(){
        if(!this.state.bindID){
            Taro.showModal({
                title: '提示',
                content: '您现在未绑定教务处，是否现在去绑定？',
            }).then(res => {
                if(res.confirm){
                    Taro.navigateTo({
                        url: '../register/register'
                    })
                }
            })
            return false
        }
        return true
    }
    toExam(){
        if(this.ifBind()){
            Taro.navigateTo({
                url: '../../functions/exam/exam'
            })
        }
    }
    toAchievement(){
        if(this.ifBind()){
            Taro.navigateTo({
                url: '../../functions/achievement/achievement'
            })
        }

    }
    toCard(){
        if(this.ifBind()){
            Taro.navigateTo({
                url: '../../functions/card/card'
            })
        }
    }
    showList(){
        let icon = this.state.iconList
        if(icon === 'iconfont icondown functionEntryIcon'){
            icon = 'iconfont iconup functionEntryIcon'
        }else {
            icon = 'iconfont icondown functionEntryIcon'
        }

        this.setState({
            iconList: icon
        })
    }

    getSwiperImgs(){
        let that = this
        getActiveSwiper().then(res=>{
            that.setState({
                swiperImgs: res.data.data
            })
        })
    }

  onJumpToCourse () {
    Taro.switchTab({url: '/pages/course/course'})
  }
  render(){
        return (
            <View>
                <Swiper indicatorDots indicatorActiveColor='#C0C0C0' indicatorColor='#DCDCDC' autoplay interval = '3000' style='background: white;'>
                    {this.state.swiperImgs.map((item, index)=>{
                        return (<SwiperItem key={index}>
                                    <Image src={item.img_url} style='height: 100%;width:100%' />
                                </SwiperItem>)
                    })}
                </Swiper>
                <View style='background: white;padding: 10rpx;margin-top: 15rpx;display: flex;flex-wrap: wrap;'>
                    <View className='functionEntryView' onClick={this.toExam}>
                        <Image src={exam} className='functionEntry' />
                        <Text style='display:block'>考试</Text>
                    </View>
                    <View className='functionEntryView' onClick={this.toAchievement}>
                        <Image src={achievement} className='functionEntry' />
                        <Text style='display:block'>成绩</Text>
                    </View>
                    <View className='functionEntryView' onClick={this.toCard}>
                        <Image src={cardPng} className='functionEntry' />
                        <Text style='display:block'>一卡通</Text>
                    </View>
                    <Text className={this.state.iconList} onClick={this.showList} />
                    {this.state.iconList === 'iconfont iconup functionEntryIcon' &&
                    <View className='functionEntryView'>
                        <Image src={lose} className='functionEntry' />
                        <Text style='display:block'>失物招领</Text>
                    </View>}
                </View>

                <View style='padding: 10rpx;'>
                    {/*<Text style='font-size: 35rpx;color: gray;'>今日课表</Text>*/}
                    <View className='today_course'>
                      <View className='left'>
                        <View className='week-num'>第 {this.state.week} 周</View>
                        <View className='week'>星期{this.state.mon_sun_chinese[this.state.t]}</View>
                      </View>
                      <View className='jump-to-course' onClick={this.onJumpToCourse}>跳转到课表</View>
                    </View>
                    {
                        this.state.today_course.length === 0 ? <View className='no-course'>今日没课哟~</View> : this.state.today_course.map((item, index)=>{
                          return (
                            <View key={index} className='todayClass'>
                                <Image src={classPhoto} style='width: 100rpx;height: 100rpx;margin-right: 34rpx;' />
                                <Text style='position: absolute'>{item.course}({item.teacher})</Text>
                                <Text>{item.place}(第{(item.start_section-1)*2+1}-{item.start_section+item.section_length-1}节)</Text>
                            </View>
                            )
                        })
                    }
                </View>
            </View>

        )
    }
}

export default Home
