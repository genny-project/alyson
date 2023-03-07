import 'react-datepicker/dist/react-datepicker.css'
import './datePickerStyles.scss'

import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { faCalendarDay, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { differenceInYears, format, isBefore, parseISO, startOfTomorrow } from 'date-fns'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { dateOfBirthQuestionCode, eligibleAge } from 'utils/constants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import useClearFieldMessage from 'app/DTT/helpers/clear-field-message'
import ErrorDisplay from 'app/DTT/helpers/error-display'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { includes } from 'ramda'
import DatePicker from 'react-datepicker'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import useGetFieldMessage from 'utils/fieldMessage'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import getDate from 'utils/helpers/timezone_magic/get-date'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'
import { useIsMobile } from 'utils/hooks'
import useProductColors from 'utils/productColors'
import DateChip from './DateChip'

const Read = ({ data, typeName = '', config }) => {
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
  typeName = '',
  regexPattern,
  parentCode,
  attributeCode,
  placeholderName,
  mandatory,
}) => {
  let initialErrorMsg = 'You can only valid date.'

  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  const isMobile = useIsMobile()

  const { labelTextColor } = useProductColors()

  const includeTime = includes('LocalDateTime', typeName)
  const themeSecondary = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.value

  const labelRef = useRef()

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
  const handleClearFieldMessage = useClearFieldMessage(parentCode, attributeCode, questionCode)

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]

  const handleOnBlur = () => {
    const offsetDate = new Date(dateValue?.getTime() - dateValue?.getTimezoneOffset() * 60000)
    const dateTimeValue = includeTime || onlyYear ? dateValue : offsetDate

    if (dateTimeValue && dateTimeValue.toString() !== 'Invalid Date') {
      setIsFocused(true)

      !errorStatus && onSendAnswer(safelyParseDate(dateTimeValue).toISOString())
      dispatchFieldMessage({ payload: questionCode })
      hasFieldMessage && handleClearFieldMessage()
    } else {
      setIsFocused(false)
    }
  }

  const isInvalid = getIsInvalid(dateValue)(RegExp(regexPattern))

  const tomorrowsDateInISOFormat = startOfTomorrow(today)
  const inputDate = new Date(dateValue)
  const formatInputDate = dateValue ? format(inputDate, 'yyyy-MM-dd') : today
  const diffInYears = differenceInYears(parseISO(today), parseISO(formatInputDate))

  const selectedDateInIsoFormat = !!dateValue ? safelyParseDate(dateValue).toISOString() : ''

  const hasValidData = dateValue && !isInvalid
  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

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
        required={true}
        paddingBlock={3}
        paddingInlineStart={isFocused || isProductInternMatch ? 6 : 12}
        paddingInlineEnd={6}
        {...inputStyles}
      />

      {isProductInternMatch ? (
        <InputRightElement
          mt="2px"
          ml={3}
          color={`${realm}.primary`}
          pointerEvents="none"
          _groupHover={{
            color: themeSecondary,
          }}
          _groupfocusvisible={{
            color: themeSecondary,
          }}
          children={<FontAwesomeIcon icon={faCalendarDay} color={'inherit'} />}
        />
      ) : (
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
      )}
    </InputGroup>
  ))

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <HStack
        ref={labelRef}
        paddingStart={isProductInternMatch ? 6 : 12}
        {...labelStyles}
        top={isFocused ? `calc(-${labelRef?.current?.clientHeight}px - .25rem)` : 4}
      >
        {placeholderName && (
          <MandatorySymbol
            placeholderName={placeholderName}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
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
        calendarClassName={`${realm}__calendar`}
      />

      <ErrorDisplay
        hasErrorMessage={hasErrorMessage}
        errorStatus={errorStatus}
        errorMessage={errorMessage}
        fieldMessage={fieldMessage}
        hasFieldMessage={hasFieldMessage}
        realm={realm}
        isProductIM={isProductInternMatch}
      />
    </Box>
  )
}

const DatePickerComponent = {
  Write,
  Read,
}

export default DatePickerComponent
