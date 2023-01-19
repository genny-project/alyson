import 'react-datepicker/dist/react-datepicker.css'
import './datePickerStyles.css'

import { Box, HStack, Input, InputGroup, InputLeftElement, Text, useTheme } from '@chakra-ui/react'
import { dateOfBirthQuestionCode, eligibleAge } from 'utils/constants'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { faCalendarDay, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { forwardRef, useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DateChip from './DateChip'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config'
import getDate from 'utils/helpers/timezone_magic/get-date'
import { getIsInvalid } from 'utils/functions'
import { includes } from 'ramda'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useError } from 'utils/contexts/ErrorContext'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import useGetFieldMessage from 'utils/fieldMessage'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useProductColors from 'utils/productColors'
import ErrorDisplay from 'app/DTT/helpers/error-display'

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
  mandatory,
}) => {
  let initialErrorMsg = 'You can only valid date.'

  const theme = useTheme()
  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  const includeTime = includes('LocalDateTime', typeName)
  const themeSecondary = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.value

  const { dispatch } = useError()

  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const [errorStatus, setErrorStatus] = useState(false)

  const current = new Date()
  const today = format(current, 'yyyy-MM-dd')

  const [isPreviousDate, setIsPreviousDate] = useState(true)
  const [errorMessage, setErrorMessage] = useState(initialErrorMsg)

  const [dateValue, setDateValue] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const onlyYear = typeName === 'year'

  const availabilityQuestions = includes('_AVAILABILITY')(questionCode)

  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const { hasFieldMessage, fieldMessage } = useGetFieldMessage(parentCode, questionCode)

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const handleOnBlur = () => {
    const offsetDate = new Date(dateValue?.getTime() - dateValue?.getTimezoneOffset() * 60000)
    const dateTimeValue = includeTime || onlyYear ? dateValue : offsetDate

    if (dateTimeValue && dateTimeValue.toString() !== 'Invalid Date') {
      setIsFocused(true)

      !errorStatus && onSendAnswer(safelyParseDate(dateTimeValue).toISOString())
      dispatchFieldMessage({ payload: questionCode })
    } else {
      setIsFocused(false)
    }
  }

  const isInvalid = getIsInvalid(dateValue)(RegExp(regexPattern))

  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(dateValue)
  const formatInputDate = dateValue ? format(inputDate, 'yyyy-MM-dd') : today
  const diffInYears = differenceInYears(parseISO(today), parseISO(formatInputDate))

  const prodocutBasedDatepickerClass = apiConfig?.clientId
  const selectedDateInIsoFormat = !!dateValue ? safelyParseDate(dateValue).toISOString() : ''

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
      setErrorMessage('You cannot choose future date.')
    }
  }, [isPreviousDate])

  useEffect(() => {
    if (questionCode === dateOfBirthQuestionCode) {
      if (diffInYears < eligibleAge) {
        setErrorStatus(true)
        setErrorMessage(`Age cannot be less than ${eligibleAge} years.`)
      } else {
        setErrorStatus(false)
      }
    }
  }, [diffInYears, questionCode])

  useEffect(() => {
    dateValue ? setIsFocused(true) : setIsFocused(false)
  }, [dateValue])

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <InputGroup role="group">
      <Input
        id={questionCode}
        test-id={questionCode}
        defaultValue={value}
        ref={ref}
        onFocus={() => {
          setIsFocused(true)
          onClick()
        }}
        w="full"
        h={'auto'}
        paddingBlock={3}
        paddingStart={isFocused ? 6 : 12}
        paddingEnd={6}
        bg={fieldBackgroundColor}
        borderRadius={borderRadius}
        borderColor={fieldBorderColor}
        fontSize={'sm'}
        fontWeight={'medium'}
        color={fieldTextColor}
        cursor={'pointer'}
        _hover={{
          borderColor: fieldHoverBorderColor,
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
          borderColor: 'transparent',
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
        _groupfocusvisible={{
          color: themeSecondary,
        }}
        children={<FontAwesomeIcon icon={faCalendarDay} color={'inherit'} />}
      />
    </InputGroup>
  ))

  return isPreviousDate && data?.value && dateValue ? (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={isFocused ? 6 : 12}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <Text as="span" color={'red.500'} ml={1}>
                *
              </Text>
            ) : (
              <></>
            )}
          </Text>
        )}

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && dateValue && isNotStringifiedEmptyArray(dateValue)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
      <DateChip
        onlyYear={onlyYear}
        includeTime={includeTime}
        onClick={() => {
          onSendAnswer('')
          setDateValue('')
        }}
        date={getDate(selectedDateInIsoFormat || '')}
      />
    </Box>
  ) : data?.value ? (
    <DateChip
      onlyYear={onlyYear}
      includeTime={includeTime}
      onClick={() => {
        onSendAnswer('')
        setDateValue('')
      }}
      date={getDate(data?.value || '')}
    />
  ) : (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={12}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholderName && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            {placeholderName}
            {mandatory ? (
              <Text as="span" color={'red.500'} ml={1}>
                *
              </Text>
            ) : (
              <></>
            )}
          </Text>
        )}

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && dateValue && isNotStringifiedEmptyArray(dateValue)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <DatePicker
        selected={dateValue}
        showTimeSelect={includeTime}
        onChange={date => setDateValue(date)}
        dateFormat={includeTime ? 'yyyy/MM/dd h:mm' : onlyYear ? 'yyyy' : 'yyyy/MM/dd'}
        customInput={<DateInput />}
        onCalendarClose={handleOnBlur}
        minDate={availabilityQuestions ? current : ''}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        showYearPicker={onlyYear}
        calendarClassName={`${prodocutBasedDatepickerClass}__calendar`}
      />

      <ErrorDisplay
        hasErrorMessage={hasErrorMessage}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
      />
    </Box>
  )
}

const DatePickerComponent = {
  Write,
  Read,
}

export default DatePickerComponent
