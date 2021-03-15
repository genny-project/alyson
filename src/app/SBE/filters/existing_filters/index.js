import { Button } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onSendMessage } from 'vertx'

const ExistingFilters = ({ existingFilters }) => {
  if (!existingFilters?.childAsks) return null

  return (
    <HStack>
      {existingFilters.childAsks.map(
        ({ sourceCode, targetCode, question: { name, attributeCode, code } }) => (
          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={faTimesCircle} />}
            onClick={() => onSendMessage({ sourceCode, targetCode, attributeCode, code })}
          >
            {name}
          </Button>
        ),
      )}
    </HStack>
  )
}

export default ExistingFilters
