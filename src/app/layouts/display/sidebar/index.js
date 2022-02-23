import { Box } from '@chakra-ui/react'
import Buttons from 'app/layouts/display/sidebar/buttons'

import { SIDEBAR_WIDTH } from 'utils/constants'

const SideBar = () => {
  return (
    <Box w={SIDEBAR_WIDTH} bg="blue" h="100vh" alignItems="center" justifyContent="center">
      <Buttons questionCode={'QUE_PROJECT_SIDEBAR_GRP'} sideBarButtons={true} />
    </Box>
  )
}

export default SideBar
