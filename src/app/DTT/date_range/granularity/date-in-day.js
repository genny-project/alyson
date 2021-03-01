import { Input, HStack, VStack, Text } from '@chakra-ui/react'

import { currentDateInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForDate from 'utils/helpers/set-year-for-date'

const DateInDay = ({ questionCode, dates, maxDate = currentDateInIsoFormat, handleDateChange }) => {
  return (
    <HStack spacing={5}>
      <VStack align="left" spacing={2}>
        <Text>{`Start Date`}</Text>
        <Input
          test-id={questionCode}
          type={'date'}
          defaultValue={dates.startDate}
          onBlur={e => handleDateChange(e, 'startDate')}
          min={setYearForDate('2002')}
          max={maxDate}
        />
      </VStack>
      <VStack align="left" spacing={2}>
        <Text>{`End Date`}</Text>
        <Input
          test-id={questionCode}
          type={'date'}
          defaultValue={dates.endDate}
          onBlur={e => handleDateChange(e, 'endDate')}
          min={setYearForDate()}
          max={maxDate}
        />
      </VStack>
    </HStack>
  )
}

export default DateInDay
