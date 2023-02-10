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
import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { equals, startsWith, compose } from 'ramda'
import useApi from 'api'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useSelector } from 'react-redux'

const EvtButton = ({ questionCode, childCode, iconId, vert, isNotChildAsk = false, value }) => {
  const data = compose(useSelector, selectCodeUnary(questionCode))(childCode)

  const theme = useTheme()
  const bgColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'
  const color = theme.colors.text.dark

  const targetCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode')
  const sourceCode = compose(useSelector, selectCodeUnary(questionCode))('sourceCode')
  const processId = compose(useSelector, selectCodeUnary(questionCode))('processId')
  const attrCode = compose(useSelector, selectCodeUnary(questionCode))('attributeCode')

  const trueQuestionCode = isNotChildAsk ? questionCode : childCode

  const { getImageSrc } = useApi()
  let src = iconId

  if (!!iconId) {
    if (!startsWith('http', iconId)) {
      src = getImageSrc(iconId)
    }
  } else if (vert) {
    debugOut.error(`${questionCode}@${childCode} doesn't have an iconId!`)
  }

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    const pid = equals(data['processId'] || 'no-idq')('no-idq') ? processId : data['processId']

    sendEvtClick({
      targetCode: targetCode,
      sourceCode: sourceCode,
      parentCode: isNotChildAsk ? undefined : questionCode,
      code: trueQuestionCode,
      attributeCode: attrCode,
      value: value,
      processId: pid,
    })
  }

  let box = (
    <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
      {icons[trueQuestionCode] ? (
        <FontAwesomeIcon icon={icons[trueQuestionCode]} size="2x" color="#AAE3E2" />
      ) : iconId ? (
        <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
      ) : (
        <Box />
      )}
    </Box>
  )
  let text = (
    <Text color={color} fontSize={vert ? 12 : 15} fontWeight="700">
      {name}
    </Text>
  )

  if (!childAsks) {
    return vert ? (
      <Box
        role="group"
        p="0"
        test-id={trueQuestionCode}
        onClick={handleClick}
        as="button"
        minW="70%"
        justifyContent="center"
      >
        <HStack spacing={5}>
          {box}
          {text}
        </HStack>
      </Box>
    ) : (
      <Box padding={1} borderRadius="lg" background={bgColor}>
        <HStack
          spacing={iconId || icons[trueQuestionCode] ? 2 : 0}
          role="group"
          p="1"
          test-id={trueQuestionCode}
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
    <Box minW="70%">
      <Menu placement="right-start">
        <MenuButton test-id={trueQuestionCode}>
          <Box
            role="group"
            p="0"
            test-id={trueQuestionCode}
            onClick={handleClick}
            as="button"
            justifyContent="center"
          >
            <HStack spacing={5}>
              {iconId ? (
                <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
              ) : (
                <FontAwesomeIcon icon={icons[trueQuestionCode]} size="2x" color="#AAE3E2" />
              )}
              <HStack>
                <Text fontSize="12px" fontWeight="400" color={color}>
                  {name}
                </Text>
                <FontAwesomeIcon icon={faAngleDown} color="#BDC5CD" />
              </HStack>
            </HStack>
          </Box>
        </MenuButton>

        <MenuList minW="350px">
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
    </Box>
  )
}

export default EvtButton
