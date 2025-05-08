import { ckeckSome } from './interfaceDurationTime'
/**
 * 定义 全局的存储变量
 * startTime: 路由跳转开始时间
 * el_render_time: 从路由跳转开始到新页面完成第一次DOM更新的时长
 */
export function addEach (Vue, router, pageDueationTimeConfig, pageThen) {
  let jumpIndex = 0
  window.pageDueationTimeStore = {}
  // eslint-disable-next-line prefer-const
  let pageDueationTime = window.pageDueationTimeStore
  router.beforeEach((to, from, next) => {
    jumpIndex++
    if (pageDueationTimeConfig[to.path]) {
      const apiObj = {}
      // eslint-disable-next-line array-callback-return
      pageDueationTimeConfig[to.path].map((item) => {
        apiObj[item] = {
          isConfig: true
        }
      })
      pageDueationTime[to.path] = {
        apiObj, // 预制对象，用于记录当前页面接口实时状态
        isConfig: true, // 是否预先配置
        isConfigLength: pageDueationTimeConfig[to.path].length, // 预制接口数量
        jumpIndex
      }
    } else {
      pageDueationTime[to.path] = {
        apiObj: {}, // 预制对象，用于记录当前页面接口实时状态
        isConfig: false, // 是否预先配置
        jumpIndex
      }
    }
    // 记录路由跳转开始时间
    pageDueationTime[to.path].startTime = new Date().getTime()
    // 所有接口是否加载完毕
    pageDueationTime[to.path].isApiOver = false
    // 所有接口是否加载完毕时间
    pageDueationTime[to.path].isApiOverTime = null
    // 页面加载完毕时间
    pageDueationTime[to.path].page_load_time = null
    // 页面加载完毕时间
    pageDueationTime[to.path].routerPath = to.path
    // 页面加载时是否在后台
    pageDueationTime[to.path].isHidden = document.visibilityState === 'hidden'

    next()
  })

  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      pageDueationTime[to.path].el_render_time =
        new Date().getTime() - pageDueationTime[to.path].startTime
      setTimeout(() => {
        ckeckSome(pageDueationTime[to.path], pageThen)
      }, 1000)
    })
  })
}
