import { compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'
import { Box, HStack, Text } from '@chakra-ui/react'

const TemplateListItemsItem = ({ code }) => {
  const name = compose(useSelector, selectCodeUnary(code))('PRI_NAME')?.value || ''

  return (
    <HStack>
      <Box
        borderRadius={'sm'}
        borderColor={'#AADBA3'}
        borderWidth={'2px'}
        bg={'#55B748'}
        style={{ width: '16px', aspectRatio: 1 }}
        paddingRight={4}
      />
      <Text>{name}</Text>
    </HStack>
  )
}

export default TemplateListItemsItem
