const showLogs = () => {
  if (process.env.NODE_ENV !== 'production' || localStorage.getItem('useDev') === 'true') {
    return true
  }
  return false
}

export default showLogs
