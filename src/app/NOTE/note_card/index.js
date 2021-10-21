import { Box, Text, VStack } from '@chakra-ui/layout'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { selectNote } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const NoteCard = ({ id }) => {
  const note = useSelector(selectNote(id))

  if (!note) return null

  const { content, created, sourceCode } = note

  return (
    <Card w="full" p="3">
      <VStack align="start">
        {/* <HStack w="full">
          {tags.map((tag, idx) =>
            includes('per_', tag?.name) ? (
              <Attribute
                key={tag?.name || idx}
                code={toUpper(tag?.name)}
                attribute="PRI_IMAGE_URL"
              />
            ) : (
              <Text key={idx}>{tag.name}</Text>
            ),
          )}
        </HStack> */}
        <Text textStyle="tail.2">{content}</Text>
        <VStack align="start" spacing={0}>
          <Text textStyle="tail.3">{new Date(created).toLocaleDateString()}</Text>
          <Box textStyle="tail.3">
            {sourceCode === 'PER_SERVICE' ? (
              <Text textStyle="tail.3" fontStyle="italic">
                System
              </Text>
            ) : (
              <Attribute code={sourceCode} attribute="PRI_NAME" />
            )}
          </Box>
        </VStack>
      </VStack>
    </Card>
  )
}

export default NoteCard
