import { Box, HStack, VStack } from '@chakra-ui/react'
import { slice, min } from 'ramda'
import { isNotEmpty } from 'utils/helpers/is-null-or-undefined'

import DetailField from '../detail-field'
import useGetDetailData from '../get-detail-data'

const TemplateDetailViewOne = ({ mappedPcm, depth }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)

  const detailField = index => (
    <DetailField code={baseEntityCode} attributeCode={fields[index]} index={index} />
  )
  const l = fields.length
  return (
    <Box padding="10px">
      <VStack>
        {isNotEmpty(fields) && detailField(0)}
        {l > 1 && detailField(1)}
      </VStack>
      <HStack>
        {l > 2 && slice(2, min(6, l))(fields).map((v, index) => detailField(2 + index))}
      </HStack>
      <VStack>
        {l > 6 && slice(6, Infinity)(fields).map((v, index) => detailField(6 + index))}
      </VStack>
    </Box>
  )
}

export default TemplateDetailViewOne
