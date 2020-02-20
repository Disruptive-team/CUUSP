import Taro from '@tarojs/taro'

/**
 * ----------------------------------------------------
 * @path   /api/user/wx/login
 * @method POST
 * @desc   微信登录接口
 * @author 杨欣
 * ----------------------------------------------------
 */
export  function checkCode(obj){
    let {
        code,
        type
    } = obj

    return Taro.request({
            url: 'http://api.maxlv.org:5010/api/user/wx/login',
            data: {
                code: code,
                type: type
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
}

/**
 * ----------------------------------------------------
 * @path   /api/user/wx/updateUserInfo
 * @method POST
 * @desc   更新用户信息
 * @author 杨欣
 * ----------------------------------------------------
 */
export function updateUserInfo(obj){
    let {
        nick_name,	
        gender,
        avatar_url,	
        country,
        city,
        auth_token
    } = obj

    return Taro.request({
        url: 'http://api.maxlv.org:5010/api/user/wx/updateUserInfo',
            data: {
                nick_name: nick_name,	
                gender: gender,
                avatar_url: avatar_url,	
                country: country,
                city: city,
            },
            header: {
                'content-type': 'application/json',
                Authorization: auth_token
            },
            method: 'POST',
    })
}

/**
 * ----------------------------------------------------
 * @path   /api/user/wx/bind
 * @method POST
 * @desc   更新用户信息
 * @author 杨欣
 * @date 2020-2-20
 * ----------------------------------------------------
 */

 export function bindWX(obj){
    let {
        student_number,
        password,
        auth_token
    } = obj

    return Taro.request({
        url: 'http://api.maxlv.org:5010/api/user/wx/bind',
        data: {
            student_number: student_number,	
            password: password
        },
        header: {
            'content-type': 'application/json',
            Authorization: auth_token
        },
        method: 'POST',
    })
 }