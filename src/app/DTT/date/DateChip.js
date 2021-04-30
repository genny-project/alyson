import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import Chip from 'app/layouts/components/chip'

const DateChip = ({ onClick, date, includeTime, onlyYear }) => (
  <Chip onClick={onClick}>{timeBasedOnTimeZone(date, { includeTime, onlyYear })}</Chip>
)

export default DateChip
