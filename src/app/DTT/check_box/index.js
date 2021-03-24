import { Checkbox, HStack } from '@chakra-ui/react'
import { Read } from 'app/DTT/text'

const Write = ({ questionCode, data, onSendAnswer }) => {
  console.warn('data', data)
  return (
    <HStack spacing={2}>
      <Checkbox
        colorScheme="green"
        isChecked={data?.value === 'true'}
        value={data?.value}
        onChange={() => onSendAnswer('true')}
      >{`Yes`}</Checkbox>
    </HStack>
  )
}
const CheckBox = {
  Write,
  Read,
}

export default CheckBox
