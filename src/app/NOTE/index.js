import { Box } from '@chakra-ui/layout'
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import { getTabs, getTitle } from './helpers/get-data'
import NotePanel from './panel'
import Selection from './selection'
import TabTop from './tab_top'

const Notes = () => {
  const notes = useSelector(selectNotes)

  if (!notes) return null

  const rootCode = notes.Tab_Application?.code

  const tabs = getTabs(notes)
  return (
    <Box w="full">
      <Selection />
      <Tabs mt="5">
        <TabList>
          {tabs.map(key => (
            <TabTop
              key={key}
              rootCode={key}
              sourceCode={rootCode}
              tab={notes[key]}
              title={getTitle(key)}
            />
          ))}
        </TabList>
        <TabPanels>
          {tabs.map(key => (
            <TabPanel key={key}>
              <NotePanel
                rootCode={rootCode}
                parentCode={key}
                tab={notes[key]}
                title={getTitle(key)}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Notes
