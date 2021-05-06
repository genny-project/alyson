import { HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
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
        test-id={code}
        _hover={{ opacity: 1 }}
        opacity={0.8}
        cursor="pointer"
        color={lastCode === code ? 'primary.500' : 'grey'}
        onClick={handleClick}
      >
        <FontAwesomeIcon size="lg" icon={icons[code]} />
        <Text textStyle="tail2">{labels[code]}</Text>
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
