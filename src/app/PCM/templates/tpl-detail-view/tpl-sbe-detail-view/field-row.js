import { Box, HStack, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FieldRow = ({ baseEntityCode, data, index }) => {
  const rowColour = index % 2 === 0 ? '#F4F5F5' : '#FFFFFF'

  const name = data?.attributeName ?? ''
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
