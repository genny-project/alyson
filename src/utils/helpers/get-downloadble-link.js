import { compose, join, split } from 'ramda'

const getDownloadableLinkFromUrl = compose(join(''), split('video/'))

export default getDownloadableLinkFromUrl
