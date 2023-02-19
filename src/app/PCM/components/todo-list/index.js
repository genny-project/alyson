import { Box, Text, Checkbox, VStack, Divider, Button, HStack } from '@chakra-ui/react'
import { useState } from 'react'

const TodoList = () => {
  const checklistItems = [
    'Complete internmatch profile',
    'Search for internships',
    'See contact list',
    'Save internship to favourites',
    'Check notifications',
  ]

  return (
    <>
      <Box
        w={'494px'}
        bg={'#EDF8F8'}
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
          {checklistItems.map((item, index) => (
            <VStack alignItems={'flex-start'}>
              <HStack>
                <Checkbox
                  fontSize={'8px'}
                  key={index}
                  size="md"
                  spacing={'25px'}
                  colorScheme={'green'}
                  borderColor={'#829998'}
                >
                  {item}
                </Checkbox>
                <Button fontSize={'12px'} variant={'ghost'} size={'sm'}>
                  x
                </Button>
              </HStack>
              <Divider width={'351px'} bg="#D3E3E2" />
            </VStack>
          ))}
        </VStack>
        <Button
          _hover={'#EA5024'}
          float={'right'}
          marginRight={'-15px'}
          w={'110px'}
          h={'46px'}
          borderRadius={'50px'}
          marginTop={'-45px'}
          fontSize={'16px'}
          bg="#EA5024"
          color="#FFFFFF"
        >
          Add task
        </Button>
      </Box>
    </>
  )
}

export default TodoList
