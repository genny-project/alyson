import { Box } from '@chakra-ui/react'
import TableWrapper from 'app/layouts/table'
import PcmField from 'app/PCM/components/pcm-field'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapSpillLocs from 'app/PCM/helpers/map-spill-locs'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { tableSbeLocation } from 'utils/constants'
import useProductColors from 'utils/productColors'

const TemplateTable = ({ parentCode, mappedPcm, depth }) => {
  const tableObject = useSelector(selectCode(parentCode, tableSbeLocation))
  const { tableDropShadow, tableBorderRadius, tableBackgroundLightColor } = useProductColors()
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
    <Box
      shadow={tableDropShadow}
      borderRadius={tableBorderRadius}
      overflow={'hidden'}
      pt={5}
      pb={10}
      bg={tableBackgroundLightColor}
    >
      <TableWrapper
        tableCode={tableCode}
        passedTable={mappedPcm.PRI_LOC1}
        passedComponents={passedComponents}
      />
    </Box>
  )
}

export default TemplateTable
