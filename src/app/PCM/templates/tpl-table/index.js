import TableWrapper from 'app/layouts/table'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { tableSbeLocation } from 'utils/constants'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import PcmField from 'app/PCM/components/pcm-field'
import { Box } from '@chakra-ui/react'
import useProductColors from 'utils/productColors'

const TemplateTable = ({ parentCode, mappedPcm, depth }) => {
  const tableObject = useSelector(selectCode(parentCode, tableSbeLocation))
  const { tableDropShadow, tableBorderRadius } = useProductColors()
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

  const tableCode = tableObject?.value || ''
  return (
    <Box shadow={tableDropShadow} borderRadius={tableBorderRadius} overflow={'hidden'} py={5}>
      <TableWrapper
        tableCode={tableCode}
        passedTable={mappedPcm.PRI_LOC1}
        passedComponents={passedComponents}
      />
    </Box>
  )
}

export default TemplateTable
