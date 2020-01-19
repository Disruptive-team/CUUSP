import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/login/login',
      'pages/main/main',
      'pages/my/my',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#00BFFF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tarbar:{
      backgroundColor: 'light',
      selectedColor: '#00BFFF',
      borderStyle: 'black',
      list:[{
        pagePath: "src/pages/main/main",
        iconPath: "src/images/class_1.svg",
        selectedIconPath: "src/images/class_2.svg",
        text: "主页"
      },{
        pagePath: "src/pages/my/my",
        iconPath: "src/images/my_1.svg",
        selectedIconPath: "src/images/my_2.svg",
        text: "个人"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
