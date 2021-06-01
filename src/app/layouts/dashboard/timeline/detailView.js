import { Box, Text, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
const DetailView = ({ setShowDetailView }) => {
  return (
    <Box
      w="50%"
      bg="gray.100"
      h="80vh"
      spacing={10}
      m={10}
      textAlign="center"
      p="5"
      overflowY="scroll"
    >
      <Box textAlign="end">
        <IconButton
          onClick={() => setShowDetailView(false)}
          color="teal"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Text textStyle="header.2">{`Detail View`}</Text>
      <Text textStyle="header.2">{`Detail View`}</Text>
    </Box>
  )
}

export default DetailView
