import TableWrapper from 'app/layouts/table'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { tableSbeLocation } from 'utils/constants'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'
import { includes, values } from 'ramda'

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

  //I think we need a better way to do this but this was the best I could come up with on short notice
  const showSearch = includes('PRI_SEARCH_TEXT')(values(mappedPcm))

  const tableObject = useSelector(selectCode(parentCode, tableSbeLocation))
  const tableCode = tableObject?.value || ''
  return (
    <TableWrapper
      tableCode={tableCode}
      passedTable={mappedPcm.PRI_LOC1}
      passedComponents={passedComponents}
      showSearch={showSearch}
    />
  )
}

export default TemplateTable
