import { compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCodeUnary } from 'redux/db/selectors'
import { Box, HStack, Text } from '@chakra-ui/react'

const TemplateListItemsItem = ({ code }) => {
  const name = compose(useSelector, selectCodeUnary(code))('PRI_NAME') || ''

  return (
    <HStack>
      <Box
        borderRadius={'sm'}
        borderColor={'#AADBA3'}
        borderWidth={'2px'}
        color={'#55B748'}
        width="1rem"
        height="1rem"
        paddingRight={4}
      />
      <Text>{name}</Text>
    </HStack>
  )
}

export default TemplateListItemsItem
