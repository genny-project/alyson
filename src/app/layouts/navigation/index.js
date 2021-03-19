import { useColorModeValue } from '@chakra-ui/react'
import MobileNav from './mobile'

const getLogo = lightMode =>
  lightMode ? '/internmatch_logo_light.png' : '/internmatch_logo_dark.png'

const Navigation = () => {
  const logoSrc = useColorModeValue(getLogo(true), getLogo())

  return <MobileNav logoSrc={logoSrc} />
}

export default Navigation
