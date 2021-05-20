import { Center, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import ImageType from 'app/DTT/upload/Image'
import Card from 'app/layouts/components/card'
import { head, includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import App from './App'

const Selection = () => {
  const notes = safelyParseJson(useSelector(selectNotes), [])
  const code = head(notes)
  const linkedApps = useSelector(selectCode(code, 'linkedApps'))

  console.log(code)
  if (!linkedApps) return null

  return (
    <VStack m="5">
      <HStack align="stretch">
        <Card variant="card0" w="8rem">
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
    </VStack>
  )
}

export default Selection
