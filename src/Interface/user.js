import Taro from '@tarojs/taro'

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