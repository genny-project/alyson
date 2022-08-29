import { HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map } from 'ramda'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

import icons from 'utils/icons'
import labels from 'utils/labels'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from '../utils/send-ask-click'
import { useIsMobile } from 'utils/hooks'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))
  const labelsAndQuestionCode = map(({ questionCode, name }) => ({
    label: name,
    code: questionCode,
  }))(wholeData || [])

  const isMobile = useIsMobile()

  if (!data?.length) return null

  return (
    <Box>
      <Menu>
        <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
          <VStack color="grey" test-id={questionCode}>
            <FontAwesomeIcon size="lg" icon={icons[questionCode]} />
            {!isMobile && (
              <HStack spacing={1}>
                <Text fontSize="xs">{labels[questionCode]}</Text>
                <FontAwesomeIcon icon={faCaretDown} />
              </HStack>
            )}
          </VStack>
        </MenuButton>
        <MenuList>
          {map(({ label, code }) => (
            <MenuItem
              onClick={() => {
                sendAskClick(questionCode, code)
              }}
              test-id={code}
              key={code}
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
