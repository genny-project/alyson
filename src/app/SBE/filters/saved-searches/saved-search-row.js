import { HStack, Box, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { prop, toUpper } from 'ramda'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const SavedSearchRow = ({ row, onEdit, onDelete }) => {
  const { column, operator, value } = row

  const string = `${column.label} is ${toUpper(operator.label)}: ${prop('label')(value) || value}`

  return (
    <Box w={'100%'}>
      <HStack w={'100%'} justify="space-between">
        <Text w="full" textAlign={'center'}>
          {string}
        </Text>
        <HStack>
          <IconButton icon={<FontAwesomeIcon icon={faEdit} />} onClick={() => onEdit(row)} />
          <IconButton icon={<FontAwesomeIcon icon={faTrash} />} onClick={() => onDelete(row)} />
        </HStack>
      </HStack>
    </Box>
  )
}

export default SavedSearchRow
