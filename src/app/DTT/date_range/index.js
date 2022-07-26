import { DateInDay, DateInMonth, DateInYear } from './granularity'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HStack } from '@chakra-ui/react'
import { Read } from '../text'
import { compose } from 'ramda'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { newMsg } from 'redux/app'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useDispatch } from 'react-redux'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  html,
  regexPattern,
  attributeCode,
  targetCode,
}) => {
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

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const handleDateChange = (e, date) => {
    if (!e) {
      setDates(dates => ({ ...dates, [date]: null }))
      onSendAnswer({ ...dates, [date]: null })
      dispatchBaseEntityUpdates(attributeCode, targetCode, dates)(onNewMsg)
    } else {
      if (e.target.value) {
        setDates(dates => ({ ...dates, [date]: safelyParseDate(e.target.value) }))
        onSendAnswer({ ...dates, [date]: safelyParseDate(e.target.value).toISOString() })
        dispatchBaseEntityUpdates(attributeCode, targetCode, e.target.value)(onNewMsg)
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
      <HStack justifyContent={'space-between'}>
        <DateInMonth
          questionCode={questionCode}
          dates={dates}
          maxDate={maxDate}
          handleDateChange={handleDateChange}
          errorStatus={errorStatus}
        />

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && dates && isNotStringifiedEmptyArray(dates)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
    )
  }

  if (granularity === 'year') {
    return (
      <HStack justifyContent={'space-between'}>
        <DateInYear
          questionCode={questionCode}
          dates={dates}
          maxDate={maxDate}
          handleDateChange={handleDateChange}
          errorStatus={errorStatus}
        />

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && dates && isNotStringifiedEmptyArray(dates)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
    )
  }

  return (
    <HStack justifyContent={'space-between'}>
      <DateInDay
        questionCode={questionCode}
        dates={dates}
        maxDate={maxDate}
        handleDateChange={handleDateChange}
        errorStatus={errorStatus}
      />

      {(!failedValidation && fieldNotEmpty) ||
      (!failedValidation && dates && isNotStringifiedEmptyArray(dates)) ? (
        <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
      ) : null}
    </HStack>
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
