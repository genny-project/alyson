import { Select } from '@chakra-ui/select'

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i)

const Year = ({ questionCode, handleChange }) => {
  return (
    <Select
      id={questionCode}
      test-id={questionCode}
      onChange={handleChange}
      w="full"
      maxW="25vw"
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
    >
      {yearOptions.map(year => (
        <option key={year} test-id={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  )
}

export default Year
