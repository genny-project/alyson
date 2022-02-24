import { Center } from '@chakra-ui/react'
import Buttons from 'app/layouts/display/sidebar/buttons'

import { SIDEBAR_WIDTH } from 'utils/constants'

const SideBar = () => {
  return (
    <Center w={SIDEBAR_WIDTH} bg="#224371" h="100vh">
      <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} sideBarButtons={true} />
    </Center>
  )
}

export default SideBar
