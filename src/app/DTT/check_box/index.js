import { Checkbox, HStack } from '@chakra-ui/react'

const Read = ({ data }) => {
  return (
    <HStack spacing={2}>
      <Checkbox
        colorScheme="green"
        isChecked={data?.value === 'true'}
        isDisabled="true"
      >{`Yes`}</Checkbox>
    </HStack>
  )
}

const Write = ({ questionCode, data, onSendAnswer }) => {
  return (
    <HStack spacing={2}>
      <Checkbox
        test-id={questionCode}
        colorScheme="green"
        isChecked={data?.value === 'true'}
        value={`Yes`}
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
