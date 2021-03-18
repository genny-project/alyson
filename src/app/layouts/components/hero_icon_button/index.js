import { IconButton } from '@chakra-ui/button'
import { gradient } from 'config/theme'

const HeroIconButton = ({ icon, onClick }) => (
  <IconButton
    onClick={onClick}
    transition="all 0.2s"
    bgGradient={gradient}
    color={'white'}
    rounded={'md'}
    _hover={{
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    }}
    icon={icon}
  />
)

export default HeroIconButton
