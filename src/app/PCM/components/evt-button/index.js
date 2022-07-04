import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import useApi from 'api'
import { useSelector } from 'react-redux'
import { startsWith } from 'ramda'
import debugOut from 'utils/debug-out'

const EvtButton = ({ questionCode, childCode, iconId }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  const { getImageSrc } = useApi()
  let src = iconId

  if (iconId) {
    if (!startsWith('http', iconId)) {
      src = getImageSrc(iconId)
    }
  } else {
    debugOut.error(`${questionCode}@${childCode} doesn't have an iconId!`)
  }

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    debugOut.log(data)
    sendAskClick(childCode, childCode)
  }

  if (!childAsks)
    return (
      <VStack
        spacing="4"
        role="group"
        p="0"
        test-id={childCode}
        onClick={handleClick}
        as="button"
        mb={'30px !important'}
        mt={'0 !important'}
      >
        <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
          {iconId ? (
            <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
          ) : (
            <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
          )}
        </Box>
        <Text color="#BDC5CD" mt={'5px !important'} fontSize="12px" fontWeight="400">
          {name}
        </Text>
      </VStack>
    )
  return (
    <Menu placement="right-start">
      <MenuButton test-id={childCode}>
        <VStack
          spacing="4"
          role="group"
          test-id={childCode}
          mb={'30px !important'}
          mt={'0 !important'}
        >
          <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
            {iconId ? (
              <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
            ) : (
              <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
            )}
          </Box>
          <HStack mt={'5px !important'}>
            <Text color="#BDC5CD" fontSize="12px" fontWeight="400">
              {name}
            </Text>
            <FontAwesomeIcon icon={faAngleDown} color="#BDC5CD" />
          </HStack>
        </VStack>
      </MenuButton>

      <MenuList minW="350px" margin="40px 0px 0px 12px">
        {childAsks.map(childAsk => (
          <MenuItem
            onClick={() => {
              sendAskClick(childAsk.questionCode, childAsk.questionCode)
            }}
            test-id={childAsk.questionCode}
            key={childAsk.questionCode}
            _focus={{ bg: '#3AB8B5', color: '#ffffff' }}
            fontSize="14px"
            fontWeight="400"
          >
            {childAsk.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default EvtButton
