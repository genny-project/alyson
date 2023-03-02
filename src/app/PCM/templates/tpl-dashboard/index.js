import { TabList, Tabs, Tab, TabPanels, TabPanel, HStack } from '@chakra-ui/react'
import ProfileStatisticsCard from 'app/PCM/components/profile-statistics-card'
import ProfileStatusCard from 'app/PCM/components/profile-status'
import ApplicationsPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/applications-panel'
import EventsPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/events-panel'
import TrainingPanel from 'app/PCM/templates/tpl-dashboard/tab-panels/training-panel'

const TemplateDashboard = () => {
  return (
    <>
      <HStack marginLeft={'4rem'}>
        <ProfileStatusCard />
        <ProfileStatisticsCard />
      </HStack>
      <Tabs variant={'enclosed'}>
        <TabList>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            {' '}
            Events{' '}
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            {' '}
            Training{' '}
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            {' '}
            Applications{' '}
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
    </>
  )
}

export default TemplateDashboard
