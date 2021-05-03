import { Text, VStack, HStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { includes, toUpper } from 'ramda'
import { useSelector } from 'react-redux'
import { selectNote } from 'redux/db/selectors'

const NoteCard = ({ id }) => {
  const note = useSelector(selectNote(id))

  if (!note) return null

  const { content, created, tags = [], targetCode } = note

  return (
    <Card>
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

        <Text>{content}</Text>
        <HStack>
          <Text textStyle="tail3">{new Date(created).toLocaleDateString()}</Text>
          <Text textStyle="tail3">
            <Attribute code={targetCode} attribute="PRI_NAME" />
          </Text>
        </HStack>
      </VStack>
    </Card>
  )
}

export default NoteCard
