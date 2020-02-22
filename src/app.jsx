import Taro, { Component } from '@tarojs/taro'
import { connect, Provider } from '@tarojs/redux'

import Index from './pages/index'
import Course from './pages/course/course'
import Exam from './components/exam/exam'
import Setting from './pages/setting/index'

import configStore from './store'

import './app.css'
import './icon.css'
import './assets/iconfont.css'

import {common_info} from './store/actions'
import {whetherBindID} from './Interface/common'
import {checkCode} from './Interface/user'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()
@connect(({ commonInfo }) => ({
  commonInfo
}), (dispatch) => ({
  setCommonInfo(data) {
    dispatch(common_info(data))
  }
}))
class App extends Component {

  config = {
    pages: [
      'pages/home/home',
      'pages/course/course',
      'pages/index/index',
      'pages/login/login',
      'pages/register/register',
      'pages/my/my',
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
    let that = this
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
                    that.getBindID()
                  })
                }
              })
            }
            else {
              that.getBindID(auth_token)
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
                  that.getBindID(r.data.data.auth_token)
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

  getBindID(auth_token){
    let that = this
    if(!auth_token){
      Taro.getStorage({
        key: 'auth_token',
        success: function(r){
          whetherBindID({
            auth_token: r.data
          }).then(res=>{
              if(res.data.code === 200){
                  that.props.setCommonInfo({
                    bindID: res.data.data.bind
                  })
              }
          }).catch(err=>{
              console.log(err)
          })
        }})
    }else {
      whetherBindID({
        auth_token: auth_token
      }).then(res=>{
          if(res.data.code === 200){
              that.props.setCommonInfo({
                bindID: res.data.data.bind
              })
          }
      }).catch(err=>{
          console.log(err)
      })
    }

  }

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
