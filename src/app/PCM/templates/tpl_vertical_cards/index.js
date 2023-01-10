import { Box, Grid } from '@chakra-ui/react'
import { filter, includes, map } from 'ramda'
import { getColumnDefs, getFields } from '../../helpers/sbe-utils'
import { selectCode, selectKeys } from 'redux/db/selectors'

import CardItem from './cardItem'
import Title from 'app/SBE/table/Title'
import { useGetActionsFromCode } from 'app/SBE/utils/get-actions'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'

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
  const { buttonBackgroundColor } = useProductColors()

  return (
    <>
      {!!rows.length && (
        <Box padding={'10px'}>
          <Box paddingBottom={3}>
            <Title sbeCode={sbeCode} />
          </Box>

          <Grid gap={4}>
            {map(item => (
              <CardItem
                actions={actionCodes}
                key={`CARD-${item || ''}`}
                mappedValues={mappedValues}
                baseEntityCode={item}
                primaryColor={buttonBackgroundColor}
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
