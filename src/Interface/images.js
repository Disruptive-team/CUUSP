import Taro from '@tarojs/taro'

/**
 * ----------------------------------------------------
 * @path   /api/getActiveSwiper
 * @method GET
 * @desc   获取首页轮播图
 * @author 杨欣
 * @date 2020-2-21
 * ----------------------------------------------------
 */

export function getActiveSwiper(){
    return Taro.request({
        url: 'http://api.maxlv.org:5010/api/getActiveSwiper',
        data: {},
        header: {
            'content-type': 'application/json',
        },
        method: 'GET',
    })
}