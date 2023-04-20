import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { useIsProductLojing } from 'utils/helpers/check-product-name.js'
import setIconName from 'utils/helpers/getIconNames.js'
import icons from 'utils/icons'

const DefaultEventButton = ({
  childAsks,
  trueQuestionCode,
  iconId,
  src,
  vert,
  name,
  handleClick,
  sourceCode,
  targetCode,
  processId,
}) => {
  const theme = useTheme()
  const isProductLojing = useIsProductLojing()
  const bgColor = isProductLojing ? 'lojing.gradient100' : 'transparent'
  const color = isProductLojing ? theme.colors.text.dark : 'product.secondary'

  if (!childAsks) {
    let box = (
      <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
        {icons[trueQuestionCode] ? (
          <FontAwesomeIcon
            icon={icons[trueQuestionCode]}
            size={'2x'}
            color={isProductLojing ? color : '#AAE3E2'}
            className={`icon icon-${name}`}
          />
        ) : iconId ? (
          <Image boxSize="35px" objectFit={'contain'} src={src} alt="" />
        ) : (
          <Text
            as="span"
            className={`icon icon-${setIconName(name)}`}
            marginInlineEnd={1}
            fontSize={20}
          />
        )}
      </Box>
    )
    let text = (
      <Text
        color={color}
        fontSize={vert ? 12 : 16}
        fontWeight="500"
        textAlign={trueQuestionCode || iconId ? 'start' : 'center'}
        w="full"
      >
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
        rounded={isProductLojing ? 'full' : 'initial'}
      >
        {box}
        {text}
      </VStack>
    ) : (
      <Box
        borderRadius="lg"
        background={bgColor}
        // width={`${name.length + 5}ch`}
        rounded={isProductLojing ? 'full' : 'initial'}
      >
        <HStack
          spacing={iconId || icons[trueQuestionCode] ? 2 : 0}
          role="group"
          paddingBlock={2}
          paddingInline={4}
          test-id={trueQuestionCode}
          onClick={handleClick}
          alignItems={'center'}
          as="button"
          w="full"
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
