import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import ProfileStatisticsCard from 'app/PCM/components/profile-statistics-card'
import TodoList from 'app/PCM/components/todo-list'

const TemplateDashboard = () => {
  return (
    <>
      <HStack>
        <ProfileStatisticsCard />
      </HStack>
      <Tabs variant={'enclosed'} marginTop={'3rem'} marginLeft={'1.5rem'}>
        <TabList>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}> Events </Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}>Training</Tab>
          <Tab _selected={{ color: 'black', bg: '#96D5D3' }}> Applications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              bg={'#CAEAE9'}
              height={'100vh'}
              width={'74rem'}
              marginTop={'-1rem'}
              marginLeft={'-5rem'}
              borderRadius={'1.6rem'}
              paddingBlock={'3.3rem'}
              paddingLeft={'5rem'}
            >
              <Wrap>
                <WrapItem>
                  <TodoList />
                </WrapItem>
              </Wrap>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              bg={'#CAEAE9'}
              height={'100vh'}
              width={'100vw'}
              marginTop={'-1rem'}
              marginLeft={'-5rem'}
              borderRadius={'1.6rem'}
            ></Box>
          </TabPanel>
          <TabPanel>
            <Box
              bg={'#CAEAE9'}
              height={'100vh'}
              width={'100vw'}
              marginTop={'-1rem'}
              marginLeft={'-5rem'}
              borderRadius={'1.6rem'}
            ></Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TemplateDashboard
