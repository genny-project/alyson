import { Box, Button } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const DownloadButton = ({
  urlLink = 'https://internmatch.io/',
  colorScheme = 'primary',
  variant = 'solid',
}) => {
  const onClick = () => window.open(urlLink)
  return (
    <Box>
      <Button
        title={`Go to ${urlLink}`}
        onClick={onClick}
        leftIcon={<FontAwesomeIcon icon={faDownload} />}
        colorScheme={colorScheme}
        variant={variant}
        borderRadius={'0.5rem'}
        fontSize={'sm'}
        minW={`6.5rem`}
        paddingBlock="0.38rem"
        paddingInline="1.25rem"
      >
        {`Download`}
      </Button>
    </Box>
  )
}

export default DownloadButton
