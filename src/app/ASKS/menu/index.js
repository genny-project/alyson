import {
  Box,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useTheme,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import labels from 'utils/labels'
import { map } from 'ramda'
import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { compose } from 'ramda'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const AsksMenu = ({
  questionCode,
  hideLabel,
  productSpecificIconBackgroundColour,
  productSpecificIconColour,
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

  const isProductInternmatch = useIsProductInternmatch()

  if (!wholeData?.length) return null
  return (
    <Box>
      <Menu>
        <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
          <VStack color="grey" test-id={questionCode}>
            <Center
              bg={productSpecificIconBackgroundColour || 'product.secondary'}
              color={theme.colors.background.light}
              h={isProductInternmatch ? '10' : '8'}
              w={isProductInternmatch ? '10' : '8'}
              borderRadius="50%"
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
