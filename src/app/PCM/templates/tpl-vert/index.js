import { Grid } from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

/**
 * Returns all mapped attributes in a vertical list.
 * Currently uses a more expensive mapping of attributes as this may take in locs
 */
const TemplateVert = ({ mappedPcm, depth }) => {
  return (
    <Grid alignItems="start" spacing="5">
      {mapSpillLocs(loc => <PcmField key={loc} code={loc} mappedPcm={mappedPcm} depth={depth} />)(
        getSpillLocs(mappedPcm)(),
      )}
    </Grid>
  )
}

export default TemplateVert
