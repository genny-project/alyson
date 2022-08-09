import { getFields, getColumnDefs } from '../../helpers/sbe-utils'

import { Box, HStack, Text, VStack, Image } from '@chakra-ui/react'
import useGetMappedBaseEntity from 'app/PCM/helpers/use-get-mapped-base-entity'
import { useSelector } from 'react-redux'
import { selectKeys, selectCode } from 'redux/db/selectors'
import { includes, filter } from 'ramda'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import Attribute from 'app/BE/attribute'

const TemplateHorizontalCards = ({ mappedPcm, depth }) => {
  const sbeCodePrefix = mappedPcm.PRI_LOC1

  const keys = useSelector(selectKeys)

  const sbeCode = (filter(key => includes(sbeCodePrefix)(key) && !includes('@')(key))(keys) || [
    '',
  ])[0]

  const mappedSbe = useGetMappedBaseEntity(sbeCode)
  const mappedValues = getFields(getColumnDefs(mappedSbe))

  const rows = useSelector(selectCode(sbeCode, 'rows')) || []

  const primaryColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || ''

  return (
    <Box padding={'10px'}>
      <HStack spacing="10">
        {rows.map(item => (
          <Card
            key={`CARD-${item['code'] || ''}`}
            mappedValues={mappedValues}
            baseEntityCode={item}
            primaryColor={primaryColor}
          />
        ))}
      </HStack>
    </Box>
  )
}

//Image is hardcoded for the demo, need to remove it after the demo.

const Card = ({ mappedValues, baseEntityCode, primaryColor }) => {
  return (
    <Box border={`1px solid`} borderRadius="3xl" borderColor={primaryColor} p="5">
      <VStack>
        <Image
          src="https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg"
          alt="Property"
          maxWidth="35vw"
        />
        {mappedValues.map((value, index) => {
          const fontSize = index === 0 ? 'xl' : 'md'
          return (
            <Text
              fontSize={fontSize}
              key={`CARD-ATTRIBUTE-${baseEntityCode}-${value}`}
              alignSelf="start"
              color="#004654"
              fontWeight="400"
            >
              <Attribute code={baseEntityCode} attribute={value} />
            </Text>
          )
        })}
      </VStack>
    </Box>
  )
}

export default TemplateHorizontalCards
