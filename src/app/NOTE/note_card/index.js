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
              <Attribute key={tag?.name} code={toUpper(tag?.name)} attribute="PRI_IMAGE_URL" />
            ) : (
              <Text>{tag.name}</Text>
            ),
          )}
        </HStack>

        <Text>{content}</Text>
        <HStack>
          <Text textStyle="body1">{new Date(created).toLocaleDateString()}</Text>
          <Text textStyle="body1">
            <Attribute code={targetCode} attribute="PRI_NAME" />
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default NoteCard
