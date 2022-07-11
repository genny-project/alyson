import { Box } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { filter, has, includes, reduce, sort, values, replace } from 'ramda'
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

  return (
    <Box padding={'10px'}>
      {mappedValues.map((attributeCode, index) => {
        return <DetailField code={baseEntityCode} attributeCode={attributeCode} index={index} />
      })}
    </Box>
  )
}

export default TemplateDetailView
