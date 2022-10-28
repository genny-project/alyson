import { VStack } from '@chakra-ui/react'
import { findIndex } from 'ramda'
import DetailField from './detail-field'
import useGetDetailData from './get-detail-data'
import notIncludesAny from 'utils/helpers/not-includes-any'

const TemplateDetailView = ({ mappedPcm, depth }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)

  //This is not a good way to check this but it was the best I could come up with short term
  const titleIndex = findIndex(notIncludesAny('_IMAGE', '_PICTURE'))(fields)
  return (
    <VStack padding={'10px'} align="start">
      {fields.map((attributeCode, index) => {
        return (
          <DetailField
            key={`${attributeCode}-${index}`}
            code={baseEntityCode}
            attributeCode={attributeCode}
            isTitle={titleIndex === index}
          />
        )
      })}
    </VStack>
  )
}

export default TemplateDetailView
