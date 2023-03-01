import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

const TemplateDashboard = () => {
  return (
    <>
      <Tabs variant={'enclosed'} borderColor={'#D3E3E2'} border>
        <TabList>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}> Events </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}> Training </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}> Applications </Tab>
        </TabList>

        <TabPanels>
          <TabPanel bg={'#CAEAE9'} maxW={'100vw'} maxH={'100vh'}>
            {'events tab panel'}
          </TabPanel>

          <TabPanel>{'Training tab panel'}</TabPanel>

          <TabPanel>{'Application tab panel'}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TemplateDashboard
