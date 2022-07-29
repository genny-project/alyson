import { HStack, Input, Text, VStack } from '@chakra-ui/react'

import DateChip from 'app/DTT/date/DateChip'
import { currentDateInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForDate from 'utils/helpers/set-year-for-date'

const DateInDay = ({
  questionCode,
  dates,
  maxDate = currentDateInIsoFormat,
  handleDateChange,
  errorStatus,
  fieldBackgroundColor,
  fieldBorderColor,
  fieldHoverBorderColor,
  fieldTextColor,
  borderRadius,
}) => {
  return (
    <>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          {dates.startDate ? (
            <DateChip date={dates.startDate} onClick={() => handleDateChange(null, 'startDate')} />
          ) : (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'startDate')}
              min={setYearForDate('2002')}
              max={maxDate}
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={fieldBackgroundColor}
              borderRadius={borderRadius}
              borderColor={fieldBorderColor}
              fontSize={'sm'}
              fontWeight={'medium'}
              color={fieldTextColor}
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
                borderColor: 'gray.300',
                background: 'gray.100',
              }}
            />
          )}
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          {dates.endDate ? (
            <DateChip date={dates.startDate} onClick={() => handleDateChange(null, 'endDate')} />
          ) : (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'endDate')}
              min={setYearForDate()}
              max={maxDate}
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={fieldBackgroundColor}
              borderRadius={borderRadius}
              borderColor={fieldBorderColor}
              fontSize={'sm'}
              fontWeight={'medium'}
              color={fieldTextColor}
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
                borderColor: 'gray.300',
                background: 'gray.100',
              }}
            />
          )}
        </VStack>
      </HStack>
      {errorStatus && <Text textStyle="product.errorText">{`Please enter a valid date. `}</Text>}
    </>
  )
}

export default DateInDay
