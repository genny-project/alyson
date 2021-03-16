import { useColorModeValue } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import MobileNav from './mobile'

const getLogo = (realm, lightMode) =>
  realm === 'internmatch'
    ? lightMode
      ? 'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_light.png'
      : 'https://internmatch-uploads.s3-ap-southeast-2.amazonaws.com/internmatch_logo_dark.png'
    : 'https://raw.githubusercontent.com/OutcomeLife/prj_mentormatch/7.17.0/docs/mentormatch_logo.png'

const Navigation = () => {
  const { realm } = apiConfig

  const logoSrc = useColorModeValue(getLogo(realm, true), getLogo(realm))

  return <MobileNav logoSrc={logoSrc} />
}

export default Navigation
