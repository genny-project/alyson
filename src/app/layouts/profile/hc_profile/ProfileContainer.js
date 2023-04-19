import { Button } from '@chakra-ui/button'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Avatar, Center, Divider } from '@chakra-ui/react'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map, range } from 'ramda'
import { Iconly } from 'react-iconly'
import ProfileItems from 'app/layouts/profile/hc_profile/ProfileItems'

const ProfileContainer = ({
  theme,
  name,
  userCode,
  pronouns,
  linkedIn,
  jobTitle,
  education,
  location,
  website,
}) => {
  const reviewStars = rating => {
    let count = map(i => (
      <FontAwesomeIcon
        icon={faStar}
        color={
          i < rating ? theme.colors.internmatch.primary400 : theme.colors.internmatch.primary100
        }
      />
    ))(range(0, 5))
    return <HStack>{count}</HStack>
  }

  return (
    <Box w={'full'} h={'full'} bg="white" rounded="3xl">
      <VStack w="full" h="full" justify={'space-around'} padding={'1rem'}>
        <Box alignSelf={'end'} display={'inline'}>
          <Iconly
            name="Bookmark"
            set="two-tone"
            size="medium"
            primaryColor={theme.colors.internmatch.primary}
          />
        </Box>
        <Center>
          <Avatar
            bg={theme.colors.internmatch.primary}
            w="7rem"
            h="7rem"
            marginTop="-7rem"
            padding={'1vh'}
            outline={'10px solid'}
            name={name.value}
          />
        </Center>
        {reviewStars(4)}
        <HStack w="full" justify={'center'}>
          <Text>{name.value}</Text>
          <Text textStyle={'body.3'}>({pronouns})</Text>
          <Divider w={'5%'} />
          <a rel="noopener noreferrer" href={linkedIn}>
            <FontAwesomeIcon icon={faLinkedin} color={theme.colors.internmatch.secondary} />
          </a>
        </HStack>
        <ProfileItems
          items={[
            {
              title: jobTitle,
              icon: (
                <Iconly
                  name="Work"
                  set="two-tone"
                  size="medium"
                  primaryColor={theme.colors.internmatch.primary}
                />
              ),
            },

            {
              title: education,
              icon: <FontAwesomeIcon icon={faGraduationCap} />,
            },

            {
              title: location,
              icon: (
                <Iconly
                  name="Location"
                  set="two-tone"
                  size="medium"
                  primaryColor={theme.colors.internmatch.primary}
                />
              ),
            },
          ]}
        ></ProfileItems>
        <Button
          onClick={() => {
            window.open(website)
          }}
          variant="solid"
          minW={`6.5rem`}
          paddingBlock="0.38rem"
          paddingInline="1.25rem"
          alignSelf={'end'}
          size="lg"
          mr={0}
          marginBlock="5"
          background={`internmatch.primary400`}
          borderRadius={'full'}
          borderWidth="1px"
          borderStyle={'solid'}
          borderColor={'internmatch.primary'}
          fontSize={'sm'}
          fontWeight={400}
          color={`internmatch.primary`}
          _hover={{
            background: `internmatch.secondary`,
            color: `white`,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: `internmatch.primary`,
            variant: 'outline',
          }}
        >
          {'Website'}
        </Button>
      </VStack>
    </Box>
  )
}

export default ProfileContainer
