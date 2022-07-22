import 'react-datepicker/dist/react-datepicker.css'
import './datePickerStyles.css'

import { Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, eligibleAge } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { forwardRef, useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import { selectFieldMessage } from 'redux/app/selectors'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
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
    <Text minW="10rem" {...config}>
      {date}
    </Text>
  )
}

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  typeName,
  regexPattern,
  parentCode,
  placeholderName,
}) => {
  let initialErrorMsg = 'You can only valid date.'

  const includeTime = includes('LocalDateTime', typeName)
  const themeSecondary = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.value

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
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMsg)

  const handleOnBlur = () => {
    const offsetDate = new Date(dateValue?.getTime() - dateValue?.getTimezoneOffset() * 60000)
    const dateTimeValue = includeTime || onlyYear ? dateValue : offsetDate

    if (dateTimeValue && dateTimeValue.toString() !== 'Invalid Date') {
      !errorStatus && onSendAnswer(safelyParseDate(dateTimeValue).toISOString())
      dispatchFieldMessage({ payload: questionCode })
    }
  }

  const isInvalid = getIsInvalid(dateValue)(RegExp(regexPattern))

  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(dateValue)
  const formatInputDate = dateValue ? format(inputDate, 'yyyy-MM-dd') : today
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
    <InputGroup role="group">
      <Input
        id={questionCode}
        test-id={questionCode}
        defaultValue={value}
        ref={ref}
        onFocus={onClick}
        placeholder={placeholderName}
        w="full"
        h={'auto'}
        paddingBlock={3}
        paddingInlineStart={10}
        paddingInlineEnd={6}
        bg={'product.gray'}
        borderRadius="calc(0.25rem - 1px)"
        borderColor={'product.gray'}
        fontSize={'sm'}
        fontWeight={'medium'}
        color="product.darkGray"
        cursor={'pointer'}
        _hover={{
          borderColor: 'product.gray',
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'product.secondary',
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
      <InputLeftElement
        mt="2px"
        ml={3}
        color={value ? themeSecondary : 'gray.600'}
        pointerEvents="none"
        _groupHover={{
          color: themeSecondary,
        }}
        _groupFocusVisible={{
          color: themeSecondary,
        }}
        children={<FontAwesomeIcon icon={faCalendarDay} color={'inherit'} />}
      />
    </InputGroup>
  ))

  return isPreviousDate && data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => {
        onSendAnswer(onlyYear ? '' : dateValue)
      }}
      date={getDate(data?.value)}
    />
  ) : (
    <>
      <DatePicker
        selected={dateValue}
        showTimeSelect={includeTime}
        onChange={date => setDateValue(date)}
        dateFormat={includeTime ? 'yyyy/MM/dd h:mm' : onlyYear ? 'yyyy' : 'yyyy/MM/dd'}
        customInput={<CustomInput />}
        onCalendarClose={handleOnBlur}
        minDate={availabilityQuestions ? current : ''}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showYearPicker={onlyYear}
      />

      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <Text textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMsg}
            </Text>
          )}
        </VStack>
      )}
    </>
  )
}

const DatePickerComponent = {
  Write,
  Read,
}

export default DatePickerComponent
