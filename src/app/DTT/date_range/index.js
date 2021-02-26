import { useState } from 'react'
import moment from 'moment'
import { Input, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Read } from '../text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import todaysDateInIsoFormat from 'utils/helpers/todays-date-in-iso-format'
import setYearForDate from 'utils/helpers/set-year-for-date'

const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}
const Write = ({ questionCode, onSendAnswer, data }) => {
  const { startDate: initialStartDate, endDate: initialEndDate } = data?.value
    ? safelyParseJson(data.value, defaultDateRange)
    : {}

  const [dates, setDates] = useState({
    startDate: initialStartDate ? moment(initialStartDate) : null,
    endDate: initialEndDate ? moment(initialEndDate) : null,
  })

  const handleDateChange = (e, date) => {
    setDates(dates => ({ ...dates, [date]: e.target.value }))
    onSendAnswer({ ...dates, [date]: e.target.value })
  }

  const handleClearDate = () => {
    onSendAnswer({ ...dates, startDate: null, endDate: null })
  }

  return (
    <div>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          <Input
            test-id={questionCode}
            type={`date`}
            defaultValue={dates.startDate}
            onBlur={e => handleDateChange(e, 'startDate')}
            min={setYearForDate()}
            max={todaysDateInIsoFormat}
          />
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          <Input
            test-id={questionCode}
            type={`date`}
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
const DateRange = {
  Write,
  Read,
}

export default DateRange
