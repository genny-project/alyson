import { HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose, map } from 'ramda'
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
  const labelsAndQuestionCode = compose(
    map(({ questionCode, name }) => ({ label: name, code: questionCode })),
  )(wholeData)

  const isMobile = useIsMobile()

  if (!data?.length) return null

  return (
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
  )
}

export default AsksMenu
