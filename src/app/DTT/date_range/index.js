import { Box, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { DateInDay, DateInMonth, DateInYear } from './granularity'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import safelyParseDate from 'utils/helpers/safely-parse-date'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useProductColors from 'utils/productColors'
import { Read } from '../text'

const Write = ({
  questionCode,
  onSendAnswer,
  data,
  html,
  regexPattern,
  placeholder,
  mandatory,
}) => {
  const { labelTextColor } = useProductColors()

  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()

  const config = safelyParseJson(html, {})
  const { maxDate, granularity = 'date' } = config
  const { startDate, endDate } = data?.value ? safelyParseJson(data.value, {}) : {}

  const [dates, setDates] = useState({
    startDate: startDate ? safelyParseDate(startDate) : '',
    endDate: endDate ? safelyParseDate(endDate) : '',
  })

  const [errorStatus, setErrorStatus] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { dispatch } = useError()
  const isInvalid = getIsInvalid(dates)(RegExp(regexPattern))

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const hasValidData = dates && !isInvalid
  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

  const handleDateChange = (e, date) => {
    if (!e) {
      dates ? setIsFocused(true) : setIsFocused(false)
      setDates(dates => ({ ...dates, [date]: null }))
      onSendAnswer({ ...dates, [date]: null })
    } else {
      if (e.target.value) {
        e.target.value ? setIsFocused(true) : setIsFocused(false)
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

  useEffect(() => {
    dates ? setIsFocused(true) : setIsFocused(false)
  }, [dates])

  const FieldLabel = ({ placeholder, mandatory, isFocused }) => {
    return (
      <HStack paddingStart={6} {...labelStyles}>
        {placeholder && (
          <MandatorySymbol
            placeholderName={placeholder}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
        )}
        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && dates && isNotStringifiedEmptyArray(dates)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
    )
  }

  if (granularity === 'month') {
    return (
      <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
        <FieldLabel placeholder={placeholder} mandatory={mandatory} isFocused={isFocused} />

        <DateInMonth
          questionCode={questionCode}
          dates={dates}
          maxDate={maxDate}
          handleDateChange={handleDateChange}
          errorStatus={errorStatus}
          inputStyles={inputStyles}
        />
      </Box>
    )
  }

  if (granularity === 'year') {
    return (
      <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
        <FieldLabel placeholder={placeholder} mandatory={mandatory} isFocused={isFocused} />

        <DateInYear
          questionCode={questionCode}
          dates={dates}
          maxDate={maxDate}
          handleDateChange={handleDateChange}
          errorStatus={errorStatus}
          inputStyles={inputStyles}
        />
      </Box>
    )
  }

  return (
    <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
      <FieldLabel placeholder={placeholder} mandatory={mandatory} isFocused={isFocused} />
      <DateInDay
        questionCode={questionCode}
        dates={dates}
        maxDate={maxDate}
        handleDateChange={handleDateChange}
        errorStatus={errorStatus}
        inputStyles={inputStyles}
      />
    </Box>
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
