const regex = /(?:^\w|[A-Z]|\b\w|\s+)/g

const setIconName = name => {
  const icon = name.replace(/[^\w]/g, ' ')
  const iconName = icon.toLowerCase().replace(regex, (match, letter) => {
    if (+match === 0) return ''
    return letter === 0 ? match.toLowerCase() : match.toUpperCase().replace(/[^\w]/g, '')
  })
  return iconName
}

export default setIconName
