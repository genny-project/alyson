import { useState } from 'react'

import { Read } from '../text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { DateInDay, DateInMonth, DateInYear } from './granularity'

const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

const Write = ({ questionCode, onSendAnswer, data, html }) => {
  const config = safelyParseJson(html, {})
  const { maxDate, granularity = 'date' } = config
  const { startDate: initialStartDate, endDate: initialEndDate } = data?.value
    ? safelyParseJson(data.value, defaultDateRange)
    : {}

  const [dates, setDates] = useState({
    startDate: initialStartDate ? new Date(initialStartDate) : null,
    endDate: initialEndDate ? new Date(initialEndDate) : null,
  })

  const handleDateChange = (e, date) => {
    setDates(dates => ({ ...dates, [date]: e.target.value }))
    onSendAnswer({ ...dates, [date]: e.target.value })
  }

  if (granularity === 'month') {
    return (
      <DateInMonth
        questionCode={questionCode}
        dates={dates}
        maxDate={maxDate}
        handleDateChange={handleDateChange}
      />
    )
  }

  if (granularity === 'year') {
    return (
      <DateInYear
        questionCode={questionCode}
        dates={dates}
        maxDate={maxDate}
        handleDateChange={handleDateChange}
      />
    )
  }

  return (
    <DateInDay
      questionCode={questionCode}
      dates={dates}
      maxDate={maxDate}
      handleDateChange={handleDateChange}
    />
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
