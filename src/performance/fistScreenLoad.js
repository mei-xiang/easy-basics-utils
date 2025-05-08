import { addVisibilitychange } from './visibilitychange'
export const getFistScreenLoad = () => {
  try {
    addVisibilitychange() // 监听页面进入后台
    return new Promise((resolve, reject) => {
      if ('performance' in window && performance.getEntriesByType) {
        try {
          window.addEventListener('load', async () => {
            const firstTimeObj = await getPageLoadTime()
            if (firstTimeObj.isHidden) {
              const firstRes = {
                message: '当前页面进入后台，不统计首屏时长'
              }
              reject(firstRes)
              return
            }
            let loadTime = 0
            let [entry] = performance.getEntriesByType('navigation')
            if (entry) {
              loadTime = Math.trunc(entry.loadEventEnd - entry.startTime)
            } else {
              entry = window.performance.timing
              loadTime = Math.trunc(entry.loadEventStart - entry.navigationStart)
            }
            resolve({
              dom_load_time: loadTime,
              page_load_time: loadTime + firstTimeObj.pageLoadTime
            })
          })
        } catch (error) {
          reject(error)
        }
      } else {
        reject(
          new Error(
            '当前浏览器不支持 performance.getEntriesByType 无法获取相关参数'
          )
        )
      }
    })
  } catch (error) {
    console.log('error:', error)
  }
}

const getPageLoadTime = () => {
  return new Promise((resolve, reject) => {
    const loadArr = []
    const t1 = setInterval(() => {
      if (window.pageDueationTimeStore) {
        for (const key in window.pageDueationTimeStore) {
          if (window.pageDueationTimeStore[key]) {
            const index = window.pageDueationTimeStore[key].jumpIndex
            const pageLoadTime =
              window.pageDueationTimeStore[key].page_load_time
            const isHidden = window.pageDueationTimeStore[key].isHidden
            loadArr[index] = { pageLoadTime, isHidden }
          }
          for (let i = 0; i < loadArr.length; i++) {
            if (loadArr[i] && loadArr[i].pageLoadTime) {
              clearInterval(t1)
              resolve(loadArr[i])
              // if (loadArr[i].isHidden) {
              //   const errInfo = {
              //     message: '当前页面进入后台，不统计首屏时长',
              //     pageLoadTime: loadArr[i].pageLoadTime
              //   }
              //   reject(errInfo)
              // } else {
              //   resolve(loadArr[i].pageLoadTime)
              // }
            }
          }
        }
      }
    }, 2000)
  })
}
