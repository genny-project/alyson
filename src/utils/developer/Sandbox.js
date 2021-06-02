import { Button, IconButton, VStack } from '@chakra-ui/react'
import { HostCpyRepIcon } from './HostCpyRepIcon'
import ThemeToggler from '../../app/layouts/navigation/ColorToggler'

const Sandbox = () => {
  return (
    <VStack>
      <ThemeToggler />
      <Button leftIcon={<HostCpyRepIcon />} colorScheme="teal" variant="solid">
        HostCpyRepIcon
      </Button>
      <IconButton colorScheme="teal" size="lg" icon={<HostCpyRepIcon />} />
      <IconButton variant="outline" colorScheme="teal" size="lg" icon={<HostCpyRepIcon />} />
    </VStack>
  )
}

export default Sandbox
