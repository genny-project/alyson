import Buttons from 'app/ASKS/buttons'
import AskMenu from 'app/ASKS/menu'
import { Flex, Spacer, Center } from '@chakra-ui/react'

const Navigation = () => {
  return (
    <Flex>
      <Center>
        <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
      </Center>
      <Spacer />
      <Center>
        <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} />
      </Center>
    </Flex>
  )
}

export default Navigation
