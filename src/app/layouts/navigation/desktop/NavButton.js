import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { selectLastSent } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import icons from 'utils/icons'
import labels from 'utils/labels'

const NavButton = ({ code, questionCode }) => {
  const data = useSelector(selectCode(questionCode, code))
  const lastCode = pathOr('', ['data', 'data', 'code'], useSelector(selectLastSent))

  if (!data) return null

  const { childAsks } = data

  const handleClick = () => {
    sendAskClick(code, code)
  }

  if (!childAsks)
    return (
      <VStack
        opacity={0.8}
        test-id={code}
        _hover={{ opacity: 1 }}
        cursor="pointer"
        color="grey"
        onClick={handleClick}
        spacing={0}
      >
        <FontAwesomeIcon size="lg" icon={icons[code]} />
        <Text pt="8px">{labels[code]}</Text>
        <Box
          w="100%"
          h="2px"
          bg="lightgrey"
          opacity={lastCode === code ? 1 : 0}
          transition="opacity 0.5s ease"
        />
      </VStack>
    )

  return (
    <Menu>
      <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={code}>
        <VStack color="grey" test-id={code}>
          <FontAwesomeIcon size="lg" icon={icons[code]} />
          <HStack spacing={0.5}>
            <Text>{labels[code]}</Text>
            <FontAwesomeIcon icon={faCaretDown} />
          </HStack>
        </VStack>
      </MenuButton>
      <MenuList>
        {childAsks.map(childAsk => (
          <MenuItem
            onClick={() => {
              sendAskClick(childAsk.questionCode, childAsk.questionCode)
            }}
            test-id={childAsk.questionCode}
            key={childAsk.questionCode}
          >
            {childAsk.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default NavButton
