import { DateInDay, DateInMonth, DateInYear } from './granularity'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { Read } from '../text'
import { getIsInvalid } from 'utils/functions'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useError } from 'utils/contexts/ErrorContext'

const Write = ({ questionCode, onSendAnswer, data, html, regexPattern }) => {
  const config = safelyParseJson(html, {})
  const { maxDate, granularity = 'date' } = config
  const { startDate, endDate } = data?.value ? safelyParseJson(data.value, {}) : {}

  const [dates, setDates] = useState({
    startDate: startDate ? safelyParseDate(startDate) : '',
    endDate: endDate ? safelyParseDate(endDate) : '',
  })

  const [errorStatus, setErrorStatus] = useState(false)

  const { dispatch } = useError()
  const isInvalid = getIsInvalid(dates)(RegExp(regexPattern))

  const handleDateChange = (e, date) => {
    if (!e) {
      setDates(dates => ({ ...dates, [date]: null }))
      onSendAnswer({ ...dates, [date]: null })
    } else {
      if (e.target.value) {
        setDates(dates => ({ ...dates, [date]: safelyParseDate(e.target.value) }))
        onSendAnswer({ ...dates, [date]: safelyParseDate(e.target.value).toISOString() })
      }
    }
  }

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  if (granularity === 'month') {
    return (
      <DateInMonth
        questionCode={questionCode}
        dates={dates}
        maxDate={maxDate}
        handleDateChange={handleDateChange}
        errorStatus={errorStatus}
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
        errorStatus={errorStatus}
      />
    )
  }

  return (
    <DateInDay
      questionCode={questionCode}
      dates={dates}
      maxDate={maxDate}
      handleDateChange={handleDateChange}
      errorStatus={errorStatus}
    />
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
