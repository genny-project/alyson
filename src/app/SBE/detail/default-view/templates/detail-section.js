import { Text, Stack, VStack } from '@chakra-ui/react'
import { map } from 'ramda'
import Attribute from 'app/BE/attribute'
import Label from 'app/BE/attribute/Label'

const DetailSection = ({
  config,
  noTitle,
  row,
  code,
  details: { title, attributes },
  hideLabel = false,
}) => {
  return (
    <Stack direction={row ? 'row' : 'column'} alignItems="left">
      {!noTitle && <Text textStyle="body1">{title}</Text>}
      {map(attr => (
        <VStack alignItems="left" key={attr}>
          {!hideLabel && <Label code={code} attribute={attr} />}
          <Attribute config={config} code={code} attribute={attr} />
        </VStack>
      ))(attributes)}
    </Stack>
  )
}

export default DetailSection
