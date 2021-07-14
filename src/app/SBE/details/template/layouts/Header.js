import { Box, Center } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'
import Card from 'app/layouts/components/card'
import { closeDrawer } from 'redux/app'

const Header = ({ beCode }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  return (
    <>
      <Center w="full">
        <Card minH="10rem" p={0} w="full" bg="#1A365D" overflow="hidden" borderRadius="2rem">
          <Center w="full">
            <Box maxW="30vw">
              <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
            </Box>
          </Center>
        </Card>
      </Center>
      <Box
        overflow="hidden"
        borderRadius="50%"
        position="absolute"
        zIndex="modal"
        right="12"
        top="6"
      >
        <IconButton
          onClick={onClose}
          size="sm"
          color="#1A365D"
          bg="white"
          icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
        />
      </Box>
    </>
  )
}

export default Header
