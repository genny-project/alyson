import { Input, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import todaysDateInIsoFormat from 'utils/helpers/todays-date-in-iso-format'
import setYearForDate from 'utils/helpers/set-year-for-date'

const DateInDay = ({ questionCode, dates, handleDateChange, handleClearDate }) => {
  return (
    <div>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          <Input
            test-id={questionCode}
            type={'date'}
            defaultValue={dates.startDate}
            onBlur={e => handleDateChange(e, 'startDate')}
            min={setYearForDate('2002')}
            max={todaysDateInIsoFormat}
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
            max={todaysDateInIsoFormat}
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

export default DateInDay
