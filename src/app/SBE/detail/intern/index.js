import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faCalendarAlt,
  faCog,
  faFile,
  faGraduationCap,
  faUser,
  faPlus,
  faSearch,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'
import { Avatar, Button, Box, Text, VStack, Center, HStack, Spacer } from '@chakra-ui/react'
import Rating from 'app/DTT/rating'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_NAME', label: 'Full Name' },
    { attr: 'PRI_MOBILE', label: 'Phone Number', color: 'blue.500' },
    { attr: 'PRI_EMAIL', label: 'Email', color: 'blue.500' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Address', color: 'blue.500', config: { collapse: true } },
  ],
}

const media = {
  header: 'Media & Uploads',
  icon: <FontAwesomeIcon size="lg" icon={faFile} />,
  attributes: [{ attr: 'PRI_CV' }, { attr: '' }],
}

const internshipDetails = {
  header: 'Internship Specifications',
  icon: <FontAwesomeIcon size="lg" icon={faCalendarAlt} />,
  attributes: [
    { attr: 'PRI_START_DATE', label: 'Internship Start Date' },
    { attr: 'PRI_ASSOC_DURATION', label: 'Internship Duration' },
    { attr: 'PRI_ASSOC_DAYS_PER_WEEK', label: 'Days Per Week' },
    { attr: 'PRI_ASSOC_DAYS_OF_WEEK', label: 'Days Of Week' },
  ],
}

const recentEmployment = {
  header: 'Experience',
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  attributes: [
    { attr: 'PRI_PREV_JOB_TITLE', label: 'Job Title' },
    { attr: 'PRI_PREV_DURATION', label: 'Tenure' },
    { attr: 'PRI_PREV_EMPLOYER', label: 'Company Name' },
    { attr: 'PRI_ASSOC_OCCUPATION', label: 'Industry' },
    { attr: '', label: 'Description' },
  ],
}

const prefs = {
  header: 'Internship Preferences',
  icon: <FontAwesomeIcon size="lg" icon={faCog} />,
  attributes: [
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_ASSOC_OCCUPATION', label: 'Specialisation' },
    { attr: 'PRI_CAREER_OBJECTIVES', label: 'Career Objectives' },
    { attr: 'PRI_ASSOC_CURRENT_SOFTWARE', label: 'Proficient Software' },
    { attr: 'PRI_ASSOC_FUTURE_SOFTWARE', label: 'Software would like experience in' },
  ],
}

const edu = {
  header: 'Education Details',
  icon: <FontAwesomeIcon size="lg" icon={faGraduationCap} />,
  attributes: [{ attr: 'PRI_ASSOC_EP', label: 'Education Provider' }],
}

const details = [
  [contactDetails, internshipDetails, recentEmployment],
  [media, prefs, edu],
]

const Intern = ({ sbeCode, targetCode }) => {
  return (
    <Box h="90vh" bg="tomato">
      <Center>
        <VStack w="1166px" bg="silver">
          <HStack w="100%" h="227px" bg="white" p="2" spacing="5">
            <Avatar
              width="189px"
              height="190px"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <VStack spacing="1">
              <Text alignSelf="start" fontSize="24px" fontWeight="700" fontStyle="normal">
                {`Gerard (Yumi) Holland`}
              </Text>
              <Text alignSelf="start" fontSize="18px" fontWeight="400" fontStyle="normal">
                {`Front End Developer`}
              </Text>
              <Text
                alignSelf="start"
                fontSize="16px"
                fontWeight="normal"
                fontStyle="normal"
                opacity="0.5"
              >
                {`The University of Melbourne`}
              </Text>
              <Rating.Write />
              <HStack>
                <Button
                  colorScheme="primary"
                  leftIcon={<FontAwesomeIcon icon={faPlus} />}
                  borderRadius="32px"
                >
                  {`Apply`}
                </Button>
                <Button borderRadius="32px" variant="outline" colorScheme="primary">
                  {`Download CV`}
                </Button>
              </HStack>
            </VStack>
            <Spacer />
            <VStack alignItems="start" background="red" spacing="5">
              <HStack spacing="2">
                <FontAwesomeIcon icon={faPhoneAlt} fixedWidth color="#1A3B64" />
                <Text color="#3182CE" fontSize="16px">
                  {`+61 0410 604 021`}
                </Text>
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faEnvelope} fixedWidth color="#1A3B64" />
                <Text color="#3182CE" fontSize="16px">
                  {`gerard@outcome.life`}
                </Text>
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth color="#1A3B64" />
                <Text color="#3182CE" fontSize="16px">
                  {`Melbourne, Australia`}
                </Text>
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faGraduationCap} fixedWidth color="#1A3B64" />
                <Text color="#3182CE" fontSize="16px">
                  {`Cental Queensland University`}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <Text>{` 2nd paragraph `}</Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default Intern
