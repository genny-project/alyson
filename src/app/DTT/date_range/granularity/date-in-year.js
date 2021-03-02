import { HStack, VStack, Text, Select } from '@chakra-ui/react'
import { map } from 'ramda'

import yearRange from 'utils/helpers/get-years-range'

const DateInYear = ({ questionCode, handleDateChange, handleClearDate }) => {
  return (
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
    </HStack>
  )
}

export default DateInYear
