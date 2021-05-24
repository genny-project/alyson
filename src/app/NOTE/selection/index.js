import { Wrap, WrapItem } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { head } from 'ramda'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { useIsMobile } from 'utils/hooks'
import App from './App'

const Selection = () => {
  const notes = safelyParseJson(useSelector(selectNotes), [])
  const code = head(notes)
  const linkedApps = useSelector(selectCode(code, 'linkedApps'))

  const isMobile = useIsMobile()

  if (!linkedApps) return null

  if (isMobile)
    return (
      <Card p="3" variant="card0" w="90vw" maxH="26vh" overflowY="scroll" overflowX="hidden">
        <Wrap h="full" justify="center">
          {linkedApps.map(code => (
            <WrapItem key={code}>
              <App code={code} />
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    )
  return (
    <Card variant="card0" p="3">
      <Wrap maxW="85vw" maxH="80vh" overflowY="scroll" overflowX="hidden">
        {linkedApps.map(code => (
          <WrapItem key={code}>
            <App code={code} />
          </WrapItem>
        ))}
      </Wrap>
    </Card>
  )
}

export default Selection
