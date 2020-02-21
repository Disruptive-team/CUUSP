import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import Course from './pages/course/course'
import Exam from './components/exam/exam'
import Setting from './pages/setting/index'

import configStore from './store'

import './app.css'
import './icon.css'
import './assets/iconfont.css'

import {checkCode} from './Interface/user'
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
      'pages/setting/index'
    ],
    subPackages: [
      {
        "root": 'functions',
        "pages": [
          'achievement/achievement',
          'exam/exam',
          'card/card'
        ]
      }
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

    let type = Taro.getEnv()
    if(type === 'WEAPP'){
      Taro.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
          console.log('session_key 未过期')
          try {
            let auth_token = Taro.getStorageSync("auth_token")
            console.log("auth_token的值是",auth_token)
            if (!auth_token){
              console.log("没有获取到auth_token")
              Taro.login({
                success(res){
                  console.log("请求微信的res是",res)
                  checkCode({
                    code: res.code,
                    type: 'wx'
                  }).then(r=>{
                    // console.log("获取后端auth_token的结果是",r.data.data.auth_token)
                    console.log("获取code后端的结果是",r.data.code)
                    if(r.data.code === 200){
                      try {
                        Taro.setStorageSync('auth_token', r.data.data.auth_token)
                      } catch (e) { }
                    }
                  })
                }
              })
            }

          }catch (e) {
          }
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          console.log('session_key过期')
          Taro.login({
            success(res){
              checkCode({
                code: res.code,
                type: 'wx'
              }).then(r=>{
                if(r.data.code === 200){
                  Taro.setStorage({
                    key: 'auth_token',
                    data: r.data.data.auth_token
                  })
                }
              })
            }
          })
        }
      })
    }
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
        <Course />
        <Exam />
        <Setting />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
