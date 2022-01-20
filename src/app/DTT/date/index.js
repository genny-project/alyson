import { Input, Text } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, journalDateQuestionCode } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { includes, isEmpty } from 'ramda'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import Year from './Year'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import { selectCode } from 'redux/db/selectors'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

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
const Write = ({ questionCode, data, onSendAnswer, typeName, regexPattern, setSaving }) => {
  let initialErrorMsg = 'You can only valid date.'

  const { dispatch } = useError()
  const [errorStatus, setErrorStatus] = useState(false)
  const [userInput, setuserInput] = useState(data?.value)
  const [isPreviousDate, setIsPreviousDate] = useState(true)
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg)

  const includeTime = includes('LocalDateTime', typeName)
  const onlyYear = typeName === 'year'

  const handleChange = e => {
    e.target.value && !errorStatus && onSendAnswer(safelyParseDate(e.target.value).toISOString())
    isEmpty(e.target.value) ? setSaving.off() : setSaving.on()
  }

  const maxW = useMobileValue(['', '25vw'])

  const isInvalid = getIsInvalid(userInput)(RegExp(regexPattern))

  const today = format(new Date(), 'yyyy-MM-dd')
  const tomorrowsDateInISOFormat = startOfTomorrow(today)

  const inputDate = new Date(userInput)

  const eligibleAge = 18

  const code = useSelector(selectCode('USER'))

  const diffInYears = differenceInYears(parseISO(today), parseISO(format(inputDate, 'yyyy-MM-dd')))
  console.log(diffInYears)

  const userEligibility = useSelector(selectCode(code, ['PRI_ELIGIBLE']))?.value
  console.log('userEligibility => ', userEligibility)

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
    if (!userEligibility) {
      setErrorStatus(true)
      setErrorMsg(`Age cannot be less than ${eligibleAge} years.`)
    }
  }, [userEligibility])

  return isPreviousDate && data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => {
        onSendAnswer('')
        setSaving.off()
      }}
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
        onChange={e => setuserInput(e.target.value)}
        w="full"
        maxW={maxW}
        max={questionCode === (dateOfBirthQuestionCode || journalDateQuestionCode) ? today : ''}
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
