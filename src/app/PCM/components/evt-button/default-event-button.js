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
import sendEvtClick from 'app/ASKS/utils/send-evt-click'

const DefaultEventButton = ({
  childAsks,
  trueQuestionCode,
  iconId,
  src,
  color,
  vert,
  name,
  handleClick,
  bgColor,
  sourceCode,
  targetCode,
  processId,
}) => {
  if (!childAsks) {
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

    return vert ? (
      <VStack
        spacing={2}
        role="group"
        p="0"
        test-id={trueQuestionCode}
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
    <Menu placement="right-start">
      <MenuButton test-id={trueQuestionCode}>
        <VStack spacing="4" role="group" test-id={trueQuestionCode}>
          <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
            {iconId ? (
              <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
            ) : (
              <FontAwesomeIcon icon={icons[trueQuestionCode]} size="2x" color="#AAE3E2" />
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

export default DefaultEventButton
