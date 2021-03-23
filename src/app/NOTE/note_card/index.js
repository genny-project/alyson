import { Box, Text, VStack, HStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { includes, toUpper } from 'ramda'
import { useSelector } from 'react-redux'
import { selectNote } from 'redux/db/selectors'

const NoteCard = ({ id }) => {
  const note = useSelector(selectNote(id))

  if (!note) return null

  const { content, created, tags = [], targetCode } = note

  return (
    <Box p="3" w="full" borderWidth="1px" borderRadius="lg">
      <VStack align="start">
        <HStack w="full">
          {tags.map(tag =>
            includes('per_', tag?.name) ? (
              <Attribute code={toUpper(tag?.name)} attribute="PRI_IMAGE_URL" />
            ) : (
              <Text fontWeight="semibold">{tag.name}</Text>
            ),
          )}
        </HStack>

        <Text>{content}</Text>
        <Text fontSize="xs" as="samp">
          {created}
          <Attribute code={targetCode} attribute="PRI_NAME" />
        </Text>
      </VStack>
    </Box>
  )
}

export default NoteCard
