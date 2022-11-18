import { Box, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import FieldRow from './field-row'

const TemplateSBEDetailView = ({ mappedPcm }) => {
  const baseEntityCode = mappedPcm?.PRI_LOC1 || ''
  const attributes = useSelector(selectCode(baseEntityCode, 'allAttributes')) || []

  return (
    <Box>
      <VStack>
        {attributes.map((field, index) => (
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
