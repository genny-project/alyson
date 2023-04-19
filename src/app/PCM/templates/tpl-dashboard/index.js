import { TabList, Tabs, Tab, TabPanels, TabPanel, HStack, Text, Box } from '@chakra-ui/react'
import ProfileStatisticsCard from 'app/PCM/components/profile-statistics-card'
import ProfileStatusCard from 'app/PCM/components/profile-status'
import ApplicationsPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/applications-panel'
import EventsPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/events-panel'
import TrainingPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/training-panel'

const TemplateDashboard = () => {
  return (
    <Box>
      <Text fontSize={'36px'} marginLeft={'1.5rem'} marginTop={'-1.5rem'} alignItems={'flex-start'}>
        Dashboard
      </Text>
      <HStack marginLeft={'1rem'} marginTop={'2rem'} spacing={'2rem'} marginRight={'-5rem'}>
        <ProfileStatusCard />
        <ProfileStatisticsCard />
      </HStack>
      <Tabs variant={'enclosed'} marginTop={'5rem'}>
        <TabList>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            Events
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            Training
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            Applications
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EventsPanel />
          </TabPanel>
          <TabPanel>
            <TrainingPanel />
          </TabPanel>
          <TabPanel>
            <ApplicationsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default TemplateDashboard
