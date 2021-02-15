import React, { useState } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { compose, multiply, subtract, __ } from 'ramda'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { DATE_FORMAT } from 'utils/constants'
import { Read } from '../text'

const defaultDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

const durationIntoNights = compose(subtract(__, 3), multiply(7), parseInt)

const returnYears = () => {
  let years = []
  for (let i = moment().year() - 100; i <= moment().year(); i++) {
    years.push(<option value={i}>{i}</option>)
  }
  return years
}

const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
      <select value={month.month()} onChange={e => onMonthSelect(month, e.target.value)}>
        {moment.months().map((label, value) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
    <div>
      <select value={month.year()} onChange={e => onYearSelect(month, e.target.value)}>
        {returnYears()}
      </select>
    </div>
  </div>
)

const Write = ({ onSendAnswer, data, html }) => {
  const { duration } = safelyParseJson(html, {})

  const { startDate: initialStartDate, endDate: initialEndDate } = data?.value
    ? safelyParseJson(data.value, defaultDateRange)
    : {}

  const [focusedInput, setFocusedInput] = useState(null)

  const [dates, setDates] = useState({
    startDate: initialStartDate ? moment(initialStartDate) : null,
    endDate: initialEndDate ? moment(initialEndDate) : null,
  })

  const onDatesChange = selection => {
    setDates(selection)
    onSendAnswer(selection)
  }

  return (
    <DateRangePicker
      displayFormat={DATE_FORMAT}
      startDate={dates.startDate}
      startDateId="start_date_id"
      endDate={dates.endDate}
      endDateId="end_date_id"
      onDatesChange={onDatesChange}
      focusedInput={focusedInput}
      onFocusChange={setFocusedInput}
      isOutsideRange={() => false}
      renderMonthElement={renderMonthElement}
      withPortal
      showClearDates
      minimumNights={duration ? durationIntoNights(duration) : false}
    />
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
