import { HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import labels from 'utils/labels'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from '../utils/send-ask-click'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  const isMobile = useIsMobile()

  if (!data?.length) return null

  return (
    <Menu>
      <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
        <VStack color="grey" test-id={questionCode}>
          <FontAwesomeIcon size="lg" icon={icons[questionCode]} />
          {!isMobile && (
            <HStack spacing={1}>
              <Text fontSize="xs">{labels[questionCode]}</Text>
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          )}
        </VStack>
      </MenuButton>
      <MenuList>
        {data?.map(childAsk => (
          <MenuItem
            onClick={() => {
              sendAskClick(questionCode, childAsk)
            }}
            test-id={childAsk}
            key={childAsk}
          >
            {labels[childAsk]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default AsksMenu
