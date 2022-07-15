import { FormControl, FormLabel, HStack, Switch } from '@chakra-ui/react'

const Read = ({ data }) => {
  return (
    <HStack spacing={2}>
      <Switch
        colorScheme="green"
        isChecked={data?.value === 'true'}
        isDisabled="true"
      >{`Yes`}</Switch>
    </HStack>
  )
}

const Write = ({ questionCode, data, onSendAnswer, isRequired, label }) => {
  const toggle = () => onSendAnswer(data?.value === 'true' ? 'false' : 'true')

  return (
    <HStack w="full" spacing={2} align="start">
      <Switch
        m="1"
        id={questionCode}
        test-id={questionCode}
        colorScheme="green"
        isChecked={!!data?.value}
        onChange={toggle}
      />
      <FormControl onClick={toggle} isRequired={isRequired}>
        <FormLabel cursor="pointer">{label}</FormLabel>
      </FormControl>
    </HStack>
  )
}
const Toggle = {
  Write,
  Read,
}

export default Toggle
