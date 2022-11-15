import hori from './hori'
import mapAll from './map-all'
import mapStandard from './map-standard'
import vert from './vert'

/**
 * Returns all mapped attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateVert = ({ mappedPcm, depth }) => vert(mapStandard)(mappedPcm, depth)

export const TemplateVertAll = ({ mappedPcm, depth }) => vert(mapAll)(mappedPcm, depth)

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateHori = ({ mappedPcm, depth }) => hori(mapStandard)(mappedPcm, depth)

export const TemplateHoriAll = ({ mappedPcm, depth }) => hori(mapAll)(mappedPcm, depth)
