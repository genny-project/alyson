import { Badge, Wrap, WrapItem, Box, Text } from '@chakra-ui/layout'
import { split } from 'ramda'

const Software = ({ value, title }) => {
  const array = split(', ', value || '')

  return (
    <Box>
      <Text textStyle="body.1" mb="2">
        {title}
      </Text>
      <Wrap maxW="30rem">
        {array.map(a => (
          <WrapItem key={a}>
            <Badge colorScheme="green">{a}</Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}

export default Software
