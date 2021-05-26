import { Button, HStack, VStack, Box, Text, Flex } from '@chakra-ui/react'
import Card from 'app/layouts/components/card'
import { onSendMessage } from 'vertx'
import { map } from 'ramda'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis placerat arcu, tempor rutrum tortor porta quis. Donec aliquam urna ac varius ultrices. Morbi vel dapibus nunc, dictum pretium justo. Nulla non blandit leo. Proin non imperdiet ex. Etiam cursus dignissim sem, nec interdum massa pellentesque eu. Proin condimentum mauris at diam porttitor, a rhoncus nisi semper. Sed sed tincidunt felis, at bibendum sapien. Etiam odio libero, pretium ac condimentum ac, congue ac mi. Aenean efficitur malesuada arcu mattis tempus.'

const items = [
  {
    title: 'Title 1',
    description: description,
    completed: true,
  },
  {
    title: 'Title 2',
    description: description,
    completed: true,
  },
  {
    title: 'Title 3',
    description: 'description',
    completed: false,
  },
  {
    title: 'Title 4',
    description: description,
    completed: false,
  },
]

const Timeline = () => {
  const totalItems = items.length
  const numberOfCompletedItems = items.filter(item => item.completed).length
  let progressBarHeight = (numberOfCompletedItems / totalItems) * 100

  return (
    <HStack h="90vh" position="relative" spacing={8} background="yellow">
      <Box h="100%" w="1" background="silver">
        <Flex
          direction="column"
          h="100%"
          justifyContent="space-around"
          display="flex"
          position="absolute"
          ml="-3.5"
        >
          <Box h="8" w="8" background="green" borderRadius="50%" />
          <Box h="8" w="8" background="green" borderRadius="50%" />
          <Box h="8" w="8" background="silver" borderRadius="50%" />
          <Box h="8" w="8" background="silver" borderRadius="50%" />
        </Flex>
        <Box h={`${progressBarHeight}%`} w="100%" background="green" />
      </Box>
      <VStack h="100%" justifyContent="space-around" display="flex" position="absolute">
        {map(({ title, description }) => (
          <Card>
            <VStack spacing={4} w={['xs', 'md']}>
              <Text textStyle="head.2" alignSelf="flex-start">
                {title}
              </Text>
              <Text textStyle="body.2" noOfLines={[1, 2, 3]} w="inherit">
                {description}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() =>
                  onSendMessage({
                    code: 'QUE_TAB_BUCKET_VIEW',
                    parentCode: 'QUE_TAB_BUCKET_VIEW',
                  })
                }
                size="md"
                alignSelf="flex-end"
              >
                {`Button Placeholder`}
              </Button>
            </VStack>
          </Card>
        ))(items)}
      </VStack>
    </HStack>
  )
}

export default Timeline
