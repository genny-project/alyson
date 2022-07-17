import { HStack, Input, Text, VStack } from '@chakra-ui/react'

import DateChip from 'app/DTT/date/DateChip'
import { apiConfig } from 'config/get-api-config'
import { currentDateInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import { equals } from 'ramda'
import setYearForDate from 'utils/helpers/set-year-for-date'

const DateInDay = ({
  questionCode,
  dates,
  maxDate = currentDateInIsoFormat,
  handleDateChange,
  errorStatus,
}) => {
  const clientId = apiConfig?.clientId
  return (
    <>
      <HStack spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          {dates.startDate ? (
            <DateChip date={dates.startDate} onClick={() => handleDateChange(null, 'startDate')} />
          ) : equals(clientId)('lojing') ? (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'startDate')}
              min={setYearForDate('2002')}
              max={maxDate}
              w="full"
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={'product.gray'}
              borderColor={'product.gray'}
              fontSize={'sm'}
              fontWeight={'medium'}
              color="product.darkGray"
              _hover={{
                borderColor: 'product.secondary',
                boxShadow: 'lg',
              }}
              _focusVisible={{
                borderColor: 'product.secondary',
                boxShadow: 'initial',
              }}
            />
          ) : (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'startDate')}
              min={setYearForDate('2002')}
              max={maxDate}
            />
          )}
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          {dates.endDate ? (
            <DateChip date={dates.startDate} onClick={() => handleDateChange(null, 'endDate')} />
          ) : equals(clientId)('lojing') ? (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'endDate')}
              min={setYearForDate()}
              max={maxDate}
              w="full"
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={'product.gray'}
              borderColor={'product.gray'}
              fontSize={'sm'}
              fontWeight={'medium'}
              color="product.darkGray"
              _hover={{
                borderColor: 'product.secondary',
                boxShadow: 'lg',
              }}
              _focusVisible={{
                borderColor: 'product.secondary',
                boxShadow: 'initial',
              }}
            />
          ) : (
            <Input
              test-id={questionCode}
              type={'date'}
              onBlur={e => handleDateChange(e, 'endDate')}
              min={setYearForDate()}
              max={maxDate}
            />
          )}
        </VStack>
      </HStack>
      {errorStatus && <Text textStyle="tail.error" mt={2}>{`Please enter a valid date. `}</Text>}
    </>
  )
}

export default DateInDay
