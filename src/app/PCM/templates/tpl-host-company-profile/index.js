import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import ContactDetailsCard from 'app/PCM/components/contact-details-card'
import UserCard from 'app/PCM/components/user-card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import AboutPanel from './tab-panels/about-panel'
import OpportunitiesPanel from './tab-panels/opportunities-panel'
import StaffPanel from './tab-panels/staff-panel'

const TemplateHostCompanyProfile = ({ mappedPcm }) => {
  const pcmCode = mappedPcm?.PRI_LOC2 || ''
  const questionCode = useSelector(selectCode(pcmCode, 'PRI_QUESTION_CODE'))?.value
  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))

  const styling = {
    color: 'black',
    bg: '#CAEAE9',
    border: '1px',
    borderColor: '#829998',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
  }

  const tabLists = [
    { title: 'About', panel: <AboutPanel targetCode={targetCode} /> },
    { title: 'Opportunities', panel: <OpportunitiesPanel targetCode={targetCode} /> },
    { title: 'Staff', panel: <StaffPanel targetCode={targetCode} /> },
  ]

  return (
    <>
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
          <UserCard targetCode={targetCode} />
          <ContactDetailsCard targetCode={targetCode} />
        </Grid>
        <Tabs variant={'enclosed'} marginTop={'3rem'}>
          <TabList>
            {tabLists.map(({ title }) => (
              <Tab key={title} _selected={styling} fontSize={'20px'}>
                {title}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabLists.map(({ title, panel }) => (
              <TabPanel key={title} _selected={styling} fontSize={'20px'}>
                {panel}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default TemplateHostCompanyProfile
