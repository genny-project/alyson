import { Select } from '@chakra-ui/react'
import { map } from 'ramda'
import defaultTimeZones from 'utils/helpers/time-zone.json'
import { Read } from 'app/DTT/text'

const Write = ({ questionCode, onSendAnswer }) => {
  return (
    <Select
      placeholder="Select Time Zone"
      onChange={e => onSendAnswer(e.target.value)}
      test-id={questionCode}
    >
      {map(([key, val]) => {
        return (
          <option value={val} key={key}>
            {key}
          </option>
        )
      })(Object.entries(defaultTimeZones))}
    </Select>
  )
}

const TimeZonePicker = {
  Write,
  Read,
}

export default TimeZonePicker
