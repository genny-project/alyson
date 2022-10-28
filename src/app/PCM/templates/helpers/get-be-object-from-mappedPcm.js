import { pathOr } from 'ramda'

const getBeObjectFromMappedPcm = pcmObject => location => pathOr('', [location])(pcmObject)

export default getBeObjectFromMappedPcm
