import { Component } from '@tarojs/taro'
import CardComponent from '../../components/card/card'

class Card extends Component{
    
    config = {
        navigationBarTitleText: '一卡通',
    }
    render(){
        return (
            <CardComponent icon-back='iconfont iconback'/>
        )
    }
}

export default Card