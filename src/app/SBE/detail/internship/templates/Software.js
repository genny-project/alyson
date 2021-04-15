import { Badge, Wrap, WrapItem } from '@chakra-ui/layout'
import { split } from 'ramda'

const Software = ({ value }) => {
  const array = split(', ', value || '')

  return (
    <Wrap maxW="30rem">
      {array.map(a => (
        <WrapItem key={a}>
          <Badge colorScheme="green">{a}</Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}

export default Software
