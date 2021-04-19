import { Badge, HStack, Text } from '@chakra-ui/layout'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'

const DateChip = ({ onClick, date, includeTime }) => (
  <Badge colorScheme="purple" cursor="pointer" onClick={onClick}>
    <HStack padding="1">
      <FontAwesomeIcon icon={faTimes} />
      <Text>{timeBasedOnTimeZone(date, { includeTime })}</Text>
    </HStack>
  </Badge>
)

export default DateChip
