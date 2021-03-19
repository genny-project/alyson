import { IconButton } from '@chakra-ui/react'

const HeroIconButton = ({ icon, onClick }) => (
  <IconButton
    transition="all 0.2s"
    colorScheme="gradient"
    color="white"
    rounded={'md'}
    onClick={onClick}
    _hover={{
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    }}
  >
    {icon}
  </IconButton>
)

export default HeroIconButton
