import { Wrap, WrapItem } from '@chakra-ui/react'

import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HStack } from '@chakra-ui/layout'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const ExistingFilters = ({ existingFilters }) => {
  if (!existingFilters?.childAsks) return null

  return (
    <HStack align="flex-start">
      <Wrap w="25vw">
        {existingFilters.childAsks.map(
          ({ sourceCode, targetCode, question: { name, attributeCode, code } }) => (
            <WrapItem key={attributeCode}>
              <Button
                variant="outline"
                leftIcon={<FontAwesomeIcon icon={faTimesCircle} />}
                onClick={() => onSendMessage({ sourceCode, targetCode, attributeCode, code })}
              >
                {name}
              </Button>
            </WrapItem>
          ),
        )}
      </Wrap>
    </HStack>
  )
}

export default ExistingFilters
