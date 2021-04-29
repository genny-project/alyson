import { Avatar } from '@chakra-ui/react'

const ProfilePicture = ({ src }) => {
  return (
    <Avatar
      mt="-4.75rem"
      left="calc(35vw - 4.75rem)"
      bg="white"
      p="4px"
      src={src}
      w="9.5rem"
      h="9.5rem"
      zIndex="modal"
      position="absolute"
    />
  )
}

export default ProfilePicture
