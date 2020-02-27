import Taro from '@tarojs/taro'

export const check_bind = () => {

  // let res = await Taro.getStorage({"key":"isBind"})
  return new Promise(
    function (resolve, reject) {
      Taro.getStorage({"key": "isBind"}).then(
        //  固有代码，业务代码
        (res) => {
          if (res.data === 1) {
            resolve()
          } else {
            Taro.showModal({
              title: '提示',
              content: '您现在未绑定教务处，是否现在去绑定？',
            }).then(res => {
              if (res.confirm) {
                Taro.navigateTo({
                  url: '../register/register'
                })
              }
            })
            return false
          }
        }
      ).catch((res) => {
        reject(res)
      })
    }
  )
}
