import 'app/DTT/check_box/styles.scss'

import { Checkbox, FormControl, FormLabel, HStack } from '@chakra-ui/react'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'

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
  const realm = useGetProductName().toLowerCase()
  const isProductInternmatch = useIsProductInternmatch()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  let answer = data?.value === 'true' ? 'false' : 'true'

  const colorScheme = useGetAttributeFromProjectBaseEntity('PRI_SECONDARY_COLOR')?.valueString

  const toggle = () => {
    onSendAnswer(answer)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <HStack w="full" spacing={2} align="start" role="group">
      <Checkbox
        m="1"
        id={questionCode}
        test-id={questionCode}
        isChecked={data?.value === 'true'}
        onChange={toggle}
        borderRadius={'2px'}
        border={'2px solid'}
        borderColor={isProductInternmatch ? `${realm}.primary` : colorScheme}
        _checked={{
          bg: isProductInternmatch ? `${realm}.secondary` : colorScheme,
          borderColor: isProductInternmatch ? `${realm}.secondary` : colorScheme,
        }}
        _disabled={{
          opacity: '.4',
        }}
        _groupHover={{
          borderColor: isProductInternmatch ? `${realm}.secondary` : colorScheme,
        }}
      />
      <FormControl
        onClick={toggle}
        isRequired={isRequired}
        color={
          data?.value === 'true'
            ? `${realm}.secondary`
            : isProductInternmatch
            ? `${realm}.primary`
            : 'gray[800]'
        }
        _groupHover={{ color: isProductInternmatch ? `${realm}.secondary` : 'gray[800]' }}
        _groupChecked={{ color: isProductInternmatch ? `${realm}.secondary` : 'gray[800]' }}
      >
        <FormLabel cursor="pointer">{label}</FormLabel>
      </FormControl>

      {answer && <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />}
    </HStack>
  )
}
const SingleCheckBox = {
  Write,
  Read,
}

export default SingleCheckBox
