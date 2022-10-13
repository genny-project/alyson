import Table from 'app/layouts/table'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'

const TemplateTable = ({ mappedPcm, depth }) => {
  const spillLocs = getSpillLocs(mappedPcm)('PRI_LOC1')
  const passedComponents = mapSpillLocs(loc => (
    <PcmField key={loc} code={loc} mappedPcm={mappedPcm} depth={depth} />
  ))(spillLocs)

  return <Table passedComponents={passedComponents} />
}

export default TemplateTable
