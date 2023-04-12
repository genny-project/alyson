import { Box, Button, HStack } from '@chakra-ui/react'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import { useEffect, useState } from 'react'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'
import useProductColors from 'utils/productColors'

const LabelledFlag = ({ questionCode, data, onSendAnswer, placeholderName: label, mandatory }) => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternmatch = useIsProductInternmatch()

  const [selected, setSelected] = useState(data?.value || false)

  const { labelTextColor } = useProductColors()

  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const handleToggle = () => {
    onSendAnswer(!selected)
    setSelected(selected => !selected)
    dispatchFieldMessage({ payload: questionCode })
  }

  useEffect(() => {
    if (isNullOrUndefinedOrEmpty(data?.value)) {
      setSelected(false)
      onSendAnswer(false)
    } else {
      setSelected(data?.value || false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.value, selected])

  return (
    <HStack ml={1} spacing={1} justifyContent={'space-between'}>
      <MandatorySymbol
        placeholderName={label}
        mandatory={mandatory}
        labelTextColor={isProductInternmatch ? `${realm}.primary` : labelTextColor}
        realm={realm}
      />
      <Button
        bg="#004654"
        borderRadius={'full'}
        padding={1}
        height={'auto'}
        onClick={handleToggle}
        _hover={{ bg: '#005664' }}
        minW="13rem"
      >
        <HStack>
          <Box
            bg={selected ? 'white' : 'transparent'}
            color={selected ? '#004654' : 'white'}
            padding={3}
            borderRadius="full"
          >
            Approved
          </Box>
          <Box
            bg={!selected ? 'white' : 'transparent'}
            color={!selected ? '#004654' : 'white'}
            padding={3}
            borderRadius="full"
          >
            Rejected
          </Box>
        </HStack>
      </Button>
    </HStack>
  )
}

export default LabelledFlag
