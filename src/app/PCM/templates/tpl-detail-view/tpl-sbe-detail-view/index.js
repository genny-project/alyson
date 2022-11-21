import { Box, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import FieldRow from './field-row'

const TemplateSBEDetailView = ({ mappedPcm }) => {
  const baseEntityCode = mappedPcm?.PRI_LOC1 || ''
  const attributes = useSelector(selectCode(baseEntityCode, 'allAttributes')) || []
  const sourceCode = useSelector(selectCode(mappedPcm?.PRI_QUESTION_CODE, 'sourceCode')) || ''
  const processId = useSelector(selectCode(mappedPcm?.PRI_QUESTION_CODE, 'processId')) || ''

  return (
    <Box>
      <VStack>
        {attributes.map((field, index) => (
          <FieldRow
            key={`detailview-${baseEntityCode}-${index}`}
            baseEntityCode={baseEntityCode}
            data={field}
            index={index}
            processId={processId}
            sourceCode={sourceCode}
            mappedPcm={mappedPcm}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default TemplateSBEDetailView
