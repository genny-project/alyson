import { Center, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { getApps } from '../helpers/get-data'
import App from './App'

const Selection = () => {
  const notes = useSelector(selectNotes)

  if (!notes?.Tab_Intern?.linkedAPPs) return null
  const apps = getApps(notes)

  return (
    <HStack align="stretch">
      <Card>
        <Center h="100%">
          <VStack>
            <ImageType.Read data={{ value: notes?.Tab_Intern?.image }} config={{ size: 'lg' }} />
            <Text>{`${notes?.Tab_Intern?.title}`}</Text>
          </VStack>
        </Center>
      </Card>
      <Card variant="card0">
        <Center h="100%">
          <Text>{`is applying for`}</Text>
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
  )
}

export default Selection
