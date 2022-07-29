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
  useTheme,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debugOut from 'utils/debug-out'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { startsWith } from 'ramda'
import useApi from 'api'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useSelector } from 'react-redux'

const EvtButton = ({ questionCode, childCode, iconId, vert }) => {
  const theme = useTheme()
  const data = useSelector(selectCode(questionCode, childCode))

  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))
  const sourceCode = useSelector(selectCode(questionCode, 'sourceCode'))
  const processId = useSelector(selectCode(questionCode, 'processId'))
  const attrCode = useSelector(selectCode(questionCode, 'attributeCode'))

  const bgColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'

  const color = theme.colors.text.dark

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
    sendEvtClick({
      targetCode: targetCode,
      sourceCode: sourceCode,
      parentCode: questionCode,
      code: childCode,
      attributeCode: attrCode,
      processId: processId,
    })
  }

  if (!childAsks) {
    let box = (
      <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
        {iconId ? (
          <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
        ) : (
          <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
        )}
      </Box>
    )
    let text = (
      <Text color={color} fontSize={vert ? 12 : 15} fontWeight="700">
        {name}
      </Text>
    )

    return vert ? (
      <VStack
        spacing={2}
        role="group"
        p="0"
        test-id={childCode}
        onClick={handleClick}
        as="button"
        w={'full'}
      >
        {box}
        {text}
      </VStack>
    ) : (
      <Box padding={1} borderRadius="lg" background={bgColor}>
        <HStack
          spacing={2}
          role="group"
          p="0"
          test-id={childCode}
          onClick={handleClick}
          as="button"
          w={'full'}
        >
          {box}
          {text}
        </HStack>
      </Box>
    )
  }
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
            <Text fontSize="12px" fontWeight="400" color={color}>
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
              sendEvtClick({
                code: childAsk.questionCode,
                parentCode: childAsk.questionCode,
                attributeCode: childAsk.attributeCode,
                sourceCode: sourceCode,
                targetCode: targetCode,
                processId: processId,
              })
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
