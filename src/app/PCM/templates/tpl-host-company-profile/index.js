import { Box, Tab, TabPanel, TabPanels, TabList, Tabs, Grid } from '@chakra-ui/react'
import ContactDetailsCard from 'app/PCM/components/contact-details-card'
import UserCard from 'app/PCM/components/user-card'
import AboutPanel from './tab-panels/about-panel'
import OpportunitiesPanel from './tab-panels/opportunities-panel'
import StaffPanel from './tab-panels/staff-panel'

const TemplateHostCompanyProfile = () => {
  const styling = {
    color: 'black',
    bg: '#CAEAE9',
    border: '1px',
    borderColor: '#829998',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
  }

  return (
    <Box fontFamily={'Almarai'}>
      <Grid
        spacing={0}
        templateColumns={'repeat(2, 1fr)'}
        gap="1rem"
        marginLeft={'1rem'}
        marginTop={'2rem'}
        marginRight={'-5rem'}
        alignItems={'flex-start'}
      >
        <UserCard />
        <ContactDetailsCard />
      </Grid>
      <Tabs variant={'enclosed'} marginTop={'3rem'}>
        <TabList>
          <Tab _selected={styling} fontSize={'20px'}>
            About
          </Tab>
          <Tab _selected={styling} fontSize={'20px'}>
            Opportunities
          </Tab>
          <Tab _selected={styling} fontSize={'20px'}>
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
