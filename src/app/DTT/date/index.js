import { Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import Year from './Year'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { isBefore } from 'date-fns'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data, typeName, config }) => {
  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  if (!data.value) return null

  const date = timeBasedOnTimeZone(
    includes('Z', data.value || '') ? new Date(data.value) : new Date(data.value + 'Z'),
    { includeTime, onlyYear },
  )

  if (date === 'Invalid Date') return null
  return (
    <Text minW="4rem" {...config}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName, regex, dtType }) => {
  const regexPattern = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/

  const [errorStatus, setErrorStatus] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Please select a valid date.')
  const [isCurrentDay, setIsCurrentDay] = useState(true)

  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => onSendAnswer(safelyParseDate(e.target.value).toISOString())

  const maxW = useMobileValue(['', '25vw'])

  const isInvalid = getIsInvalid(data?.value)(regexPattern)
  const { dispatch } = useError()

  const today = new Date()
  const inputDate = new Date(data?.value)

  useEffect(() => {
    if (dtType === 'DTT_PAST_DATE') {
      const isDateBefore = isBefore(inputDate, today)
      setIsCurrentDay(isDateBefore)
    }

    if (!isCurrentDay) {
      setErrorStatus(true)
      setErrorMsg('Logbook for current date cannot be added.')
    }
  }, [inputDate, errorStatus, today, questionCode])

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ ttype: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  return isCurrentDay && data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => onSendAnswer('')}
      date={getDate(data?.value)}
    />
  ) : onlyYear ? (
    <Year questionCode={questionCode} handleChange={handleChange} />
  ) : (
    <>
      <Input
        test-id={questionCode}
        type={includeTime ? 'datetime-local' : 'date'}
        onBlur={handleChange}
        w="full"
        maxW={maxW}
      />
      {errorStatus && (
        <Text textStyle="tail.error" mt={2}>
          {errorMsg}
        </Text>
      )}
    </>
  )
}

const DatePicker = {
  Write,
  Read,
}

export default DatePicker
