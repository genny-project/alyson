import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProcessSearchDefaultView from 'app/SBE/search/DefaultView'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const ProcessSearchMobileView = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="Search " icon={<FontAwesomeIcon icon={faSearch} />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <ProcessSearchDefaultView />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default ProcessSearchMobileView
