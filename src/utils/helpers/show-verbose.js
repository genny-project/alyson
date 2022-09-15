const showVerbose = () => {
  if (localStorage.getItem('verbose') === 'true') {
    return true
  }
  return false
}

export default showVerbose
