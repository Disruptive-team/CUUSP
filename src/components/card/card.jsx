import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import {View, Text} from '@tarojs/components'
import './card.css'
import '../../assets/iconfont.css'

@connect(({userInfo})=>({
    userInfo
}))

class Card extends Component{
    static externalClasses = ['icon-back']
    constructor(props){
        super(props)
        let imgSrc = '../../images/my_1.png'
        if(this.props.userInfo){
            imgSrc = this.props.userInfo.avatar_url
        }
        this.state = {
            name: '123',
            number: '5120200202',
            consumption: [{
                place: '五食堂',
                amount: 10.11,
                date: '2020-2-2 15:58:12',
                mode: false,
            },{
                place: '五食堂',
                amount: 10.11,
                date: '2020-2-2 15:58:12',
                mode: true,
            },{
                place: '五食堂',
                amount: 10.11,
                date: '2020-2-2 15:58:12',
                mode: false,
            },{
                place: '五食堂hahahahhahahahahhahahah',
                amount: 10.11,
                date: '2020-2-2 15:58:12',
                mode: false,
            },{
                place: '五食堂hahahahhahahahahhahahah',
                amount: 10.11,
                date: '2020-2-2 15:58:12',
                mode: false,
            }],
            showDate: '2020-2-2',
            state: '正式卡',
            now:{
                year: 2020,
                mouth: 12,
                day: 1
            },
            min: {
                year: 2000,
                mouth: 1,
                day: 1
            },
            max:{
                year: 2020,
                mouth: 2,
                day: 2
            },
            chooseDate: false,
            imgSrc: imgSrc
        }
    }
    componentDidMount(){
        let buffer = this.state.consumption
        this.state.consumption.map((item, index)=>{
            if(item.mode){
                buffer[index]['price'] = `+￥${item.amount}`
                buffer[index]['color'] = '#F08080'
            }else{
                buffer[index]['price'] = `-￥${item.amount}`
                buffer[index]['color'] = '#FFA500'
            }
        })
        this.setState({
            consumption: buffer
        })
    }
    setDate(obj){
        let nowBuffer = this.state.now
        nowBuffer.year = obj.year
        nowBuffer.mouth = obj.mouth
        let maxBuf = this.state.max
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let mouth = nowDate.getMonth() + 1
        let day = nowDate.getDay()
        switch (nowBuffer.mouth){
            case 1: case 3: case 5 :case 7: case 8: case 10: case 12:
               maxBuf.day = 31;
            case 4: case 6: case 9: case 11:
                maxBuf.day = 30;
            case 2: 
                if(nowBuffer.year % 4){
                    maxBuf.day = 28
                } else {
                    if(nowBuffer.year % 400) {
                        maxBuf.day = 28
                    }else {
                        maxBuf.day = 29
                    }
                }
        }
        if(nowBuffer.year == year && nowBuffer.mouth > mouth){
            nowBuffer.mouth = mouth
            maxBuf.day = day
        }
        if(nowBuffer.year != year && maxBuf.mouth != 12){
            maxBuf.mouth = 12
        }
        if(nowBuffer.mouth === mouth && nowBuffer.day > day){
            nowBuffer.day = day
        }
        this.setState({
            now: nowBuffer,
            max: maxBuf
        })
        console.log(this.state.now, this.state.max)
    }
    changeYear(e){
        let that = this
        this.setDate({
            year: e.detail.value,
            mouth: that.state.now.mouth
        })
    }
    changeMouth(e){
        let that = this
        this.setDate({
            mouth: e.detail.value,
            year: that.state.now.year
        })
    }
    changeDay(e){
        let buffer = this.state.now
        buffer.day = e.detail.value
        this.setState({
            now: buffer
        })
    }
    canle(){
        this.setState({
            chooseDate: false
        })
    }
    submitDate(){
        let date = `${this.state.now.year}-${this.state.now.mouth}-${this.state.now.day}`
        this.setState({
            chooseDate: false,
            showDate: date
        })
    }
    goBack(){
        Taro.navigateBack()
    }
    showChooseDate(){
        this.setState({
            chooseDate: true
        })
    }
    render(){
        return (
            <View>
                <View className='head'>
                    <Text className='icon-back' onClick={this.goBack} style="font-size: 40rpx;float: left;"></Text>
                    <Text style="margin-right: 12%;letter-spacing: 3rpx;">一卡通消费记录</Text>
                </View>
                <View className='card'>
                    <Image src={this.state.imgSrc} className='photo'></Image>
                    <View className='info'>
                        <Text>姓名：{this.state.name}\n</Text>
                        <Text>学号：{this.state.number}</Text>
                    </View>
                    <View style="margin-top: 7%;padding-left: 30rpx;border-top: 1px dotted white;color: white;padding-top: 20rpx;font-size: 35rpx;">
                        <Text>{this.state.state}</Text>
                    </View>
                </View>
                <View style="color: gray;font-size: 30rpx;padding: 15rpx;">
                    <Text>消费日期：</Text> 
                    <View className='date' onClick={this.showChooseDate}>
                        <Text style='color:black'>{this.state.showDate}</Text>
                        <Text style="writing-mode: vertical-rl;font-size: 35rpx;margin-left: 8px;transform: scaleX(1.6);">></Text>
                    </View>
                </View>
                <View>
                    {this.state.consumption.map((item, index)=>{
                        let color = `color: ${item.color}`
                        return <View className='list'>
                                    <View style="font-size: 45rpx;display: inline-block;" className='textHidden'>{item.place}</View>
                                    <Text className='price' style={color}>{item.price}\n</Text>
                                    <Text className='time'>{item.date}</Text>
                               </View>
                    })}
                </View>
                {this.state.chooseDate && <View className='chooseView'>
                    <View className='chooseDate'>
                        <View className='chooseDateHead'>
                            <Text onClick={this.canle}>取消</Text>
                            <Text style="float: right;" onClick={this.submitDate}>确定</Text>
                        </View>
                        <Text>年份：</Text>
                        <Slider step={1} value={this.state.now.year}showValue min={this.state.min.year} max={this.state.max.year} onChange={this.changeYear.bind(this)} style="width: 83%;display: inline-block;margin: 0;"/>
                        <Text>\n\n月份：</Text>
                        <Slider step={1} value={this.state.now.mouth} showValue min={this.state.min.mouth} max={this.state.max.mouth} onChange={this.changeMouth.bind(this)} style="width: 75%;display: inline-block;margin: 0;"/>
                        <Text>\n\n天数：</Text>
                        <Slider step={1} value={this.state.now.day} showValue min={this.state.min.day} max={this.state.max.day} onChange={this.changeDay.bind(this)} style="width: 75%;display: inline-block;margin: 0;"/>
                    </View>
                </View>}
            </View>
        )
    }
}

export default Card