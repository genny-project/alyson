const getYtThumbnail = (url, size) => {
  const matchRegex = url.match('[\\?&]v=([^&#]*)')
  const videoCode = matchRegex === null ? url : matchRegex[1]
  return 'http://img.youtube.com/vi/' + videoCode + '/' + size + '.jpg'
}

export default getYtThumbnail
