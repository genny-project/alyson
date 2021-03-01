import { Input, HStack, VStack, Text } from '@chakra-ui/react'

import { currentMonthInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForMonth from 'utils/helpers/set-year-for-month'

const DateInMonth = ({
  questionCode,
  dates,
  maxDate = currentMonthInIsoFormat,
  handleDateChange,
}) => {
  return (
    <HStack spacing={5}>
      <VStack align="left" spacing={2}>
        <Text>{`Start Date`}</Text>
        <Input
          test-id={questionCode}
          type={'month'}
          defaultValue={dates.startDate || currentMonthInIsoFormat}
          onBlur={e => handleDateChange(e, 'startDate')}
          min={setYearForMonth('2000')}
          max={maxDate}
        />
      </VStack>
      <VStack align="left" spacing={2}>
        <Text>{`End Date`}</Text>
        <Input
          test-id={questionCode}
          type={'month'}
          defaultValue={dates.endDate || currentMonthInIsoFormat}
          onBlur={e => handleDateChange(e, 'endDate')}
          min={setYearForMonth()}
          max={maxDate}
        />
      </VStack>
    </HStack>
  )
}

export default DateInMonth
