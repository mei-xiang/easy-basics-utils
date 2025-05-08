import { addEach } from './routerEach'
import { interfaceDurationTime } from './interfaceDurationTime'
import { monitorError } from './monitorError'
import { addVisibilitychange } from './visibilitychange'
export const performanceInit = (obj = {}) => {
  let {
    vue = null,
    type = 1,
    router = null,
    filterInterface = [],
    pageDueationTimeConfig = {},
    interfaceThen = () => {},
    pageThen = () => {},
    errorThen = null,
    samplingRate = 200
  } = obj
  if (filterInterface) {
    // eslint-disable-next-line no-const-assign
    filterInterface = [...filterInterface, 'uba-test.saas.crland.com.cn', 'uba-data.crland.com.cn']
  }
  if (!vue) {
    return console.error('[performanceInit] vue参数不能为空，请传入vue')
  }
  if (!router) {
    return console.error('[performanceInit] router参数不能为空，请传入router')
  }
  addEach(vue, router, pageDueationTimeConfig, pageThen)
  interfaceDurationTime(
    {
      type,
      router,
      interfaceThen,
      pageThen,
      filterInterface,
      samplingRate
    }
  )
  if (typeof errorThen === 'function') {
    monitorError(errorThen)
  }
  // 监听页面可见性变化
  addVisibilitychange()
}
