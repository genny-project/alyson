import hori from './hori'
import mapAll from './map-all'
import vert from './vert'

/**
 * Returns all mapped attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateVert = ({ mappedPcm, depth, config }) => vert(mapAll)(mappedPcm, depth, config)

/**
 * Returns all mapped attributes in a horizontal list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
export const TemplateHori = ({ mappedPcm, depth, config, showCard = false }) =>
  hori(mapAll)(mappedPcm, depth, config, showCard)
