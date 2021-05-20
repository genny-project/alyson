import { Box, HStack } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'
import MobileNotes from './mobile'
import NotePanel from './panel'
import Selection from './selection'

const Notes = () => {
  const tabs = safelyParseJson(useSelector(selectNotes), [])

  const isMobile = useIsMobile()

  if (!tabs.length) return null

  if (isMobile) return <MobileNotes />
  return (
    <Box w="full" m="3">
      <Selection />
      <HStack align="start" mt="5" spacing="1">
        {tabs.map(code => (
          <NotePanel code={code} />
        ))}
      </HStack>
    </Box>
  )
}

export default Notes
