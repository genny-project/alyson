import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { filter, map } from 'ramda'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { getFields, getColumnDefs } from '../../helpers/sbe-utils'

const useGetDetailData = mappedPcm => {
  const sbeCode = mappedPcm?.PRI_LOC1 || ''
  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const baseEntityCode = mappedSbe.PRI_CODE?.value || ''
  const mappedValues = getFields(getColumnDefs(mappedSbe))
  const actions = filter(e => e)(
    map(act => act?.attributeCode)(useGetActionsFromCode(sbeCode) || []),
  )

  return {
    sbeCode,
    mappedSbe,
    baseEntityCode,
    mappedValues,
    actions,
  }
}

export default useGetDetailData
