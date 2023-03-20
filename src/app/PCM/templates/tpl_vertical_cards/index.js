import { Box, Grid, HStack, Text } from '@chakra-ui/react'
import { filter, includes, map } from 'ramda'
import { selectCode, selectKeys } from 'redux/db/selectors'
import { getColumnDefs, getFields } from '../../helpers/sbe-utils'

import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
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

  return (
    <>
      <Box padding={'10px'}>
        <Box paddingBottom={3}>
          <Title sbeCode={sbeCode} />
        </Box>
        {!!rows.length ? (
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
        ) : (
          <HStack textStyle={'body.error'} marginBlockStart={4}>
            <FontAwesomeIcon icon={faBinoculars} size="2x" />
            <Text>{'We looked, nothing seems to be here!'}</Text>
          </HStack>
        )}
      </Box>
    </>
  )
}

export default TemplateVerticalCards
