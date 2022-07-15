import { Box } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { filter, has, includes, reduce, sort, values, replace, map } from 'ramda'
import DetailField from './detail-field'

const getColumnDefs = mappedSbe => {
  return filter(obj => {
    if (has('attributeCode')(obj)) {
      return includes('COL_')(obj.attributeCode)
    }
    return false
  })(sort((a, b) => a.index - b.index)(values(mappedSbe)))
}

const getFields = columnDefs => {
  return reduce((acc, elem) => {
    const attr = replace('COL_', '')(elem.attributeCode)

    acc = [...acc, attr]

    return acc
  }, [])(columnDefs)
}

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
