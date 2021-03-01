import { HStack, VStack, Text, IconButton, Select } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { currentYearInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import { map } from 'ramda'

const getAllYears = minYear => maxYear => (allYear = []) => {
  if (maxYear >= minYear) {
    allYear.push(minYear)
    return getAllYears(minYear + 1)(maxYear)(allYear)
  }
  return allYear
}

const DateInYear = ({
  questionCode,
  dates,
  maxDate = currentYearInIsoFormat,
  handleDateChange,
  handleClearDate,
}) => {
  return (
    <div>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          <Select placeholder="Select Year" test-id={questionCode}>
            {map(individualYear => (
              <option key={`${questionCode}-${individualYear}`}>{individualYear}</option>
            ))(getAllYears(1999)(2019)([]))}
          </Select>
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          <Select placeholder="Select Year" test-id={questionCode}>
            {map(individualYear => (
              <option key={`${questionCode}-${individualYear}`}>{individualYear}</option>
            ))(getAllYears(2002)(2022)([]))}
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
