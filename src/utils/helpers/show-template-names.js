const showTemplateNames = () => {
  if (localStorage.getItem('showTemplateNames') === 'true') {
    return true
  }
  return false
}

export default showTemplateNames
