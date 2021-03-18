import { Box } from '@chakra-ui/layout'
import { gradient } from 'config/theme'

const HeroIconButton = ({ icon, onClick }) => (
  <Box
    h="40px"
    w="40px"
    borderRadius="lg"
    bg={gradient}
    color="white"
    as="button"
    onClick={onClick}
    _hover={{
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    }}
    transition="all 0.2s"
  >
    {icon}
  </Box>
)

export default HeroIconButton
