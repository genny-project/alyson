import Buttons from 'app/ASKS/buttons'
import AskMenu from 'app/ASKS/menu'
import { Flex, Spacer, Image, Center, HStack, useBreakpointValue } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from './Avatar'
import Search from './Search'

const Navigation = () => {
  const showImage = useBreakpointValue({ base: false, lg: true })
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 3, width: '100%', left: 0, right: 0 }}>
      <Flex p="3">
        {showImage && apiConfig?.realm === 'internmatch' && (
          <Image w="xs" src={`/internMatchLogo.png`} />
        )}
        <Spacer />
        <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} />
        <Spacer />
        <Center>
          <Search />
        </Center>
        <Spacer />
        <HStack>
          <AskMenu questionCode={'QUE_ADD_ITEMS_GRP'} />
          <Avatar />
        </HStack>
      </Flex>
    </header>
  )
}

export default Navigation
