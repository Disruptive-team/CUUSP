import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.css'
import './icon.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/course/course',
      'pages/index/index',
      'pages/login/login',
      'pages/register/register',
      'pages/my/my',
      'pages/home/home',
      'pages/achievement/achievement',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#00BFFF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: 'black',
      selectedColor: '#00BFFF',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list:[{
        pagePath: "pages/home/home",
        iconPath: "images/home-1.png",
        selectedIconPath: "images/home-2.png",
        text: "主页"
      }, {
        pagePath: "pages/course/course",
        iconPath: "images/class_2.png",
        selectedIconPath: "images/class_1.png",
        text: "课表"
      }, {
        pagePath: "pages/my/my",
        iconPath: 'images/my_2.png',
        selectedIconPath: 'images/my_1.png',
        text: '我的'
      }]
    }
  }

  componentDidMount () {
    
  }

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
