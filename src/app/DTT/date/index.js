import 'react-datepicker/dist/react-datepicker.css'

import { Input, Text } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, eligibleAge } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { forwardRef, useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import DatePicker from 'react-datepicker'
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

  const includeTime = includes('LocalDateTime', typeName)

  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [errorStatus, setErrorStatus] = useState(false)

  const current = new Date()
  const today = format(current, 'yyyy-MM-dd')

  const [isPreviousDate, setIsPreviousDate] = useState(true)
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg)

  const [dateValue, setDateValue] = useState(null)

  const onlyYear = typeName === 'year'

  const availabilityQuestions = includes('_AVAILABILITY')(questionCode)

  const handleOnBlur = () => {
    const offsetDate = new Date(dateValue?.getTime() - dateValue?.getTimezoneOffset() * 60000)

    const dateTimeValue = includeTime ? dateValue : offsetDate
    if (dateTimeValue) {
      !errorStatus && onSendAnswer(safelyParseDate(dateTimeValue).toISOString())
      dispatchFieldMessage({ payload: questionCode })
    }
  }

  const maxW = useMobileValue(['', '25vw'])

  const isInvalid = getIsInvalid(dateValue)(RegExp(regexPattern))

  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(dateValue)
  const formatInputDate = dateValue ? format(new Date(dateValue), 'yyyy-MM-dd') : today
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
    if (questionCode === 'QUE_JOURNAL_DATE' && dateValue) {
      const isDateBefore = isBefore(inputDate, tomorrowsDateInISOFormat)

      isDateBefore ? setIsPreviousDate(true) : setIsPreviousDate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCode, dateValue, today])

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

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      id={questionCode}
      test-id={questionCode}
      w="full"
      maxW={maxW}
      paddingBlock={3}
      paddingInline={5}
      fontWeight={'medium'}
      borderColor={'gray.700'}
      defaultValue={value}
      ref={ref}
      onFocus={onClick}
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
      required={true}
    />
  ))

  return isPreviousDate && data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => {
        onSendAnswer(dateValue)
      }}
      date={getDate(data?.value)}
    />
  ) : onlyYear ? (
    <Year questionCode={questionCode} handleChange={handleOnBlur} />
  ) : (
    <>
      <DatePicker
        selected={dateValue}
        showTimeSelect={includeTime}
        onChange={date => setDateValue(date)}
        dateFormat={includeTime ? 'yyyy/MM/dd h:mm' : 'yyyy/MM/dd'}
        customInput={<CustomInput />}
        onCalendarClose={handleOnBlur}
        minDate={availabilityQuestions ? current : ''}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />

      {errorStatus && (
        <Text textStyle="tail.error" mt={2}>
          {errorMsg}
        </Text>
      )}
    </>
  )
}

const DatePickerComponent = {
  Write,
  Read,
}

export default DatePickerComponent
