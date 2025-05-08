export const monitorError = (errorThen = () => {}) => {
  try {
    document.addEventListener('DOMContentLoaded', function () {
      window.addEventListener('error', function (event) {
        if (event.error) {
          errorThen({
            errorInfo: event.error.stack
          })
        }
      })
      window.addEventListener('unhandledrejection', function (event) {
        errorThen({
          errorInfo: event.reason
        })
      })
    })
  } catch (error) {}
}
