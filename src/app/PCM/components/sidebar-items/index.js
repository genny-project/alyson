import { Box, HStack, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import icons from 'utils/icons'
import { iconColour } from 'utils/constants'

const SidebarItems = ({ trueQuestionCode, handleClick, name, hasChildIcons }) => {
  return (
    <Box
      role="group"
      p="0"
      test-id={trueQuestionCode}
      onClick={handleClick}
      as="button"
      minW="70%"
      justifyContent="center"
    >
      <HStack spacing={5}>
        <Box display="flex" alignItems="center" justifyContent="center" cursor={'pointer'}>
          {icons[trueQuestionCode] ? (
            <FontAwesomeIcon icon={icons[trueQuestionCode]} size="lg" color={iconColour} />
          ) : (
            <Box />
          )}
        </Box>
        {hasChildIcons ? (
          <HStack>
            <Text textStyle="internmatch.iconText">{name}</Text>
            <FontAwesomeIcon icon={faAngleDown} color="#FFFFFF" />
          </HStack>
        ) : (
          <Text textStyle="internmatch.iconText">{name}</Text>
        )}
      </HStack>
    </Box>
  )
}

export default SidebarItems
