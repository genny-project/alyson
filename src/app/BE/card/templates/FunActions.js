import { Box } from '@chakra-ui/react'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Action from 'app/BE/action'
import { includes } from 'ramda'

const FunActions = ({ code: targetCode, parentCode }) => {
  return (
    <Box opacity="0.6">
      <Action
        colorScheme="primary"
        code={
          includes('APP_', targetCode)
            ? 'ACT_PRI_EVENT_ACCESS_NOTES_APPLICATION'
            : 'ACT_PRI_EVENT_ACCESS_NOTES_INTERN'
        }
        targetCode={targetCode}
        parentCode={parentCode}
        icon={<FontAwesomeIcon icon={faClipboard} />}
      />
    </Box>
  )
}
export default FunActions
