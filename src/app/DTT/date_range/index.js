import { Box, HStack, Text, useTheme } from '@chakra-ui/react'
import { DateInDay, DateInMonth, DateInYear } from './granularity'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  placeholder,
  mandatory,
}) => {
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
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const handleDateChange = (e, date) => {
    if (!e) {
      dates ? setIsFocused(true) : setIsFocused(false)
      setDates(dates => ({ ...dates, [date]: null }))
      onSendAnswer({ ...dates, [date]: null })
      dispatchBaseEntityUpdates(attributeCode, targetCode, dates)(onNewMsg)
    } else {
      if (e.target.value) {
        e.target.value ? setIsFocused(true) : setIsFocused(false)
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

  useEffect(() => {
    dates ? setIsFocused(true) : setIsFocused(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FieldLabel = ({ placeholder, mandatory, isFocused }) => {
    const theme = useTheme()
    return (
      <HStack
        position={'absolute'}
        zIndex={theme.zIndices.docked}
        top={isFocused ? '-1.5rem' : 3}
        left={0}
        paddingStart={6}
        w="full"
        justifyContent={'space-between'}
        pointerEvents={'none'}
        transition="all 0.25s ease"
      >
        {placeholder && (
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={'gray.600'}>
            {placeholder}
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
      />
    </Box>
  )
}

const DateRange = {
  Write,
  Read,
}

export default DateRange
