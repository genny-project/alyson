import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import ExistingFilters from './existing_filters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Filters = ({ sbeCode }) => {
  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`
  const [addFilters, existingFilters] = useSelector(
    selectAttributes(filterGrp, ['QUE_ADD_FILTER_GRP', 'QUE_EXISTING_FILTERS_GRP']),
  )

  if (!addFilters) return null

  return (
    <HStack>
      <Popover isLazy>
        <PopoverTrigger test-id={'filters'}>
          <Button
            leftIcon={<FontAwesomeIcon icon={faFilter} />}
            colorScheme="primary"
            variant="outline"
          >
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent w="30vw">
          <PopoverArrow />
          <PopoverBody>
            <VStack m="5" spacing="5">
              {addFilters.childAsks.map(childAskObject => (
                <Ask
                  passedTargetCode={sbeCode}
                  key={childAskObject.attributeCode}
                  passedAskData={childAskObject}
                />
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ExistingFilters existingFilters={existingFilters} />
    </HStack>
  )
}

export default Filters
