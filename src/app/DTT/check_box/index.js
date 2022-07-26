import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'ramda'
import dispatchBaseEntityUpdates from 'utils/helpers/dispatch-baseentity-updates'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { newMsg } from 'redux/app'
import { useDispatch } from 'react-redux'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

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
      {answer && <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />}
    </HStack>
  )
}
const CheckBox = {
  Write,
  Read,
}

export default CheckBox
