import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const DownloadButton = ({ urlLink = 'https://internmatch.io/' }) => {
  const onClick = downloadQuality => {
    const videoDownloadLink = urlLink.replace('videoQuality', downloadQuality)
    window.open(videoDownloadLink, '_self')
  }

  return (
    <Menu>
      <MenuButton
        colorScheme="primary"
        as={Button}
        rightIcon={<FontAwesomeIcon icon={faArrowDown} />}
      >
        {'Download'}
      </MenuButton>

      <MenuList>
        <MenuItem onClick={() => onClick('360')}>{'360p'}</MenuItem>
        <MenuItem onClick={() => onClick('720')}>{'720p'}</MenuItem>
        <MenuItem onClick={() => onClick('original')}>{'Original'}</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default DownloadButton
