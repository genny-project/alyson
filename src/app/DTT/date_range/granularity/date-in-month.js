import { Input, VStack, Text, Stack } from '@chakra-ui/react'
import DateChip from 'app/DTT/date/DateChip'

import { currentMonthInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForMonth from 'utils/helpers/set-year-for-month'

const DateInMonth = ({
  questionCode,
  dates,
  maxDate = currentMonthInIsoFormat,
  handleDateChange,
}) => {
  return (
    <Stack direction={['column', 'row']} spacing={5}>
      <VStack align="left" spacing={2}>
        <Text>{`Start Date`}</Text>
        {dates.startDate ? (
          <DateChip
            month
            date={dates.startDate}
            onClick={() => handleDateChange(null, 'startDate')}
          />
        ) : (
          <Input
            test-id={questionCode}
            type={'month'}
            onBlur={e => handleDateChange(e, 'startDate')}
            min={setYearForMonth('2000')}
            max={maxDate}
          />
        )}
      </VStack>
      <VStack align="left" spacing={2}>
        <Text>{`End Date`}</Text>
        {dates.endDate ? (
          <DateChip month date={dates.endDate} onClick={() => handleDateChange(null, 'endDate')} />
        ) : (
          <Input
            test-id={questionCode}
            type={'month'}
            onBlur={e => handleDateChange(e, 'endDate')}
            min={setYearForMonth()}
            max={maxDate}
          />
        )}
      </VStack>
    </Stack>
  )
}

export default DateInMonth
