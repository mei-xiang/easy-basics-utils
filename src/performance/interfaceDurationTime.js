// fetch 或 XMLHttpRequest 监听
// eslint-disable-next-line camelcase
export const interfaceDurationTime = (obj = { type: 1, router: null, interfaceThen: () => {}, pageThen: () => {}, filterInterface: [] }) => {
  const { type, router, interfaceThen, pageThen, filterInterface, samplingRate } = obj
  ckeckSome.updateWait(samplingRate)
  if (type === 1 || type === 0) {
    const originalXHR = window.XMLHttpRequest
    window.XMLHttpRequest = class extends originalXHR {
      open (method, url) {
        this.requireUrl = url
        this.startTime = Date.now()
        saveOfWindow('open', arguments)
        return super.open(method, url)
      }

      // send (body) {
      //   this.addEventListener('loadend', () => {
      //     // saveOfWindow('onload', { url: this.requireUrl, body, _startTime: this._startTime})
      //   })
      //   return super.send(body)
      // }
    }
    // 保存原始的 open 和 send 方法
    // const originalOpen = XMLHttpRequest.prototype.open
    // const originalSend = XMLHttpRequest.prototype.send

    // XMLHttpRequest.prototype.open = function () {
    //   try {
    //     // 保存请求的开始时间
    //     this._startTime = new Date().getTime()
    //     this.requireUrl = arguments[1]
    //     saveOfWindow('open', arguments)
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   return originalOpen.apply(this, arguments)
    // }

    // XMLHttpRequest.prototype.send = function (body) {
    //   this.onload = (res) => {
    //     try {
    //       saveOfWindow('onload', { url: this.responseURL, body, _startTime: this._startTime, status: res.currentTarget.status })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //   this.onerror = (res) => {
    //     try {
    //       saveOfWindow('onerror', { url: this.requireUrl, body, _startTime: this._startTime, status: res.currentTarget.status })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   return originalSend.apply(this, arguments)
    // }
  }
  if (type === 2 || type === 0) {
    // 保存原始的 fetch 方法
    const originalFetch = window.fetch

    // 创建一个新的 fetch 方法
    window.fetch = function (url, options = {}) {
      // 请求开始前的处理
      try {
        this._startTime = new Date().getTime()
        saveOfWindow('open', [null, url])
      } catch (error) {
        console.log(error)
      }
      // 创建一个 promise 以便拦截请求完成后的逻辑
      return originalFetch(url, options)
        .then(response => {
          try {
            // saveOfWindow('onload', { url, body: options?.body, _startTime: this._startTime, status: response.status })
          } catch (error) {
            console.log(error)
          }
          return response
        })
        .catch(response => {
          // 请求失败时的处理
          try {
            saveOfWindow('onerror', { url, body: options?.body, _startTime: this._startTime, status: 0 })
          } catch (error) {
            console.log(error)
          }
          throw response
        })
    }
  }

  // 监听资源加载完成事件
  const entryTypes = []
  if (type === 1 || type === 0) {
    entryTypes.push('xmlhttprequest')
  } else if (type === 2 || type === 0) {
    entryTypes.push('fetch')
  }

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entryTypes.includes(entry.initiatorType)) {
        saveOfWindow('onload', {
          url: entry.name,
          duration: entry.duration
        })
      }
    })
  })

  observer.observe({ entryTypes: ['resource'] })

  const saveOfWindow = (module, data) => {
    // 判断是否存在window.pageDueationTimeStore
    if (!window.pageDueationTimeStore) {
      return
    }
    const pageDueationTime = window.pageDueationTimeStore
    const pathString = router?.currentRoute?.value?.path || router?.currentRoute?.path || router.currentRoute.fullPath
    const pathKey = pageDueationTime[pathString]
    // 判断页面path是否被记录和 接口是否加载完毕
    if (!pathKey) {
      return
    }

    if (module === 'open') {
      // eslint-disable-next-line no-sequences
      if (isFilterApi(data[1], filterInterface) || pathKey.isApiover) {
        return
      }
      const interfaceKey = getApiID(data[1]) || splitUrl(data[1])
      const haveApi = pathKey.apiObj[interfaceKey] !== undefined
      // 下午优化逻辑
      if (!haveApi) {
        pathKey.apiObj[interfaceKey] = {
          startTime: new Date().getTime(),
          state: 0,
          endTime: null,
          isHidden: document.visibilityState === 'hidden'
        }
      } else if (pathKey.isConfig) {
        pathKey.apiObj[interfaceKey].startTime = new Date().getTime()
        pathKey.apiObj[interfaceKey].state = 0
        pathKey.apiObj[interfaceKey].endTime = null
        pathKey.apiObj[interfaceKey].isHidden = document.visibilityState === 'hidden'
      }
    } else if (module === 'onload' || module === 'onerror') {
      if (isFilterApi(data.url, filterInterface)) {
        return
      }
      const apiId = getApiID(data.url)
      const urlApi = apiId || splitUrl(data.url)
      const objKey = pathKey.apiObj[urlApi]
      if (objKey) {
        objKey.endTime = new Date().getTime()
        objKey.state = 1
        objKey.status = data.status
        objKey.isHidden = objKey.isHidden === true ? true : document.visibilityState === 'hidden'
      }
      let duration = 0
      if (typeof data.duration === 'number' && !isNaN(data.duration) && Number.isFinite(data.duration)) {
        duration = Math.floor(data.duration || 0)
      }
      if (duration === 0 && objKey) {
        duration = new Date().getTime() - objKey.startTime
      }
      if (!objKey?.isHidden) { // 页面隐藏时不记录接口
        interfaceThen({
          url: data.url,
          duration,
          apiId,
          status: data.status || NaN,
          body: data.body || {}
        })
      }
    }
    ckeckSome(pathKey, pageThen)
  }
}

