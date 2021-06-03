import DetailLayout from '../layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faInfo,
  faPaperclip,
  faUserCheck,
  faItalic,
} from '@fortawesome/free-solid-svg-icons'

const appDetails = {
  icon: <FontAwesomeIcon size="lg" icon={faPaperclip} />,
  header: 'Application Details',
  attributes: [
    {
      attr: 'PRI_INTERN_NAME',
      label: 'Intern Applying',
    },
    { attr: 'PRI_ASSOC_HC', label: 'Host Company' },
  ],
}

const supervisor = {
  icon: <FontAwesomeIcon size="lg" icon={faUserCheck} />,
  header: 'Supervisor',
  attributes: [
    {
      attr: 'PRI_SUPER_NAME',
      label: 'Supervisor',
    },
    { attr: 'PRI_SUPER_JOB_TITLE', label: 'Role' },
    { attr: 'PRI_SUPER_JOB_EMAIL', label: 'Email' },
    { attr: 'PRI_SUPER_JOB_MOBILE', label: 'Mobile' },
  ],
}

const shortDetail = {
  icon: <FontAwesomeIcon size="lg" icon={faItalic} />,
  header: 'Short Internship Summary',
  attributes: [{ attr: 'PRI_INTERNSHIP_DETAILS' }],
}

const internshipDetail = {
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  header: 'Internship Details',
  attributes: [
    { attr: 'PRI_STATUS' },
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_WORKSITE', label: 'Onsite/Remote' },
    { attr: 'PRI_INTERNSHIP_START_DATE', label: 'Start Date' },
    { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days of Week' },
    { attr: 'PRI_DRESS_CODE', label: 'Dress Code' },
    { attr: 'PRI_ASSOC_NUM_INTERNS', label: 'Available Spots' },
  ],
}

const resp = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Roles and Responsibilities',
  attributes: [{ attr: 'PRI_ROLES_AND_RESPONSIBILITIES' }],
}
const baseOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Learning Outcomes',
  attributes: [{ attr: 'PRI_BASE_LEARNING_OUTCOMES' }],
}
const specOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Specific Learning Outcomes',
  attributes: [{ attr: 'PRI_SPECIFIC_LEARNING_OUTCOMES' }],
}

const details = [
  [appDetails, internshipDetail, resp],
  [supervisor, shortDetail, baseOutcomes, specOutcomes],
]

const Application = ({ sbeCode, targetCode }) => {
  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Application
