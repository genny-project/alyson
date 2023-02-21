import { Box, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import icons from 'utils/icons'

const LojingSideBarItem = ({ trueQuestionCode, handleClick, name, hasChildIcons }) => {
  return (
    <Box role="group" p="0" test-id={trueQuestionCode} onClick={handleClick} as="button">
      <VStack spacing={2} justifyContent="flex-start">
        <Box display="flex" cursor={'pointer'}>
          {icons[trueQuestionCode] ? (
            <FontAwesomeIcon icon={icons[trueQuestionCode]} size="2x" color="#AAE3E2" />
          ) : (
            <Box />
          )}
        </Box>
        {hasChildIcons ? (
          <VStack>
            <Text color="#FFFFFF" fontSize="12" fontWeight="700">
              {name}
            </Text>
            <FontAwesomeIcon icon={faAngleDown} color="#BDC5CD" />
          </VStack>
        ) : (
          <Text color="#FFFFFF" fontSize="12" fontWeight="700">
            {name}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default LojingSideBarItem
