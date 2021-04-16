import { useState } from 'react'

import { Read } from '../text'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { DateInDay, DateInMonth, DateInYear } from './granularity'
import safelyParseDate from 'utils/helpers/safely-parse-date'

const defaultDateRange = {
  startDate: '',
  endDate: '',
}

const Write = ({ questionCode, onSendAnswer, data, html }) => {
  const config = safelyParseJson(html, {})
  const { maxDate, granularity = 'date' } = config
  const { startDate, endDate } = data?.value ? safelyParseJson(data.value, defaultDateRange) : {}

  const [dates, setDates] = useState({
    startDate: safelyParseDate(startDate),
    endDate: safelyParseDate(endDate),
  })

  const handleDateChange = (e, date) => {
    if (!e) {
      setDates(dates => ({ ...dates, [date]: null }))
      onSendAnswer({ ...dates, [date]: null })
    } else {
      setDates(dates => ({ ...dates, [date]: safelyParseDate(e.target.value) }))
      onSendAnswer({ ...dates, [date]: safelyParseDate(e.target.value).toISOString() })
    }
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
