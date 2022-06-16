import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  Stack,
  VStack,
} from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import ExistingFilters from './existing_filters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { useIsMobile } from 'utils/hooks'

const Filters = ({ sbeCode }) => {
  const triggerRef = useRef()
  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`
  const [addFilters, existingFilters] = useSelector(
    selectAttributes(filterGrp, ['QUE_ADD_FILTER_GRP', 'QUE_EXISTING_FILTERS_GRP']),
  )

  const onToggle = () => {
    if (triggerRef.current) {
      triggerRef.current.click()
    }
  }

  const isMobile = useIsMobile()

  if (!addFilters) return null

  return (
    <Stack direction={isMobile ? 'column' : 'row'}>
      <Popover isLazy>
        <PopoverTrigger>
          <Button
            test-id={sbeCode + '-FILTERS'}
            ref={triggerRef}
            leftIcon={<FontAwesomeIcon icon={faFilter} />}
            colorScheme="primary"
            variant="outline"
            w="full"
          >
            {`Filters`}
          </Button>
        </PopoverTrigger>
        <PopoverContent w={isMobile ? '90vw' : '30vw'}>
          <PopoverArrow />
          <PopoverBody>
            <VStack m="5" spacing="5">
              {addFilters.childAsks.map(childAskObject => (
                <Ask
                  passedTargetCode={sbeCode}
                  key={childAskObject.attributeCode}
                  passedAskData={childAskObject}
                  onFinish={onToggle}
                  config={{ simpleSelect: true }}
                  parentCode={`QUE_ADD_FILTER_GRP`}
                />
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ExistingFilters existingFilters={existingFilters} />
    </Stack>
  )
}

export default Filters
