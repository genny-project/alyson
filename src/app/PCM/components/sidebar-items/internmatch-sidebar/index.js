import { Box, HStack, Text } from '@chakra-ui/react'
import { iconColor, iconColorOnHighlight, selectedSidebarBoxColor } from 'utils/constants'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import icons from 'utils/icons'

const InternmatchSideBarItem = ({ trueQuestionCode, handleClick, name, hasChildIcons }) => {
  const isSelected = trueQuestionCode === 'QUE_DASHBOARD'

  return (
    <Box
      role="group"
      test-id={trueQuestionCode}
      onClick={handleClick}
      as="button"
      w="204px"
      h="64px"
      bg={isSelected && selectedSidebarBoxColor}
      borderRadius="20px"
      paddingX="1.5rem"
    >
      <HStack spacing={5}>
        <Box display="flex" cursor={'pointer'} width={'1.38rem'} height={'1.38rem'}>
          {icons[trueQuestionCode] ? (
            <FontAwesomeIcon
              size={'lg'}
              icon={icons[trueQuestionCode]}
              color={isSelected ? iconColorOnHighlight : iconColor}
            />
          ) : (
            <Box />
          )}
        </Box>
        {hasChildIcons ? (
          <HStack>
            <Text
              textStyle={isSelected ? 'internmatch.iconTextOnHighlight' : 'internmatch.iconText'}
            >
              {name}
            </Text>
            <FontAwesomeIcon
              icon={faAngleDown}
              color={trueQuestionCode === 'QUE_DASHBOARD' ? iconColorOnHighlight : iconColor}
            />
          </HStack>
        ) : (
          <Text textStyle={isSelected ? 'internmatch.iconTextOnHighlight' : 'internmatch.iconText'}>
            {name}
          </Text>
        )}
      </HStack>
    </Box>
  )
}

export default InternmatchSideBarItem
