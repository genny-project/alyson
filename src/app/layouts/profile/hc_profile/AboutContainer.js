import { Box, HStack, Text } from '@chakra-ui/react'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DetailContainer from 'app/layouts/profile/hc_profile/DetailContainer'

const AboutContainer = ({ theme, content }) => {
  return (
    <DetailContainer>
      <HStack alignSelf="start">
        {/* to be replaced with the proper rocket asset */}
        <FontAwesomeIcon size={'2x'} icon={faRocket}></FontAwesomeIcon>
        <Text>About</Text>
      </HStack>
      <Box
        borderLeft={'2px'}
        borderColor={theme.colors.internmatch.primary100}
        paddingLeft={'1rem'}
      >
        <Text>{content}</Text>
      </Box>
    </DetailContainer>
  )
}

export default AboutContainer
