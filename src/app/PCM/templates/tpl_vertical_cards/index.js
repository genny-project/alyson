import { Box, Grid, Stack } from '@chakra-ui/react'
import { equals, filter, includes, map } from 'ramda'
import { selectCode, selectKeys } from 'redux/db/selectors'
import { getColumnDefs, getFields } from '../../helpers/sbe-utils'

import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import Pagination from 'app/SBE/table/Pagination.js'
import Title from 'app/SBE/table/Title'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import { useSelector } from 'react-redux'
import useProductColors from 'utils/productColors'
import CardItem from './cardItem'

const TemplateVerticalCards = ({ mappedPcm, depth }) => {
  const sbeCodePrefix = mappedPcm?.PRI_LOC1 || ''
  const keys = useSelector(selectKeys)
  const sbeCode = (filter(key => includes(sbeCodePrefix)(key) && !includes('@')(key))(keys) || [
    '',
  ])[0]

  const actions = useGetActionsFromCode(sbeCode) || []
  const actionCodes = map(act => act?.attributeCode || '')(actions)
  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const rows = useSelector(selectCode(sbeCode, 'rows')) || []
  const { fieldTextColor } = useProductColors()
  const showPagination = equals(sbeCode, 'SBE_TABLE_PROPERTIES')

  return (
    <>
      {!!rows.length && (
        <Box padding={'10px'}>
          <Stack
            direction={'row'}
            paddingBottom={3}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Title sbeCode={sbeCode} />
            {!!showPagination && <Pagination sbeCode={sbeCode} />}
          </Stack>

          <Grid gap={4}>
            {map(item => (
              <CardItem
                actions={actionCodes}
                key={`CARD-${item || ''}`}
                mappedValues={mappedValues}
                baseEntityCode={item}
                primaryColor={fieldTextColor}
                sbeCode={sbeCode}
              />
            ))(rows)}
          </Grid>
        </Box>
      )}
    </>
  )
}

export default TemplateVerticalCards
