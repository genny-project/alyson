import { useState } from 'react'
import moment from 'moment'

import { Read } from '../text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import DateInDay from './date-in-day'
import DateInMonth from './date-in-month'

const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

const Write = ({ questionCode, onSendAnswer, data, html }) => {
  const config = safelyParseJson(html, {})

  const { maxDate, granularity = 'day' } = config

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

  if (granularity === 'month') {
    return (
      <DateInMonth
        questionCode={questionCode}
        dates={dates}
        handleDateChange={handleDateChange}
        handleClearDate={handleClearDate}
      />
    )
  }

  return (
    <DateInDay
      questionCode={questionCode}
      dates={dates}
      handleDateChange={handleDateChange}
      handleClearDate={handleClearDate}
    />
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
