import { Box, Flex, Text } from '@chakra-ui/layout'

import { useMobileValue } from 'utils/hooks'

const MenteeStats = ({ recommendedMentorCount, invitedMentorsCount, mentoringSessions }) => {
  const borderBlock = useMobileValue(['1px solid #808080', ''])
  const borderInline = useMobileValue(['', '1px solid #808080'])
  const flexDirection = useMobileValue(['column', 'row'])

  return (
    <Flex
      flexDirection={flexDirection}
      rounded={16}
      textAlign={'center'}
      spacing={0}
      marginBlock={8}
      borderWidth={1}
      borderStyle={'solid'}
      borderColor={'gray.700'}
    >
      <Box pt={5} pb={2} paddingInline={1} flex={1}>
        <Text textStyle={'head.1'} color={'orange.700'}>
          {recommendedMentorCount}
        </Text>
        <Text textStyle={'body.3'}>{'Recommended Mentors'}</Text>
      </Box>
      <Box
        pt={5}
        pb={2}
        paddingInline={1}
        flex={1}
        borderBlock={borderBlock}
        borderInline={borderInline}
      >
        <Text textStyle={'head.1'} color={'orange.700'}>
          {invitedMentorsCount}
        </Text>
        <Text textStyle={'body.3'}>{'Mentor Invites Sent'}</Text>
      </Box>
      <Box pt={5} pb={2} paddingInline={1} flex={1}>
        <Text textStyle={'head.1'} color={'orange.700'}>
          {mentoringSessions}
        </Text>
        <Text textStyle={'body.3'}>{'Total Mentoring Sessions'}</Text>
      </Box>
    </Flex>
  )
}

export default MenteeStats
