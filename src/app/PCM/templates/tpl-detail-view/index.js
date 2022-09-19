import { VStack } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { filter, findIndex, map } from 'ramda'
import DetailField from './detail-field'
import { getFields, getColumnDefs } from '../../helpers/sbe-utils'
import notIncludes from 'utils/helpers/not-includes'

const TemplateDetailView = ({ mappedPcm, depth }) => {
  const sbeCode = mappedPcm.PRI_LOC1

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const baseEntityCode = mappedSbe.PRI_CODE?.value || ''
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const actions = filter(e => e)(
    map(act => act?.attributeCode)(useGetActionsFromCode(sbeCode) || []),
  )

  const titleIndex = findIndex(notIncludes('_IMAGE_'))(mappedValues)

  return (
    <VStack padding={'10px'} align="start">
      {mappedValues.map((attributeCode, index) => {
        return (
          <DetailField
            key={`${attributeCode}-${index}`}
            sbeCode={sbeCode}
            code={baseEntityCode}
            attributeCode={attributeCode}
            isTitle={titleIndex === index}
            actions={actions}
          />
        )
      })}
    </VStack>
  )
}

export default TemplateDetailView
