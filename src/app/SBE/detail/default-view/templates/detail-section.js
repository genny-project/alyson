import { Text, HStack, Stack, VStack } from '@chakra-ui/react'
import { map } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Label from 'app/BE/attribute/Label'

const DetailSection = ({
  config,
  noTitle,
  row,
  code,
  details: { sectionIcon, title, attributes },
}) => {
  return (
    <HStack p="4" alignItems="start">
      {!noTitle && (
        <Text pr="4" pt="1">
          <FontAwesomeIcon size="lg" icon={sectionIcon} />
        </Text>
      )}
      <Stack direction={row ? 'row' : 'column'} alignItems="left">
        {!noTitle && <Text fontSize="xl">{title}</Text>}
        {map(attr => (
          <VStack alignItems="left">
            {attributes.length > 1 && <Label colorScheme="blue" code={code} attribute={attr} />}
            <Attribute config={config} code={code} attribute={attr} />
          </VStack>
        ))(attributes)}
      </Stack>
    </HStack>
  )
}

export default DetailSection
