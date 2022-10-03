import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import SavedSearchDropdown from './saved-search-dropdown'
import SavedSearchRow from './saved-search-row'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import SavedSearchValue from './saved-search-value'

const SavedSearches = ({ sbeCode }) => {
  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`
  const addFilters = useSelector(selectCode(filterGrp, 'QUE_ADD_FILTER_GRP'))

  console.log(addFilters.childAsks)

  const [columnRows, setColumnRows] = useState(undefined)
  const [columnSelect, setColumnSelect] = useState(undefined)

  const [operatorRows, setOperatorRows] = useState(undefined)
  const [operatorSelect, setOperatorSelect] = useState(undefined)

  const [valueRows, setValueRows] = useState(undefined)
  const [value, setValue] = useState(undefined)

  const [rows, setRows] = useState([])

  const inputWidth = '20ch'

  return (
    <Box>
      <Popover isLazy>
        <PopoverTrigger>
          <Button variant="outline" w="full">
            {`Saved Searches`}
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="#fff" borderRadius={'md'} w={'100%'}>
          <PopoverBody w={'100%'}>
            <VStack w={'100%'}>
              {rows.map((row, index) => {
                return (
                  <Box key={`SAVED-SEARCH-ROW-${index}`}>
                    <SavedSearchRow row={row} />
                  </Box>
                )
              })}

              <HStack>
                <SavedSearchDropdown
                  w={inputWidth}
                  parentCode={'QUE_ADD_FILTER_GRP'}
                  questionCode={'QUE_FILTER_COLUMN'}
                  onChange={option => setColumnSelect(option)}
                />
                <SavedSearchDropdown
                  parentCode={'QUE_ADD_FILTER_GRP'}
                  w={inputWidth}
                  disabled={!columnSelect}
                  questionCode={'QUE_FILTER_OPTION'}
                  onChange={option => setOperatorSelect(option)}
                />
                <SavedSearchValue w={inputWidth} disabled={!operatorSelect} placeholder={'Value'} />
                <IconButton isDisabled={!value} icon={<FontAwesomeIcon icon={faPlusCircle} />} />
              </HStack>
            </VStack>
          </PopoverBody>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default SavedSearches
