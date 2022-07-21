import { Input, Stack, Text, VStack } from '@chakra-ui/react'

import DateChip from 'app/DTT/date/DateChip'
import { apiConfig } from 'config/get-api-config.js'
import { currentMonthInIsoFormat } from 'utils/helpers/date-info-in-iso-format'
import setYearForMonth from 'utils/helpers/set-year-for-month'

const DateInMonth = ({
  questionCode,
  dates,
  maxDate = currentMonthInIsoFormat,
  handleDateChange,
  errorStatus,
}) => {
  const clientId = apiConfig?.clientId
  return (
    <>
      <Stack direction={['column', 'row']} spacing={5}>
        <VStack align="left" spacing={2}>
          <Text>{`Start Date`}</Text>
          {dates.startDate ? (
            <DateChip
              month
              date={dates.startDate}
              onClick={() => handleDateChange(null, 'startDate')}
            />
          ) : (
            <Input
              test-id={questionCode}
              type={'month'}
              onBlur={e => handleDateChange(e, 'startDate')}
              min={setYearForMonth('2000')}
              max={maxDate}
              w="full"
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={'product.gray'}
              borderRadius={'calc(0.25rem - 1px)'}
              borderColor={'product.gray'}
              fontSize={'sm'}
              fontWeight={'medium'}
              color="product.darkGray"
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
            />
          )}
        </VStack>
        <VStack align="left" spacing={2}>
          <Text>{`End Date`}</Text>
          {dates.endDate ? (
            <DateChip
              month
              date={dates.endDate}
              onClick={() => handleDateChange(null, 'endDate')}
            />
          ) : (
            <Input
              test-id={questionCode}
              type={'month'}
              onBlur={e => handleDateChange(e, 'endDate')}
              min={setYearForMonth()}
              max={maxDate}
              w="full"
              h={'auto'}
              paddingBlock={3}
              paddingInline={6}
              bg={'product.gray'}
              borderRadius={'calc(0.25rem - 1px)'}
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
      </Stack>

      {errorStatus && <Text textStyle="tail.error" mt={2}>{`Please enter a valid date. `}</Text>}
    </>
  )
}

export default DateInMonth
