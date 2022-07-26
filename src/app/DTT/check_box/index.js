import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { compose } from 'ramda'
import { newMsg } from 'redux/app'
import { useDispatch } from 'react-redux'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'

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

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  isRequired,
  label,
  attributeCode,
  targetCode,
}) => {
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  let answer = data?.value === 'true' ? 'false' : 'true'

  const colorScheme = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString
  const dispatchBeInformation = useDispatch()
  const onNewMsg = compose(dispatchBeInformation, newMsg)

  const toggle = () => {
    onSendAnswer(answer)
    dispatchFieldMessage({ payload: questionCode })
    dispatchBaseEntityUpdates(attributeCode, targetCode, answer)(onNewMsg)
  }

  return (
    <HStack w="full" spacing={2} align="start">
      <Checkbox
        m="1"
        id={questionCode}
        test-id={questionCode}
        colorScheme={colorScheme}
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
