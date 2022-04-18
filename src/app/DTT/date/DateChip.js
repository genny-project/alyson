import Chip from 'app/layouts/components/chip'
import { Text } from '@chakra-ui/react'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'

const DateChip = ({ onClick, date, includeTime, onlyYear, month }) => (
  <Chip maxW="25vw" p="2" onClick={onClick}>
    <Text>{timeBasedOnTimeZone(date, { includeTime, onlyYear, month })}</Text>
  </Chip>
)

export default DateChip
