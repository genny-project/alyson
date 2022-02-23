import { Input, Text } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, eligibleAge, journalDateQuestionCode } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import Year from './Year'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
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
    <Text minW="10rem" {...config}>
      {date}
    </Text>
  )
}
const Write = ({ questionCode, data, onSendAnswer, typeName, regexPattern, question }) => {
  let initialErrorMsg = 'You can only valid date.'
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const [isPreviousDate, setIsPreviousDate] = useState(true)
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg)

  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => {
    if(e.target.value){
    !errorStatus && onSendAnswer(safelyParseDate(e.target.value).toISOString())
    dispatchFieldMessage({ payload: questionCode })
    }
  }

  const maxW = useMobileValue(['full', '100%'])

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))

  const today = format(new Date(), 'yyyy-MM-dd')
  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(userInput)
  const formatInputDate = userInput ? format(new Date(userInput), 'yyyy-MM-dd') : today
  const diffInYears = differenceInYears(parseISO(today), parseISO(formatInputDate))

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  useEffect(() => {
    if (questionCode === 'QUE_JOURNAL_DATE' && userInput) {
      const isDateBefore = isBefore(inputDate, tomorrowsDateInISOFormat)

      isDateBefore ? setIsPreviousDate(true) : setIsPreviousDate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCode, userInput, today])

  useEffect(() => {
    if (!isPreviousDate) {
      setErrorStatus(true)
      setErrorMsg('You cannot choose future date.')
    }
  }, [isPreviousDate])

  useEffect(() => {
    if (questionCode === dateOfBirthQuestionCode) {
      if (diffInYears < eligibleAge) {
        setErrorStatus(true)
        setErrorMsg(`Age cannot be less than ${eligibleAge} years.`)
      } else {
        setErrorStatus(false)
      }
    }
  }, [diffInYears, questionCode])

  return isPreviousDate && data?.value ? (
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
        id={questionCode}
        onKeyDown={e => e.preventDefault()}
        test-id={questionCode}
        type={includeTime ? 'datetime-local' : 'date'}
        onBlur={handleChange}
        onChange={e => setuserInput(e.target.value)}
        w="full"
        maxW={maxW}
        max={
          questionCode === journalDateQuestionCode
            ? today
            : questionCode === dateOfBirthQuestionCode
            ? today
            : ''
        }
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
