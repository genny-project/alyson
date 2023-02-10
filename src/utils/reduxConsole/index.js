import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import {
  all,
  and,
  any,
  compose,
  equals,
  filter,
  includes,
  is,
  isEmpty,
  keys as rKeys,
  map,
  not,
  replace,
  slice,
  split,
  toPairs,
  zipObj,
} from 'ramda'
import { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCodes, selectKeys } from 'redux/db/selectors'

const ReduxConsole = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const [query, setQuery] = useState('')
  const [loadCount, setLoadCount] = useState(3)
  const keys = useSelector(selectKeys)
  const allObjects = useSelector(selectCodes(keys))
  const objectMap = zipObj(keys, allObjects)
  var displayQuery

  ///allows search for partial keys
  const hasLike = key => compose(any(includes(key)), rKeys)

  ///filters empty items so the search results dont blank out
  const multiSearch = compose(
    map(split(':')),
    filter(compose(not, isEmpty)),
    split(','),
    replace(/, /g, ','),
  )(query)
  const searchType = includes(':')(query) ? 'attribute' : 'code'

  const matchAttribute = item => attribute => {
    ///returns true if value not present, to allow searching for key
    return and(attribute[1] ? includes(attribute[1], item[attribute[0]] ?? '') : true)(
      hasLike(attribute[0])(item),
    )
  }

  const matchingAttributes = item => {
    return all(equals(true))(map(matchAttribute(item[1]), multiSearch))
  }
  const matchingKey = item => {
    return includes(query)(item[0])
  }
  const resultFilter = item => {
    if (searchType == 'code') {
      return matchingKey(item)
    } else {
      return matchingAttributes(item)
    }
  }
  const allResults = filter(resultFilter)(toPairs(objectMap))
  const searchResults = slice(0, loadCount)(allResults)
  const updateSearch = useCallback(
    debounce(e => {
      setQuery(e.target.value)
    }, 300),
    [],
  )

  return (
    <VStack>
      <Button size="xs" onClick={onOpen}>
        redux console
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <FormControl w="40rem">
                <FormLabel>
                  Search - Displaying{' '}
                  {loadCount < searchResults.length ? loadCount : searchResults.length} of{' '}
                  {allResults.length}
                </FormLabel>
                <Input
                  ref={firstField}
                  value={displayQuery}
                  onChange={e => {
                    setLoadCount(3)
                    updateSearch(e)
                  }}
                />
              </FormControl>
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <SearchObjectComponent
                searchResults={searchResults}
                setLoadCount={setLoadCount}
                loadCount={loadCount}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </VStack>
  )
}

export default ReduxConsole

export const isDev =
  process.env.NODE_ENV === 'development' ||
  localStorage.getItem('useDev') === 'true' ||
  (window &&
    (window.location.hostname.indexOf('dev') !== -1 ||
      window.location.hostname.indexOf('staging') !== -1))

/**The parent Search Object Component, contains the object title and children*/
const SearchObjectComponent = ({ searchResults, setLoadCount, loadCount }) => {
  return (
    <VStack alignItems="left" w="40rem" align="stretch">
      {searchResults
        ? searchResults.map((item, index) => (
            <VStack align="start" key={item}>
              <Text>{item[0]}</Text>
              <SearchItemComponent item={item[1]} />
            </VStack>
          ))
        : []}
      <HStack>
        <Button
          onClick={() => {
            setLoadCount(loadCount + 3)
          }}
        >
          Show More
        </Button>
        <Button
          onClick={() => {
            setLoadCount(Infinity)
          }}
        >
          Show All
        </Button>
        {loadCount != 3 ? (
          <Button
            onClick={() => {
              setLoadCount(3)
            }}
          >
            Reset
          </Button>
        ) : (
          <></>
        )}
      </HStack>
    </VStack>
  )
}

const SearchItemComponent = ({ item }) => {
  return (
    <Box px="5">
      {is(Object, item) ? (
        Object.keys(item).map(key => (
          <Stack
            direction={is(Object, item[key]) ? 'column' : 'row'}
            key={key}
            alignItems="flex-start"
            spacing={0}
          >
            <Text pr="1">{key}:</Text>
            {typeof item[key] === 'object' ? (
              <SearchItemDropdownComponent item={item[key]} key={key} />
            ) : (
              <Text>{String(item[key])}</Text>
            )}
          </Stack>
        ))
      ) : (
        <Text>{item}</Text>
      )}
    </Box>
  )
}

const SearchItemDropdownComponent = ({ item }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton margin="0" padding={'0'} textAlign="left">
          <Box flex="1">Expand {rKeys(item).length} items</Box>
        </AccordionButton>
        <AccordionPanel>
          <HStack borderLeft={'solid lightgrey 2px'}>
            <SearchItemComponent item={item} />
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
