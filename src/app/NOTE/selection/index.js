import { Center, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { getApps } from '../helpers/get-data'
import App from './App'

const Selection = () => {
  const notes = useSelector(selectNotes)

  if (!notes?.linkedApps) return null
  const apps = getApps(notes)

  return (
    <VStack align="start" m="5">
      <Text textStyle="head3">Please narrow down selection</Text>
      <HStack align="stretch">
        <Card>
          <Center h="100%">
            <VStack>
              <ImageType.Read data={{ value: notes?.Tab_Intern?.image }} config={{ size: 'lg' }} />
              <Text>{`${notes?.Tab_Intern?.title}`}</Text>
            </VStack>
          </Center>
        </Card>
        <Card variant="card0" w="8rem">
          <Center h="100%">
            <Text textStyle="body3" textAlign="center">{`has these applications`}</Text>
          </Center>
        </Card>
        <Wrap>
          {apps.map(code => (
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
