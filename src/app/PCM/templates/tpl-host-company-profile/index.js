import { Box, Text, Tab, TabPanel, TabPanels, TabList, Tabs, HStack } from '@chakra-ui/react'
import ContactDetailsCard from 'app/PCM/components/contact-details-card'
import UserCard from 'app/PCM/components/user-card'
import AboutPanel from './tab-panels/about-panel'
import OpportunitiesPanel from './tab-panels/opportunities-panel'
import StaffPanel from './tab-panels/staff-panel'

const TemplateHostCompanyProfile = () => {
  return (
    <Box>
      <HStack
        marginLeft={'1rem'}
        marginTop={'2rem'}
        spacing={'2rem'}
        marginRight={'-5rem'}
        alignItems={'flex-start'}
      >
        <UserCard />
        <ContactDetailsCard />
      </HStack>
      <Tabs variant={'enclosed'} marginTop={'5rem'}>
        <TabList>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            About
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            Opportunities
          </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }} fontSize={'20px'}>
            Staff
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AboutPanel />
          </TabPanel>
          <TabPanel>
            <OpportunitiesPanel />
          </TabPanel>
          <TabPanel>
            <StaffPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default TemplateHostCompanyProfile