// 过滤掉不纳入统计的接口，如埋点
export function isFilterApi (url, filterInterface) {
  const backData = filterInterface.some(item => {
    return url.includes(item) === true
  })
  return backData
}

// 判断是否为ecsb请求并获取Api_ID
export function getApiID (url) {
  if (url.indexOf('?ssdp=') !== -1) {
    const paransStr = 'http://domain.com?' + atob(url.split('?ssdp=')[1])
    const urlParams = new URLSearchParams(new URL(paransStr).search)
    return urlParams.get('Api_ID')
  } else {
    return null
  }
}

// 检查所有接口是否加载完毕
export const ckeckSome = debounce((pathKey, pageThen) => {
  if (pathKey.isApiover) return
  const obj = pathKey.apiObj
  if (JSON.stringify(obj) === '{}') {
    pathKey.isApiover = true
    pathKey.isApiOverTime = pathKey.startTime + pathKey.el_render_time
    pathKey.page_load_time = pathKey.el_render_time
    pageThen(pathKey)
    return
  }

  // 判读是否预制页面
  if (pathKey.isConfig) {
    // isConfigLength
    const objs = Object.keys(obj).filter(item => {
      return obj[item].isConfig && obj[item].state === 1
    })
    if (objs.length === pathKey.isConfigLength) {
      const maxDate = findMax(obj)
      pathKey.isApiover = true
      pathKey.isApiOverTime = maxDate
      pathKey.page_load_time = maxDate - pathKey.startTime
      if (isEnterBackend(obj)) {
        pageThen(pathKey)
      }
    }
    return objs
  }
  const backData = Object.keys(obj).every(item => {
    return obj[item].state === 1
  })

  if (backData) {
    const maxDate = findMax(obj)
    pathKey.isApiover = true
    pathKey.isApiOverTime = maxDate
    pathKey.page_load_time = maxDate - pathKey.startTime
    if (isEnterBackend(obj)) {
      pageThen(pathKey)
    }
  }
}, 200)

export function isEnterBackend (obj) {
  return Object.keys(obj).every(item => {
    return obj[item].isHidden === false
  })
}

// 去除域名、协议、端口号export function splitUrl(urlString) {
export function splitUrl (urlString) {
  if (!hasHttpProtocol(urlString)) {
    urlString = window.location.pathname + urlString
    urlString = urlString.replace(/\/\//g, '/')
  }
  let pathname = null
  try {
    const url = new URL(urlString)
    pathname = url.pathname
  } catch (error) {
    pathname = urlString
  }
  return pathname
}
// 判断是否有http协议
function hasHttpProtocol (str) {
  return str.includes('http://') || str.includes('https://')
}

// 查找最大时间戳
export function findMax (obj) {
  let max = 0
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key].endTime
      if (value > max) {
        max = value
      }
    }
  }
  return max
}

// 判断是否为对象字符串
// export const isObjectString = (value) => {
//   try {
//     const parsedValue = JSON.parse(value)
//     return typeof parsedValue === 'object' && parsedValue !== null
//   } catch (e) {
//     return false
//   }
// }

// 自定义防抖函数
// export function debounce (func, wait, immediate) {
//   let timer
//   return function () {
//     const context = this
//     const args = arguments

//     if (timer) clearTimeout(timer)
//     if (immediate) {
//       const callNow = !timer
//       timer = setTimeout(() => {
//         timer = null
//       }, wait)
//       if (callNow) func.apply(context, args)
//     } else {
//       timer = setTimeout(() => {
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }

// 自定义防抖函数，支持动态更新防抖时间
export function debounce (func, wait, immediate) {
  let timer
  let currentWait = wait

  const debounced = function () {
    const context = this
    const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, currentWait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, currentWait)
    }
  }

  // 添加一个更新防抖时间的函数
  debounced.updateWait = function (newWait) {
    currentWait = newWait
  }

  return debounced
}
