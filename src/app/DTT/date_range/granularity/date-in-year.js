import { HStack, VStack, Text, IconButton, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { currentYearInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import { map } from 'ramda'

const yearRange = (years = 100) =>
  Array.from(Array(years), (_, idx) => currentYearInIsoFormat - idx)

const DateInYear = ({ questionCode, handleDateChange, handleClearDate }) => {
  return (
    <div>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          <Select
            placeholder="Select Year"
            test-id={questionCode}
            onChange={e => handleDateChange(e, 'startDate')}
          >
            {map(individualYear => (
              <option key={`${questionCode}-${individualYear}`} value={individualYear}>
                {individualYear}
              </option>
            ))(yearRange())}
          </Select>
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          <Select
            placeholder="Select Year"
            test-id={questionCode}
            onChange={e => handleDateChange(e, 'endDate')}
          >
            {map(individualYear => (
              <option key={`${questionCode}-${individualYear}`} value={individualYear}>
                {individualYear}
              </option>
            ))(yearRange())}
          </Select>
        </VStack>
        <IconButton
          icon={<FontAwesomeIcon size="sm" icon={faTimesCircle} />}
          onClick={handleClearDate}
        />
      </HStack>
    </div>
  )
}

export default DateInYear
