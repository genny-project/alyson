import { Box, HStack, VStack } from '@chakra-ui/react'
import { slice, min } from 'ramda'
import isNotEmpty from 'utils/helpers/is-not-empty'

import DetailField from '../detail-field'
import useGetDetailData from '../get-detail-data'

const TemplateDetailViewOne = ({ mappedPcm, depth }) => {
  const { sbeCode, baseEntityCode, mappedValues, actions } = useGetDetailData(mappedPcm)

  const detailField = index => (
    <DetailField
      sbeCode={sbeCode}
      code={baseEntityCode}
      attributeCode={mappedValues[index]}
      index={index}
      actions={actions}
    />
  )
  const l = mappedValues.length
  return (
    <Box padding="10px">
      <VStack>
        {isNotEmpty(mappedValues) && detailField(0)}
        {l > 1 && detailField(1)}
      </VStack>
      <HStack>
        {l > 2 && slice(2, min(6, l))(mappedValues).map(index => detailField(2 + index))}
      </HStack>
      <VStack>
        {l > 6 && slice(6, Infinity)(mappedValues).map(index => detailField(6 + index))}
      </VStack>
    </Box>
  )
}

export default TemplateDetailViewOne
