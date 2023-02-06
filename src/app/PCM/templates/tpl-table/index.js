import PcmField from 'app/PCM/components/pcm-field'
import TableWrapper from 'app/layouts/table'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import { selectCode } from 'redux/db/selectors'
import { tableSbeLocation } from 'utils/constants'
import { useSelector } from 'react-redux'

const TemplateTable = ({ parentCode, mappedPcm, depth }) => {
  const spillLocs = getSpillLocs(mappedPcm, 'PRI_LOC1')

  const passedComponents = mapSpillLocs(loc => (
    <PcmField
      key={loc}
      code={loc}
      mappedPcm={mappedPcm}
      depth={depth}
      config={{ config: { mt: 0 } }}
    />
  ))(spillLocs)

  const tableObject = useSelector(selectCode(parentCode, tableSbeLocation))
  const tableCode = tableObject?.value || ''
  return (
    <TableWrapper
      tableCode={tableCode}
      passedTable={mappedPcm.PRI_LOC1}
      passedComponents={passedComponents}
      pcmCode={mappedPcm.parentCode}
    />
  )
}

export default TemplateTable
