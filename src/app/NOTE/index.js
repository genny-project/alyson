import { Box, Center, Text, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { getTabs, getTitle } from './helpers/get-data'
import NotePanel from './panel'
import Selection from './selection'
import TabTop from './tab_top'

const Notes = () => {
  const notes = useSelector(selectNotes)

  const tabs = getTabs(notes)

  return null
  if (!notes)
    return (
      <Center>
        <VStack>
          <CircularProgress isIndeterminate />
          <Text>Fetching Notes</Text>
        </VStack>
      </Center>
    )
  return (
    <Box w="full">
      <Selection />
      <Tabs>
        <TabList>
          {tabs.map(key => (
            <TabTop key={key} rootCode={key} tab={notes[key]} title={getTitle(key)} />
          ))}
        </TabList>
        <TabPanels>
          {tabs.map(key => (
            <TabPanel key={key}>
              <NotePanel tab={notes[key]} title={getTitle(key)} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Notes
