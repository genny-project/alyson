import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useState } from 'react'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

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
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const colorScheme = useGetAttributeFromProjectBaseEntity('PRI_SURFACE_COLOR')?.valueString

  const [checked, setChecked] = useState(data?.value)

  const toggle = () => {
    const newValue = data?.value === 'true' ? 'false' : 'true'
    onSendAnswer(newValue)
    setChecked(newValue)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <HStack w="full" spacing={2} align="start">
      <Checkbox
        m="1"
        id={questionCode}
        test-id={questionCode}
        colorScheme={colorScheme}
        isChecked={checked === 'true'}
        onChange={toggle}
      />
      <FormControl onClick={toggle} isRequired={isRequired}>
        <FormLabel cursor="pointer">{label}</FormLabel>
      </FormControl>
      {isNotNullOrUndefinedOrEmpty(checked) && (
        <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
      )}
    </HStack>
  )
}
const CheckBox = {
  Write,
  Read,
}

export default CheckBox
