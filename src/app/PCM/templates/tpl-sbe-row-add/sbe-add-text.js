import { Input } from '@chakra-ui/react'
import useProductColors from 'utils/productColors'

const SBEAddText = ({ askData, value, onChange }) => {
  const questionCode = askData?.questionCode || ''

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    borderRadius,
  } = useProductColors()
  return (
    <Input
      test-id={questionCode}
      id={questionCode}
      onChange={e => onChange(e.target.value)}
      value={value || ''}
      w="full"
      h={'auto'}
      paddingBlock={3}
      paddingInline={6}
      autoComplete={'off'}
      bg={fieldBackgroundColor}
      borderRadius={borderRadius}
      placeholder={askData?.name}
      borderColor={fieldBorderColor}
      fontSize={'sm'}
      fontWeight={'medium'}
      color={fieldTextColor}
      cursor={'pointer'}
      _hover={{
        borderColor: fieldHoverBorderColor,
        boxShadow: 'lg',
      }}
      _focusVisible={{
        borderColor: 'product.secondary',
        boxShadow: 'initial',
      }}
      _invalid={{
        background: 'error.50',
        borderColor: 'error.500',
        color: 'error.500',
      }}
      _disabled={{
        borderColor: 'gray.300',
        background: 'gray.100',
      }}
    />
  )
}

export default SBEAddText
