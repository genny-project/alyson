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
import { compose, map } from 'ramda'
import { faCaretDown, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import icons from 'utils/icons'
import labels from 'utils/labels'
import { selectCodeUnary } from 'redux/db/selectors'
import sendEvtClick from 'app/ASKS/utils/send-evt-click'
import { setCurrentSidebarItem } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'

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
  const isProductLojing = useIsProductLojing()

  if (!wholeData?.length) return null
  return (
    <Box>
      <Menu>
        {({ isOpen }) => (
          <>
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

            <MenuList
              w={isProductInternmatch && isMobile ? 'auto' : isProductLojing ? 'auto' : '22rem'}
              p={0}
              bg={isProductInternmatch ? 'internmatch.primary' : 'white'}
              borderRadius={isProductInternmatch ? '1.88rem' : '0.5rem'}
              overflow={'hidden'}
              transform={
                isProductInternmatch && isOpen ? 'translate(2px, -57px) !important' : 'none'
              }
            >
              {isOpen && isProductInternmatch && (
                <MenuItem
                  border={'1px solid'}
                  borderColor={'internmatch.primary'}
                  bg={'internmatch.primary400'}
                  borderRadius={'4rem'}
                  color={'internmatch.primary'}
                  _focus={{ bg: 'internmatch.primary400' }}
                >
                  <Text
                    w={'full'}
                    padding={'.5rem 1.5rem'}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    {'Add'}
                  </Text>
                  <FontAwesomeIcon icon={faPlus} />
                </MenuItem>
              )}
              {map(({ label, code, attributeCode, index }) => (
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
                  color={isProductInternmatch ? 'white' : 'inherit'}
                  paddingInline={0}
                  _hover={{
                    backgroundColor: isProductInternmatch ? 'internmatch.secondary' : '#EEE',
                  }}
                  _active={{
                    backgroundColor: isProductInternmatch ? 'internmatch.secondary' : '#EEE',
                  }}
                  _focus={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Text
                    role="group"
                    w={'full'}
                    padding={isProductInternmatch ? '.5rem 1.5rem' : '.15rem 1.5rem'}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    {label}
                    {isProductInternmatch ? (
                      <Box
                        as="span"
                        marginInlineStart={'auto'}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Box>
                    ) : null}
                  </Text>
                </MenuItem>
              ))(labelsAndQuestionCode || [])}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  )
}

export default AsksMenu
