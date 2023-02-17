import { Box, Text, Checkbox, VStack, Divider } from '@chakra-ui/react'

const TodoList = () => {
  const checkboxItems = [
    'Complete internmatch profile',
    'search for internships',
    'See contacts list',
    'save internship to favourites',
    'check notifications',
  ]
  return (
    <>
      <Box
        w={'494 px'}
        h={'424px'}
        bg={'pink'}
        borderRadius={'40px'}
        paddingBlock={'81px'}
        paddingInline={'81px'}
        fontFamily={'PP Neue Montreal'}
      >
        <Text fontSize={'20px'} color="#063231">
          {' '}
          TO DO LIST
        </Text>
        <VStack alignItems={'flex-start'} paddingBlock={'20px'}>
          <Checkbox size="md" colorScheme={'green'} borderColor={'#829998'}>
            Complete internmatch profile
          </Checkbox>
          <Divider color="#D3E3E2" />
          <Checkbox size="md" colorScheme={'green'} borderColor={'#829998'}>
            Search for internships
          </Checkbox>
        </VStack>
      </Box>
    </>
  )
}

export default TodoList
