import Taro from '@tarojs/taro'

/**
 * ----------------------------------------------------
 * @path   /user/wx/checkBind
 * @method GET
 * @desc   获取用户是否绑定了学号
 * @author 杨欣
 * @date 2020-2-21
 * ----------------------------------------------------
 */

export function whetherBindID(obj){
    let {
        auth_token
    } = obj
    return Taro.request({
        url: 'http://api.maxlv.org:5010/api/user/wx/checkBind',
        data: {},
        header: {
            'content-type': 'application/json',
            Authorization: auth_token
        },
        method: 'GET',
    })
}