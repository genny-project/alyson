import { Box } from '@chakra-ui/layout'

const HeroIconButton = ({ icon, onClick }) => (
  <Box
    h="35px"
    w="35px"
    borderRadius="lg"
    colorScheme="gradient"
    color="white"
    as="button"
    onClick={onClick}
    _hover={{ boxShadow: 'dark-lg' }}
    transition="box-shadow 0.2s"
  >
    {icon}
  </Box>
)

export default HeroIconButton
