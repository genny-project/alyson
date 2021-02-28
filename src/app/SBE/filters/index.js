import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  HStack,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Ask from 'app/ASKS/ask'

const Filters = ({ sbeCode }) => {
  const [addFilters, existingFilters] = useSelector(
    selectAttributes(`QUE_FILTER_GRP_${sbeCode}`, [
      'QUE_ADD_FILTER_GRP',
      'QUE_EXISTING_FILTERS_GRP',
    ]),
  )

  console.log(addFilters, existingFilters)

  if (!addFilters) return null

  return (
    <HStack>
      <Popover>
        <PopoverTrigger>
          <Button
            color="GrayText"
            leftIcon={<FontAwesomeIcon icon={faFilter} />}
            test-id={'filters'}
          >
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {addFilters.childAsks.map(childAskObject => (
              <Ask passedAskData={childAskObject} />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}

export default Filters
