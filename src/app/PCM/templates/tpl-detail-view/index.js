import { Box } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { filter, map } from 'ramda'
import DetailField from './detail-field'
import { getFields, getColumnDefs } from '../../helpers/sbe-utils'

const TemplateDetailView = ({ mappedPcm }) => {
  const sbeCode = mappedPcm.PRI_LOC1

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const baseEntityCode = mappedSbe.PRI_CODE?.value || ''
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const actions = filter(e => e)(
    map(act => act?.attributeCode)(useGetActionsFromCode(sbeCode) || []),
  )

  return (
    <Box padding={'10px'}>
      {mappedValues.map((attributeCode, index) => {
        return (
          <DetailField
            sbeCode={sbeCode}
            code={baseEntityCode}
            attributeCode={attributeCode}
            index={index}
            actions={actions}
          />
        )
      })}
    </Box>
  )
}

export default TemplateDetailView
