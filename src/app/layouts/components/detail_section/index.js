import { Text, Stack, VStack, Flex, Center } from '@chakra-ui/react'
import { map } from 'ramda'

import Attribute from 'app/BE/attribute'
import Label from 'app/BE/attribute/Label'
import Status from 'app/DTT/status'

const DetailSection = ({
  config,
  noTitle,
  row,
  code,
  details: { title, attributes },
  hideLabel = false,
  status,
  horizontalLayout,
}) => {
  return horizontalLayout ? (
    <Stack direction={row ? 'column' : 'column'} alignItems="left">
      {!noTitle && <Text textStyle="body.1">{title}</Text>}
      {status && <Status.Read data={status} config={{ width: 'min-content' }} />}
      {map(attr => (
        <Flex alignItems="left" key={attr}>
          <Label code={code} attribute={attr} horizontalLayout />
          <Center>
            <Attribute config={config} code={code} attribute={attr} />
          </Center>
        </Flex>
      ))(attributes)}
    </Stack>
  ) : (
    <Stack direction={row ? 'column' : 'column'} alignItems="left">
      {!noTitle && <Text textStyle="body.1">{title}</Text>}
      {status && <Status.Read data={status} config={{ width: 'min-content' }} />}
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
