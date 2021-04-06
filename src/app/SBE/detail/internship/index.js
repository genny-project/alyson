import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Box, Divider, IconButton, Text, VStack } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from '../default-view/templates/detail-section'
import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import { closeDrawer } from 'redux/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const contactDetails = {
  sectionIcon: faUser,
  title: 'Dedicated Internship Contact Details',
  attributes: ['PRI_ASSOC_SUPERVISOR', 'PRI_MOBILE', 'PRI_EMAIL'],
}

const internshipDetail = {
  sectionIcon: faBriefcase,
  title: 'Internship Details',
  attributes: [
    'PRI_WORKSITE',
    'PRI_INTERNSHIP_START_DATE',
    'PRI_WHICH_DAYS_STRIPPED',
    'PRI_DRESS_CODE',
    'PRI_ASSOC_NUM_INTERNS',
  ],
}

const responsibilities = {
  sectionIcon: faGraduationCap,
  title: 'Responsibilities',
  attributes: ['PRI_ROLES_AND_RESPONSIBILITIES'],
}

const basicLearningOutcome = {
  sectionIcon: faGraduationCap,
  title: 'Basic Learning Outcome',
  attributes: ['PRI_BASE_LEARNING_OUTCOMES'],
}

const technicalSkills = {
  sectionIcon: faGraduationCap,
  title: 'Technical Skills',
  attributes: ['PRI_SPECIFIC_LEARNING_OUTCOMES'],
}

const Internship = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  if (!sbe) return null

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const actions = getActions(sbe)

  if (!beCode) return null

  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_ASSOC_HC'

  return (
    <Box maxH="100vh" maxW="100vw" overflow="scroll" pb="5">
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color={'darkgrey'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Header
        code={beCode}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
        contactDetails={contactDetails}
      />
      <DetailSection code={beCode} details={internshipDetail} />
      <Divider />

      <DetailSection code={beCode} details={contactDetails} />
      <Divider />

      <DetailSection code={beCode} details={responsibilities} />
      <Divider />
      <DetailSection code={beCode} details={basicLearningOutcome} />
      <Divider />
      <DetailSection code={beCode} details={technicalSkills} />
      <VStack>
        <Text textStyle="body3">Software To Be Used</Text>
        <Attribute code={beCode} attribute={'PRI_SOFTWARE'} />
      </VStack>
    </Box>
  )
}

export default Internship
