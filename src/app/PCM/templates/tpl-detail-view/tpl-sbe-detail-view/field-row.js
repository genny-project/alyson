import { Box, HStack, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FieldRow = ({ baseEntityCode, attributeCode, index }) => {
  const data = useSelector(selectCode(baseEntityCode, attributeCode))

  const rowColour = index % 2 === 0 ? '#F4F5F5' : '#FFFFFF'

  const name = data?.attributeName ?? attributeCode
  const value = data?.value ?? ''

  return (
    <Box width="100%" bgColor={rowColour} py={2} px={3}>
      <HStack justify={'space-between'}>
        <Box w="30%">{name}</Box>
        <Box w="30%">{value}</Box>
        <Box>
          <IconButton bgColor={rowColour} size={'sm'} icon={<FontAwesomeIcon icon={faTrash} />} />
        </Box>
      </HStack>
    </Box>
  )
}

export default FieldRow
