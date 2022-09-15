const showVerbose = () => {
  if (process.env.NODE_ENV !== 'production' || localStorage.getItem('verbose') === 'true') {
    return true
  }
  return false
}

export default showVerbose
