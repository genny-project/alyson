import { Input, Text } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, eligibleAge, journalDateQuestionCode } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import { Grid } from '@chakra-ui/layout'
import Year from './Year'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { isUnionTypeNode } from 'typescript'

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

  const [isPreviousDate, setIsPreviousDate] = useState(true)
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg)
  const [chosenDate, setChosenDate] = useState()
  const [chosenTime, setChosenTime] = useState()

  const includeTime = includes('LocalDateTime', typeName)

  const today = format(new Date(), 'yyyy-MM-dd')

  const chosenDateAndTime =
    chosenDate && chosenTime ? format(new Date(chosenDate), 'yyyy/MM/dd') + ' ' + chosenTime : ''

  const onlyYear = typeName === 'year'

  const handleChange = () => {
    if (!includeTime) {
      !errorStatus && onSendAnswer(safelyParseDate(chosenDate).toISOString())
      dispatchFieldMessage({ payload: questionCode })
    }
    if (chosenDate && chosenTime) {
      setTimeout(() => {
        !errorStatus && onSendAnswer(safelyParseDate(chosenDateAndTime).toISOString())
        dispatchFieldMessage({ payload: questionCode })
      }, 2500)
    }
  }

  useEffect(() => {
    if (chosenDate && chosenTime) handleChange()
  }, [chosenDate, chosenTime, chosenDateAndTime])

  const maxW = useMobileValue(['', '25vw'])

  const isInvalid = getIsInvalid(chosenDateAndTime)(RegExp(regexPattern))

  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(chosenDateAndTime)
  const formatInputDate = chosenDateAndTime
    ? format(new Date(chosenDateAndTime), 'yyyy-MM-dd')
    : today
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
    if (questionCode === 'QUE_JOURNAL_DATE' && chosenDateAndTime) {
      const isDateBefore = isBefore(inputDate, tomorrowsDateInISOFormat)

      isDateBefore ? setIsPreviousDate(true) : setIsPreviousDate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCode, chosenDateAndTime, today])

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
      onClick={() => {
        onSendAnswer(chosenDateAndTime)
        setChosenDate(null)
        setChosenTime(null)
      }}
      date={getDate(data?.value)}
    />
  ) : onlyYear ? (
    <Year questionCode={questionCode} handleChange={handleChange} />
  ) : (
    <>
      <Grid gridTemplateColumns={'1fr 1fr'} gap={'0.75rem'}>
        <Input
          id={questionCode}
          onKeyDown={e => e.preventDefault()}
          test-id={questionCode}
          type={'date'}
          onBlur={handleChange}
          onChange={e => setChosenDate(e.target.value)}
          max={
            questionCode === journalDateQuestionCode
              ? today
              : questionCode === dateOfBirthQuestionCode
              ? today
              : ''
          }
          w="full"
          maxW={maxW}
          paddingBlock={3}
          paddingInline={5}
          fontWeight={'medium'}
          borderColor={'gray.700'}
          _hover={{
            borderColor: 'green.500',
            boxShadow: 'lg',
          }}
          _focusVisible={{
            borderColor: 'green.500',
            boxShadow: 'initial',
          }}
          _invalid={{
            background: 'error.50',
            borderColor: 'error.500',
            color: 'error.500',
          }}
          _disabled={{
            borderColor: 'gray.300',
            background: 'gray.100',
          }}
        />
        {includeTime && (
          <Input
            type={'time'}
            id={questionCode}
            test-id={questionCode}
            onBlur={handleChange}
            onChange={e => setChosenTime(e.target.value)}
            w="full"
            maxW={maxW}
            paddingBlock={3}
            paddingInline={5}
            fontWeight={'medium'}
            borderColor={'gray.700'}
            disabled={!chosenDate}
            _hover={{
              borderColor: 'green.500',
              boxShadow: 'lg',
            }}
            _focusVisible={{
              borderColor: 'green.500',
              boxShadow: 'initial',
            }}
            _invalid={{
              background: 'error.50',
              borderColor: 'error.500',
              color: 'error.500',
            }}
            _disabled={{
              borderColor: 'gray.300',
              background: 'gray.100',
            }}
          />
        )}
      </Grid>
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
