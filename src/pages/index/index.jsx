import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.css'

class Index extends Component {
  constructor(props) {
    super(props);
  }

  config = {
    navigationBarTitleText: '首页',
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }


  render () {
    // Taro.navigateTo({
    //   url: '../login/login'
    // })
    return (
      <View className='index'>index</View>
    )
  }
}
const mapStateToProps = (state) => ({
  index: state
})

export default connect(mapStateToProps, null)(Index)
