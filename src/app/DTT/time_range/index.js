import { HStack, Select, Text } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Read } from '../text'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useState } from 'react'

const defaultTimeRange = [null, null]

const options = Array.from(Array(48), (_, idx) => idx / 2)

const getLabel = x =>
  `${Math.floor(x > 12.5 ? x - 12 : x < 1 ? 12 : x)}${x % 1 > 0 ? ':30' : ''} ${
    x < 12 ? 'am' : 'pm'
  }`

const Write = ({ questionCode, onSendAnswer, data, attributeCode, targetCode }) => {
  const [initialStartTime, initialEndTime] = data?.value
    ? safelyParseJson(data?.value, defaultTimeRange)
    : defaultTimeRange

  const [selectedRange, setSelectedRange] = useState([initialStartTime, initialEndTime])

  const handleChange = (idx, value) => {
    const updated = idx
      ? [selectedRange[0], parseFloat(value)]
      : [parseFloat(value), selectedRange[1]]
    onSendAnswer(updated)
    setSelectedRange(updated)
  }

  return (
    <HStack>
      <Select
        test-id={questionCode + '-start'}
        value={selectedRange[0]}
        onChange={e => handleChange(0, e.target.value)}
        placeholder="Start Time"
      >
        {options
          .filter(v => !selectedRange[1] || v < selectedRange[1])
          .map(time => (
            <option key={time} test-id={time} value={time}>{`${getLabel(time)}`}</option>
          ))}
      </Select>
      <Select
        test-id={questionCode + '-to'}
        value={selectedRange[1]}
        onChange={e => handleChange(1, e.target.value)}
        placeholder="Finish Time"
      >
        {options
          .filter(v => !selectedRange[0] || v > selectedRange[0])
          .map(time => (
            <option key={time} test-id={time} value={time}>{`${getLabel(time)}`}</option>
          ))}
      </Select>

      {selectedRange && isNotStringifiedEmptyArray(selectedRange) ? (
        <Text as="p" alignSelf={'flex-end'}>
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        </Text>
      ) : null}
    </HStack>
  )
}

const TimeRange = {
  Write,
  Read,
}

export default TimeRange
