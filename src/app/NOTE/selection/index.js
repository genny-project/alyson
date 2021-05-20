import { Center, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
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
      <VStack>
        <Text textStyle="tail.1" textAlign="center">{`Applications`}</Text>
        <Wrap h="full" justify="center">
          {linkedApps.map(code => (
            <WrapItem key={code}>
              <App code={code} />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    )
  return (
    <HStack align="stretch" spacing="5">
      <Card variant="card0" w="9vw">
        <Center h="100%">
          <Text textStyle="body.3" textAlign="center">{`has these applications`}</Text>
        </Center>
      </Card>
      <Wrap h="full">
        {linkedApps.map(code => (
          <WrapItem key={code}>
            <App code={code} />
          </WrapItem>
        ))}
      </Wrap>
    </HStack>
  )
}

export default Selection
