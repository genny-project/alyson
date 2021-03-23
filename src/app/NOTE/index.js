import { Center, Text, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import NotePanel from './panel'
import TabTop from './tab_top'

const Notes = () => {
  const notesTargets = useSelector(selectNotes)

  if (!notesTargets || !notesTargets.length)
    return (
      <Center>
        <VStack>
          <CircularProgress isIndeterminate />
          <Text>Fetching Notes</Text>
        </VStack>
      </Center>
    )
  return (
    <Tabs>
      <TabList>
        {notesTargets.map(targetCode => (
          <TabTop targetCode={targetCode} />
        ))}
      </TabList>
      <TabPanels>
        {notesTargets.map(targetCode => (
          <TabPanel key={targetCode}>
            <NotePanel targetCode={targetCode} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default Notes
