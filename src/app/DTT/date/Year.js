import { Select } from '@chakra-ui/select'

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i)

const Year = ({ questionCode, handleChange }) => {
  return (
    <Select w="full" maxW="25vw" test-id={questionCode} onChange={handleChange}>
      {yearOptions.map(year => (
        <option key={year} test-id={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  )
}

export default Year
