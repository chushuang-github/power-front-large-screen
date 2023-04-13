import hyRequest from './request'

/**
 * 获取新能源充电桩页面的数据( get请求,不需要参数 )
 * @returns 
 */
export function getPowerScreenData() {
  return hyRequest.get({
    url: "/powerscreen"
  })
}
