import { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './select.css'

class Select extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            element: props.element,
            width: props.width,
            height: props.height,
            color: props.color,
            background: props.background,
            index: props.index || 0,
            option: false,
        })
      }
    showOptions(){
        let flag = !this.state.option
        this.setState({
            option: flag
        })
    }
    choose(index){
        this.setState({
            index: index,
            option: false
        })
        this.props.changeOption(index);
    }

    render(){
        let style = `background: ${this.state.background}; width: ${this.state.width}rpx;height: ${this.state.height}rpx;color: ${this.state.color}`
        return (
            <View style="font-size: 11px;line-height: 20px;position: absolute;z-index: 100;margin-left: 10%;">
                <View style={style} onClick={this.showOptions}>
                    <Text style="margin-left: 20%;">{this.state.element[this.state.index]}</Text>
                    <Text style="float: right;writing-mode: vertical-rl;margin-top: 8%;transform: scaleX(1.4);">></Text>
                </View>
                <View>
                    {this.state.option&&
                    this.state.element.map((item, index)=>{
                        style = `background: ${this.state.background === 'transparent' ? 'white' : this.state.background}; width: ${this.state.width}rpx;height: ${this.state.height}rpx;color: ${this.state.color}`
                        return <View style={style} className='option' onClick={this.choose.bind(this, index)}>
                            {item}
                        </View>
                    })}
                </View>
                
            </View>
        )
    }
}

export default Select