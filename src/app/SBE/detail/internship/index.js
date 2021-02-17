import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@chakra-ui/react'

import Header from './templates/header'
import DetailSection from './templates/detail-section'
import styles from './templates/styles'
import getActions from 'app/SBE/utils/get-actions'

const contactDetails = {
  sectionIcon: faUser,
  title: 'Contact Details',
  attributes: ['PRI_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
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

const Internship = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  if (!sbe || !rows.length) return null

  const code = rows[0]
  const actions = getActions(sbe)

  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_ASSOC_HC'

  return (
    <div style={styles.container}>
      <Header
        code={code}
        sbeCode={sbeCode}
        imageSrc={imageAttribute}
        headerAttribute={headerAttribute}
        actions={actions}
      />
      <Divider />
      <DetailSection code={code} details={contactDetails} />
      <Divider />
      <DetailSection code={code} details={internshipDetail} />
      <Divider />
      <DetailSection code={code} details={responsibilities} />
      <Divider />
      <DetailSection code={code} details={basicLearningOutcome} />
      <Divider />
      <DetailSection code={code} details={technicalSkills} />
    </div>
  )
}

export default Internship
