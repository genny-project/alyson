import { Box, Progress, Text } from '@chakra-ui/react'

const ProfileStatusCard = props => {
  const { value = 75 } = props

  return (
    <>
      <Box bg={'#EDF8F8'} h={'13rem'} w={'27rem'} borderRadius={'2.5rem'} paddingBlock={'2rem'}>
        <Text paddingLeft={'2.5rem'} fontSize={'1.25rem'} paddingBottom={'0.75rem'}>
          {' '}
          Your Profile Status
        </Text>
        <Text color={'red'} fontSize={'0.8rem'} marginLeft={'19rem'} marginBottom={'-1rem'}>
          View profile
        </Text>
        <Progress
          value={value}
          marginBlock={'1rem'}
          marginLeft={'2.5rem'}
          marginRight={'3.5rem'}
          borderRadius={'1rem'}
          h={'1.6rem'}
          colorScheme="green"
          bg={'#CCE9C8'}
        />
        <Text color={'red'} marginLeft={'2.5rem'} marginTop={'-1rem'}>
          {' '}
          COMPLETE YOUR PROFILE{' '}
        </Text>
      </Box>
    </>
  )
}

export default ProfileStatusCard
