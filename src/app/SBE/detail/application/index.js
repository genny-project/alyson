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
      attr: '_PRI_INTERN_CODE__PRI_NAME',
      label: 'Intern Applying',
    },
    { attr: '_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_NAME', label: 'Host Company' },
  ],
}

const supervisor = {
  icon: <FontAwesomeIcon size="lg" icon={faUserCheck} />,
  header: 'Supervisor',
  attributes: [
    {
      attr: '_LNK_INTERN_SUPERVISOR__PRI_NAME',
      label: 'Supervisor',
    },
    { attr: '_LNK_INTERN_SUPERVISOR__PRI_JOB_TITLE', label: 'Role' },
    { attr: '_LNK_INTERN_SUPERVISOR__PRI_EMAIL', label: 'Email' },
    { attr: '_LNK_INTERN_SUPERVISOR__PRI_MOBILE', label: 'Mobile' },
  ],
}

const shortDetail = {
  icon: <FontAwesomeIcon size="lg" icon={faItalic} />,
  header: 'Short Internship Summary',
  attributes: [{ attr: '_LNK_INTERNSHIP__PRI_INTERNSHIP_DETAILS' }],
}

const internshipDetail = {
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  header: 'Internship Details',
  attributes: [
    { attr: 'PRI_STATUS' },
    { attr: '_LNK_INTERNSHIP__LNK_OCCUPATION__PRI_NAME', label: 'Industry' },
    { attr: '_LNK_INTERNSHIP__LNK_WORKSITE_SELECT__PRI_NAME', label: 'Onsite/Remote' },
    { attr: '_LNK_INTERNSHIP__PRI_INTERNSHIP_START_DATE', label: 'Start Date' },
    { attr: '_LNK_INTERNSHIP__PRI_WHICH_DAYS_STRIPPED', label: 'Days of Week' },
    { attr: '_LNK_INTERNSHIP__PRI_DRESS_CODE', label: 'Dress Code' },
    { attr: '_LNK_INTERNSHIP__PRI_NO_OF_INTERNS', label: 'Available Spots' },
  ],
}

const resp = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Roles and Responsibilities',
  attributes: [{ attr: '_LNK_INTERNSHIP__PRI_ROLES_AND_RESPONSIBILITIES' }],
}
const baseOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Learning Outcomes',
  attributes: [{ attr: '_LNK_INTERNSHIP__PRI_BASE_LEARNING_OUTCOMES' }],
}
const specOutcomes = {
  icon: <FontAwesomeIcon size="lg" icon={faInfo} />,
  header: 'Specific Learning Outcomes',
  attributes: [{ attr: '_LNK_INTERNSHIP__PRI_SPECIFIC_LEARNING_OUTCOMES' }],
}

const details = [
  [appDetails, internshipDetail, resp],
  [supervisor, shortDetail, baseOutcomes, specOutcomes],
]

const Application = ({ sbeCode, targetCode }) => {
  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Application
