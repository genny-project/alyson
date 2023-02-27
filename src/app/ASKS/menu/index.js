import {
  Box,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react'
import { compose, map } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { setCurrentSidebarItem } from 'redux/app'
import { selectCodeUnary } from 'redux/db/selectors'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import { useIsMobile } from 'utils/hooks'
import icons from 'utils/icons'
import labels from 'utils/labels'

const AsksMenu = ({
  questionCode,
  hideLabel,
  productSpecificIconBackgroundColour,
  productSpecificIconColour,
  iconBorder,
  iconShadow,
}) => {
  let theme = useTheme()
  let wholeData = compose(useSelector, selectCodeUnary(questionCode))('wholeData')
  let labelsAndQuestionCode = map(({ questionCode, name, attributeCode }) => ({
    label: name,
    code: questionCode,
    attributeCode,
  }))(wholeData || [])

  const getAskInformationBasedOnKey = compose(useSelector, selectCodeUnary(questionCode))
  const sourceCode = getAskInformationBasedOnKey('sourceCode')
  const targetCode = getAskInformationBasedOnKey('targetCode')
  const processId = getAskInformationBasedOnKey('processId')

  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const dispatchSetCurrentSidebarItem = compose(dispatch, setCurrentSidebarItem)
  const isProductInternmatch = useIsProductInternmatch()

  if (!wholeData?.length) return null
  return (
    <Box>
      <Menu>
        <MenuButton
          opacity={isProductInternmatch ? 1 : 0.8}
          _hover={{ opacity: 1 }}
          test-id={questionCode}
        >
          <VStack color="grey" test-id={questionCode}>
            <Center
              bg={productSpecificIconBackgroundColour || 'product.secondary'}
              color={theme.colors.background.light}
              h={isProductInternmatch ? '10' : '8'}
              w={isProductInternmatch ? '10' : '8'}
              borderRadius="50%"
              border={iconBorder}
              filter={iconShadow}
            >
              <FontAwesomeIcon
                icon={icons[questionCode]}
                color={productSpecificIconColour || 'inherit'}
              />
            </Center>
            {!isMobile && !hideLabel && (
              <HStack spacing={1}>
                <Text fontSize="xs" color="#234371">
                  {labels[questionCode]}
                </Text>
                <FontAwesomeIcon icon={faCaretDown} />
              </HStack>
            )}
          </VStack>
        </MenuButton>
        <MenuList>
          {map(({ label, code, attributeCode }) => (
            <MenuItem
              onClick={() => {
                dispatchSetCurrentSidebarItem(null)
                sendEvtClick({
                  code: code,
                  parentCode: questionCode,
                  sourceCode: sourceCode,
                  targetCode: targetCode,
                  processId: processId,
                  attributeCode: attributeCode,
                })
              }}
              test-id={code}
              key={code}
              fontSize={'sm'}
            >
              {label}
            </MenuItem>
          ))(labelsAndQuestionCode || [])}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AsksMenu
