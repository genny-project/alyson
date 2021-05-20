import { Text, VStack, HStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectNote } from 'redux/db/selectors'

const NoteCard = ({ id }) => {
  const note = useSelector(selectNote(id))

  if (!note) return null

  const { content, created, targetCode, sourceCode } = note

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
        <VStack spacing={0}>
          <Text textStyle="tail.3">{new Date(created).toLocaleDateString()}</Text>
          <Text textStyle="tail.3">
            <Attribute code={sourceCode} attribute="PRI_NAME" />
          </Text>
        </VStack>
      </VStack>
    </Card>
  )
}

export default NoteCard
