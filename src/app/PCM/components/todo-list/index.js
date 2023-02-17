import { Box, Text, Checkbox, VStack, Divider } from '@chakra-ui/react'
import { useState } from 'react'

const TodoList = () => {
  const checklistItems = [
    'Complete internmatch profile',
    'Search for internships',
    'See contacts list',
    'Save internship to favourites',
    'Check notifications',
  ]

  const [checked, setChecked] = useState()

  return (
    <>
      <Box
        w={'494px'}
        bg={'pink'}
        borderRadius={'40px'}
        paddingBlock={'81px'}
        paddingInline={'81px'}
        fontFamily={'PP Neue Montreal'}
      >
        <Text fontSize={'20px'} fontWeight={500} color="#063231">
          {' '}
          TO DO LIST
        </Text>
        <VStack paddingBlock={'20px'}>
          {checklistItems.map(items => (
            <VStack alignItems={'flex-start'}>
              <Checkbox
                fontSize={'8px'}
                key={checklistItems}
                size="md"
                colorScheme={'green'}
                borderColor={'#829998'}
              >
                {items}
              </Checkbox>
              <Divider width={'351px'} color="#D3E3E2" />
            </VStack>
          ))}
        </VStack>
      </Box>
    </>
  )
}

export default TodoList
