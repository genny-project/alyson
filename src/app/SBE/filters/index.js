import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { addFilter, removeFilter } from 'redux/app'
import { selectFilters } from 'redux/app/selectors'
import getSorts, { getAsField } from '../utils/get-sorts'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Kbd,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const Filters = ({ sbeCode }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const sourceCode = useSelector(selectCode('USER'))

  const onAddFilter = filter => dispatch(addFilter(filter))
  const onRemoveFilter = filter => dispatch(removeFilter(filter))

  const sorts = getSorts(useSelector(selectCode(sbeCode)))
  const filters = useSelector(selectFilters)

  const sortData = useSelector(selectAttributes(sbeCode, sorts))

  const [newFilter, setNewFilter] = useState({
    sourceCode,
    targetCode: sbeCode,
    attributeCode: null,
    attributeName: '',
  })

  const submitFilter = value => {
    onAddFilter({ ...newFilter, value })
    setNewFilter({
      sourceCode,
      targetCode: sbeCode,
      attributeCode: null,
      attributeName: '',
    })
  }

  useHotkeys('enter', () => submitFilter(inputRef?.current.value), {
    enableOnTags: ['INPUT'],
  })

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
          <PopoverHeader>
            {newFilter.attributeName ? `Filter ${newFilter.attributeName}` : `Pick a Column`}
          </PopoverHeader>
          <PopoverBody>
            {!newFilter.attributeCode ? (
              <Wrap>
                {sortData.map(({ attributeCode, attributeName }) => (
                  <WrapItem key={attributeCode}>
                    <Button
                      test-id={attributeCode}
                      onClick={() =>
                        setNewFilter(f => ({
                          ...f,
                          attributeCode: getAsField(attributeCode),
                          attributeName,
                        }))
                      }
                    >
                      {attributeName}
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            ) : (
              <InputGroup>
                <Input autoFocus ref={inputRef} />
                <InputRightAddon>
                  <Kbd onClick={() => submitFilter(inputRef?.current.value)}>enter</Kbd>
                </InputRightAddon>
              </InputGroup>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {filters.map(filter => (
        <Tag key={filter.attributeCode} colorScheme="blue">
          <TagLabel>{`${filter.attributeName} - ${filter.value}`}</TagLabel>
          <TagCloseButton onClick={() => onRemoveFilter(filter)} />
        </Tag>
      ))}
    </HStack>
  )
}

export default Filters
