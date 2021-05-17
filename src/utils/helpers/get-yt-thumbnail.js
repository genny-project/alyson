const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

const getYtThumbnail = (url, size = 'hqdefault') => {
  const match = url.match(regExp)

  if (match && match[7]) {
    const videoCode = match[7].length === 11 ? match[7] : `v${match[7]}`
    return 'http://img.youtube.com/vi/' + videoCode + '/' + size + '.jpg'
  }
  return null
}

export default getYtThumbnail
