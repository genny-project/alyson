import { compose, join, split } from 'ramda'

const getDownloadableLinkFromUrl = compose(join(''), split('video/'))
const getDownloadableVideoLinkFromUrl = compose(join('video/mp4/videoQuality/'), split('video/'))

export { getDownloadableVideoLinkFromUrl }
export default getDownloadableLinkFromUrl
