import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'

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

const Write = ({ questionCode, data, onSendAnswer, isRequired, label }) => {
  const toggle = () => onSendAnswer(data?.value === 'true' ? 'false' : 'true')
  return (
    <HStack w="full" spacing={2} align="start">
      <Checkbox
        m="1"
        test-id={questionCode}
        colorScheme="green"
        isChecked={data?.value === 'true'}
        onChange={toggle}
      />
      <FormControl onClick={toggle} isRequired={isRequired}>
        <FormLabel cursor="pointer">{label}</FormLabel>
      </FormControl>
    </HStack>
  )
}
const CheckBox = {
  Write,
  Read,
}

export default CheckBox
