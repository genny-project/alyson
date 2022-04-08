import Chip from 'app/layouts/components/chip'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'

const DateChip = ({ onClick, date, includeTime, onlyYear, month }) => (
  <Chip maxW="25vw" onClick={onClick}>
    {timeBasedOnTimeZone(date, { includeTime, onlyYear, month })}
  </Chip>
)

export default DateChip
