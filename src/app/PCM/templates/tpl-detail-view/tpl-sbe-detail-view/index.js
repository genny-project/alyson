import { Box, VStack } from '@chakra-ui/react'
import useGetDetailData from '../get-detail-data'
import FieldRow from './field-row'

const TemplateSBEDetailView = ({ mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)

  return (
    <Box>
      <VStack>
        {fields.map((field, index) => (
          <FieldRow
            key={`detailview-${baseEntityCode}-${index}`}
            baseEntityCode={baseEntityCode}
            attributeCode={field}
            index={index}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default TemplateSBEDetailView
