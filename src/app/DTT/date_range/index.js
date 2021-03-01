import { useState } from 'react'
import moment from 'moment'
import { Input, HStack, VStack, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Read } from '../text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import todaysDateInIsoFormat from 'utils/helpers/todays-date-in-iso-format'
import todaysMonthInIsoFormat from 'utils/helpers/todays-month-in-iso-format'
import setYearForDate from 'utils/helpers/set-year-for-date'
import setYearForMonth from 'utils/helpers/set-year-for-month'

const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

const Write = ({ questionCode, onSendAnswer, data, html }) => {
  const config = safelyParseJson(html, {})

  const { maxDate, granularity = 'month' } = config

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

  if (granularity === 'day') {
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

  if (granularity === 'month') {
    return (
      <div>
        <div>
          <HStack spacing={5}>
            <VStack align="left" spacing={2}>
              <Text>{`Start Date`}</Text>
              <Input
                test-id={questionCode}
                type={'month'}
                defaultValue={dates.startDate || todaysMonthInIsoFormat}
                onBlur={e => handleDateChange(e, 'startDate')}
                min={setYearForMonth('2002')}
                max={todaysMonthInIsoFormat}
              />
            </VStack>
            <VStack align="left" spacing={2}>
              <Text>{`End Date`}</Text>
              <Input
                test-id={questionCode}
                type={'month'}
                defaultValue={dates.endDate || todaysMonthInIsoFormat}
                onBlur={e => handleDateChange(e, 'endDate')}
                min={setYearForMonth()}
                max={todaysMonthInIsoFormat}
              />
            </VStack>
            <IconButton
              icon={<FontAwesomeIcon size="sm" icon={faTimesCircle} />}
              onClick={handleClearDate}
            />
          </HStack>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <HStack spacing={5}>
          <VStack align="left" spacing={2}>
            <Text>{`Start Date`}</Text>
            <Input
              test-id={questionCode}
              type={'month'}
              defaultValue={dates.startDate || '2018-05'}
              onBlur={e => handleDateChange(e, 'startDate')}
              min={setYearForMonth('2002')}
              max={todaysDateInIsoFormat}
            />
          </VStack>
          <VStack align="left" spacing={2}>
            <Text>{`End Date`}</Text>
            <Input
              test-id={questionCode}
              type={'month'}
              defaultValue={dates.endDate}
              onBlur={e => handleDateChange(e, 'endDate')}
              min={setYearForMonth()}
              max={todaysDateInIsoFormat}
            />
          </VStack>
          <IconButton
            icon={<FontAwesomeIcon size="sm" icon={faTimesCircle} />}
            onClick={handleClearDate}
          />
        </HStack>
      </div>
    </div>
  )
}
const DateRange = {
  Write,
  Read,
}

export default DateRange
