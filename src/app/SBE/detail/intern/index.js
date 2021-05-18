import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faCalendarAlt,
  faCog,
  faFile,
  faGraduationCap,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

import DetailLayout from '../layout'

const contactDetails = {
  header: 'Contact Details',
  icon: <FontAwesomeIcon size="lg" icon={faUser} />,
  attributes: [
    { attr: 'PRI_NAME', label: 'Full Name' },
    { attr: 'PRI_MOBILE', label: 'Phone Number', color: 'blue.500' },
    { attr: 'PRI_EMAIL', label: 'Email', color: 'blue.500' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Address', color: 'blue.500' },
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
  return <DetailLayout sbeCode={sbeCode} targetCode={targetCode} details={details} />
}

export default Intern
