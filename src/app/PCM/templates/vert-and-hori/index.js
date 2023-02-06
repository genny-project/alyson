import hori from './hori'
import mapAll from './map-all'
import mapStandard from './map-standard'
import vert from './vert'

/**
 * Returns all mapped attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateVert = ({ mappedPcm, depth, config }) =>
  vert(mapStandard)(mappedPcm, depth, config)

export const TemplateVertAll = ({ mappedPcm, depth, config }) =>
  vert(mapAll)(mappedPcm, depth, config)

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateHori = ({ mappedPcm, depth, config }) =>
  hori(mapStandard)(mappedPcm, depth, config)

export const TemplateHoriAll = ({ mappedPcm, depth, config }) =>
  hori(mapAll)(mappedPcm, depth, config)
