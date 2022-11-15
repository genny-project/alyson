import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

const mapStandard = (mappedPcm, depth) =>
  mapSpillLocs(loc => <PcmField key={loc} code={loc} mappedPcm={mappedPcm} depth={depth} />)(
    getSpillLocs(mappedPcm),
  )

export default mapStandard
