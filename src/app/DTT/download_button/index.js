import { Box, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const DownloadButton = ({ urlLink = 'https://www.google.com' }) => {
  const onClick = () => window.open(urlLink)
  return (
    <Box>
      <Button
        onClick={onClick}
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        colorScheme="primary"
        variant="solid"
      >
        {`Download`}
      </Button>
    </Box>
  )
}

export default DownloadButton
