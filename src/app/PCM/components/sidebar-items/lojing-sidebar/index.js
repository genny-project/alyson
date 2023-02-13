import { Box, HStack, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import icons from 'utils/icons'
import { iconColor, iconColorOnHighlight, selectedSidebarBoxColor } from 'utils/constants'

const isSelected = false

const LojingSideBarItem = ({ trueQuestionCode, handleClick, name, hasChildIcons }) => {
  console.log('questionCOde ======>', { trueQuestionCode })
  return (
    <Box
      role="group"
      p="0"
      test-id={trueQuestionCode}
      onClick={handleClick}
      as="button"
      w="204px"
      h="64px"
      bg={isSelected && selectedSidebarBoxColor}
      borderRadius="20px"
    >
      <HStack spacing={5} justifyContent="center">
        <Box display="flex" cursor={'pointer'}>
          {icons[trueQuestionCode] ? (
            <FontAwesomeIcon
              icon={icons[trueQuestionCode]}
              size="lg"
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
              color={isSelected ? iconColorOnHighlight : iconColor}
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

export default LojingSideBarItem
