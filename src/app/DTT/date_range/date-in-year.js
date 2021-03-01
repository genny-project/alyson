import { Input, HStack, VStack, Text, IconButton, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import todaysYearInIsoFormat from 'utils/helpers/todays-year-in-iso-format'
import setYearForMonth from 'utils/helpers/set-year-for-month'
import { map } from 'ramda'

var allYear = []
const getAllYears = minYear => {
  const maxYear = 2021
  if (maxYear > minYear) {
    allYear.push(minYear)
    getAllYears(minYear + 1)
  }
  return allYear
}

const DateInYear = ({
  questionCode,
  dates,
  maxDate = todaysYearInIsoFormat,
  handleDateChange,
  handleClearDate,
}) => {
  return (
    <div>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          <Select placeholder="Select option">
            {map(individualYear => <option>{individualYear}</option>)(getAllYears(2000))}
          </Select>
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          <Input
            test-id={questionCode}
            type={'number'}
            step="1"
            defaultValue={dates.endDate || maxDate}
            onBlur={e => handleDateChange(e, 'startDate')}
            min="1900"
            max="2099"
          />
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
