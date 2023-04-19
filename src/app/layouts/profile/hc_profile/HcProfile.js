import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs, useTheme } from '@chakra-ui/react'
import ContactDetails from 'app/layouts/profile/hc_profile/ContactDetails'
import { useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import AboutContainer from 'app/layouts/profile/hc_profile/AboutContainer'
import ChipList from 'app/layouts/profile/hc_profile/ChipList'
import DetailContainer from 'app/layouts/profile/hc_profile/DetailContainer'
import LinkedOpportunities from 'app/layouts/profile/hc_profile/LinkedOpportunities'
import ProfileContainer from 'app/layouts/profile/hc_profile/ProfileContainer'

const data = {
  phone: '+61 000 000 000',
  email: 'host@company.rep',
  linkedIn: 'https://fake.linkedin.com/example',
  website: 'https://gada.io',
  jobTitle: 'Host Job Title',
  education: 'The School',
  location: 'Earth',
  hostedInterns: 20,
  currentOpportunities: 5,
  pronouns: 'he/him',
  noteCount: 152,
  about:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut molestie leo. Praesent eu mollis elit, a sodales ex. In hac habitasse platea dictumst. Fusce at sem mattis, pulvinar nisl consectetur, consequat enim. Suspendisse vestibulum nisl nec libero venenatis ornare. Etiam mollis dapibus elementum. Sed gravida maximus quam, sit amet varius erat posuere non. Maecenas consequat ac magna a ornare. Proin iaculis ex sit amet convallis ultricies. Sed lacus nunc, vehicula ut massa non, efficitur tristique leo. Maecenas maximus lacinia est, lacinia eleifend magna semper a.',
  companyIndustry: 'Retail',
  department: 'Sales',
  keyStrengths: ['Eating', 'Breathing', 'Perspiring'],
  managementStyle: ['Words', 'Sentences'],
  technicalStrengths: ['Description', 'Adjective'],
  software: ['XOS', 'COBOL', 'Assembly'],
}

const {
  phone,
  email,
  linkedIn,
  website,
  jobTitle,
  education,
  location,
  hostedInterns,
  currentOpportunities,
  pronouns,
  noteCount,
  about,
  companyIndustry,
  department,
  keyStrengths,
  managementStyle,
  technicalStrengths,
  software,
} = data

const HCProfile = () => {
  const theme = useTheme()
  const userCode = useSelector(selectCode('USER'))

  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))

  const chipStyle = { bg: 'internmatch.primary400' }
  const tabStyle = {
    _selected: { color: 'black', bg: '#96D5D3' },
    fontSize: '20px',
    roundedTop: '2xl',
  }

  return (
    <VStack w="90%" spacing={'5rem'}>
      <HStack w="100%" maxH="20rem" h="20rem" marginTop="5rem">
        <ProfileContainer
          theme={theme}
          name={name}
          userCode={userCode}
          pronouns={pronouns}
          linkedIn={linkedIn}
          jobTitle={jobTitle}
          education={education}
          location={location}
          website={website}
        />
        <VStack w={'full'} h={'full'}>
          <ContactDetails theme={theme} phone={phone} email={email} />
          <LinkedOpportunities
            hostedInterns={hostedInterns}
            currentOpportunities={currentOpportunities}
          />
        </VStack>
      </HStack>

      <Tabs
        w="full"
        borderColor={theme.colors.internmatch.primary400}
        variant="enclosed"
        marginTop={'5rem'}
        alignSelf={'start'}
      >
        <TabList alignItems={'start'}>
          <Tab {...tabStyle}>About</Tab>
          <Tab {...tabStyle}>
            <HStack>
              <Text>Opportunities</Text>
              <Text
                color={theme.colors.internmatch.secondary}
                paddingInline={'1rem'}
                textStyle={'body.2'}
                rounded={'full'}
                bg={'white'}
              >
                {currentOpportunities}
              </Text>
            </HStack>
          </Tab>
          <Tab {...tabStyle}>
            <HStack>
              <Text>Notes</Text>
              <Text
                color={theme.colors.internmatch.secondary}
                paddingInline={'1rem'}
                textStyle={'body.2'}
                rounded={'full'}
                bg={'white'}
              >
                {noteCount}
              </Text>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack alignItems={'start'}>
              <AboutContainer theme={theme} content={about} />
              <DetailContainer>
                <HStack w={'full'} spacing={'2rem'}>
                  <Box>
                    <Text textStyle={'body.3'}>Company Industry</Text>
                    <Text textStyle={'body.2'}>{companyIndustry}</Text>
                  </Box>
                  <Box>
                    <Text textStyle={'body.3'}>Department</Text>
                    <Text textStyle={'body.2'}>{department}</Text>
                  </Box>
                </HStack>
                <ChipList title={'Key Strengths'} items={keyStrengths} parameters={chipStyle} />
                <ChipList
                  title={'Management Style'}
                  items={managementStyle}
                  parameters={chipStyle}
                />
                <ChipList
                  title={'Technical Strengths'}
                  items={technicalStrengths}
                  parameters={chipStyle}
                />
                <ChipList
                  title={'Software you would like experience in'}
                  items={software}
                  parameters={chipStyle}
                />
              </DetailContainer>
            </HStack>
          </TabPanel>
          <TabPanel>{/* Tab content */}</TabPanel>
          <TabPanel>{/* Tab content */}</TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default HCProfile
