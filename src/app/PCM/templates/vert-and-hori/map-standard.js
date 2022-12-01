import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

const mapStandard = (mappedPcm, depth, config = {}) =>
  mapSpillLocs(loc => (
    <PcmField key={loc} code={loc} mappedPcm={mappedPcm} depth={depth} config={config} />
  ))(getSpillLocs(mappedPcm))

export default mapStandard
