import { VStack } from '@chakra-ui/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import icons from 'utils/icons'

const NavButton = ({ code, questionCode }) => {
  return (
    <VStack>
      <FontAwesomeIcon icon={icons[code]} />
    </VStack>
  )
}

export default NavButton
