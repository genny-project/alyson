import { Avatar } from '@chakra-ui/react'

const ProfilePicture = ({ src }) => {
  return <Avatar mt="-5rem" bg="white" p="4px" src={src} w="9.5rem" h="9.5rem" zIndex="modal" />
}

export default ProfilePicture
