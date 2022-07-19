import { getFields, getColumnDefs } from '../../helpers/sbe-utils'

import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useSelector } from 'react-redux'
import { selectKeys, selectCode } from 'redux/db/selectors'
import { includes, filter } from 'ramda'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const TemplateHorizontalCards = ({ mappedPcm }) => {
  const sbeCodePrefix = mappedPcm.PRI_LOC1

  const keys = useSelector(selectKeys)

  const sbeCode = (filter(key => includes(sbeCodePrefix)(key) && !includes('@')(key))(keys) || [
    '',
  ])[0]

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const rows = useSelector(selectCode(sbeCode, 'rows'))

  const color = useGetAttributeFromProjectBaseEntity('PRI_COLOR').valueString

  return (
    <Box padding={'10px'}>
      <HStack>
        {rows.map(item => {
          return <Card mappedValues={mappedValues} baseEntity={item} color={color} />
        })}
      </HStack>
    </Box>
  )
}

const Card = ({ mappedValues, baseEntity, color }) => {
  return (
    <Box border={'thick'} borderRadius={'lg'} borderColor={color} height={'100px'}>
      <VStack>
        {mappedValues.map((value, index) => {
          const fontSize = index === 0 ? 'xl' : 'md'
          return <Text fontSize={fontSize}>{value}</Text>
        })}
      </VStack>
    </Box>
  )
}

export default TemplateHorizontalCards
