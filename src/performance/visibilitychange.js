const handleVisibilityChange = () => {
  if (document.visibilityState === 'hidden') {
    setIshidden()
  }
}

// 进入后台时组织当前队列中所有，首屏、页面渲染、接口请求时间性能参数上报
function setIshidden () {
  const savePageDueationTimeStore = window.pageDueationTimeStore
  if (isNonEmptyObject(savePageDueationTimeStore)) {
    for (const key in savePageDueationTimeStore) {
      savePageDueationTimeStore[key].isHidden = true
      const apiObj = savePageDueationTimeStore[key].apiObj
      if (isNonEmptyObject(apiObj)) {
        for (const key in apiObj) {
          apiObj[key].isHidden = true
        }
      }
    }
  }
}

function isNonEmptyObject (obj) {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0
}

// 添加事件监听器
export const addVisibilitychange = () => {
  if (window.isAddVisibilitychange === true) {
    return
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.isAddVisibilitychange = true
}

// 移除事件监听器
export const removeVisibilitychange = () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
}
