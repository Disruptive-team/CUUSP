import { Component } from '@tarojs/taro'
import CardComponent from '../../components/card/card'

class Card extends Component{
    render(){
        return (
            <CardComponent icon-back='iconfont iconback'/>
        )
    }
}

export default Card