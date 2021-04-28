import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Menu, MenuButton, MenuList, VStack, HStack, Text, MenuItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import icons from 'utils/icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import sendAskClick from '../utils/send-ask-click'
import labels from 'utils/labels'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <Menu>
      <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
        <VStack color="grey" test-id={questionCode}>
          <FontAwesomeIcon size="lg" icon={icons[questionCode]} />
          <HStack spacing={1}>
            <Text>{labels[questionCode]}</Text>
            <FontAwesomeIcon icon={faCaretDown} />
          </HStack>
        </VStack>
      </MenuButton>
      <MenuList>
        {data.map(childAsk => (
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
