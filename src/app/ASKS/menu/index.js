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
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import labels from 'utils/labels'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import sendEvtClick from '../utils/send-evt-click'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const AsksMenu = ({ questionCode, hideLabel }) => {
  const data = useSelector(selectCode(questionCode))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))
  const labelsAndQuestionCode = map(({ questionCode, name, attributeCode }) => ({
    label: name,
    code: questionCode,
    attributeCode: attributeCode,
  }))(wholeData || [])

  const sourceCode = useSelector(selectCode(questionCode, 'sourceCode'))
  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))
  const processId = useSelector(selectCode(questionCode, 'processId'))

  const isMobile = useIsMobile()

  if (!data?.length) return null
  return (
    <Box>
      <Menu>
        <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
          <VStack color="grey" test-id={questionCode}>
            <Center bg="#03DAC5" h="10" w="10" borderRadius="50%">
              <FontAwesomeIcon size="lg" icon={icons[questionCode]} color="#234371" />
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
