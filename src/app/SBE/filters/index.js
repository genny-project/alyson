import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
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
import ExistingFilters from './existing_filters'

const Filters = ({ sbeCode }) => {
  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`
  const [addFilters, existingFilters] = useSelector(
    selectAttributes(filterGrp, ['QUE_ADD_FILTER_GRP', 'QUE_EXISTING_FILTERS_GRP']),
  )

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
          <PopoverBody>
            {addFilters.childAsks.map(childAskObject => (
              <Ask
                passedTargetCode={sbeCode}
                key={childAskObject.attributeCode}
                passedAskData={childAskObject}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ExistingFilters existingFilters={existingFilters} />
    </HStack>
  )
}

export default Filters
