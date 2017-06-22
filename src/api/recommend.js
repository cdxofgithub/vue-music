import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
  // 获取地址url中 ？前面的部分
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // es6中的深拷贝方法  意思为拷贝commonParams，并且添加在此基础上添加自己的对象
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
