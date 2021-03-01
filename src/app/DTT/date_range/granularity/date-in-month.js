import { Input, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { currentMonthInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForMonth from 'utils/helpers/set-year-for-month'

const DateInMonth = ({
  questionCode,
  dates,
  maxDate = currentMonthInIsoFormat,
  handleDateChange,
  handleClearDate,
}) => {
  return (
    <div>
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
        <IconButton
          icon={<FontAwesomeIcon size="sm" icon={faTimesCircle} />}
          onClick={handleClearDate}
        />
      </HStack>
    </div>
  )
}

export default DateInMonth
