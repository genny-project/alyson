import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faCalendarAlt,
  faBriefcase,
  faUser,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'

export const prefs = {
  header: 'Internship Preferences',
  icon: <FontAwesomeIcon size="lg" icon={faCog} />,
  attributes: [
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_ASSOC_OCCUPATION', label: 'Specialisation' },
    { attr: 'PRI_CAREER_OBJ', label: 'Career Objectives' },
    { attr: 'PRI_ASSOC_CURRENT_SOFTWARE', label: 'Proficient Software' },
    { attr: 'PRI_ASSOC_FUTURE_SOFTWARE', label: 'Software would like experience in' },
  ],
}
export const internshipDetails = {
  header: 'Internship Specifications',
  icon: <FontAwesomeIcon size="lg" icon={faCalendarAlt} />,
  attributes: [
    { attr: 'PRI_START_DATE', label: 'Internship Start Date' },
    { attr: 'PRI_ASSOC_DURATION', label: 'Internship Duration' },
    { attr: 'PRI_DAYS_PER_WEEK', label: 'Days Per Week' },
    { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days Of Week' },
  ],
}
export const recentEmployment = {
  header: 'Experience',
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  attributes: [
    { attr: 'PRI_PREV_JOB_TITLE', label: 'Job Title' },
    { attr: 'PRI_PREV_DURATION', label: 'Tenure' },
    { attr: 'PRI_PREV_EMPLOYER', label: 'Company Name' },
    { attr: 'PRI_ASSOC_INTERN_PREV_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_PREV_DESCRIPTION', label: 'Description' },
  ],
}

export const LeftDetailAttributes = [
  { icon: faUser, attr: 'PRI_NAME' },
  { icon: faPhoneAlt, attr: 'PRI_MOBILE' },
  { icon: faEnvelope, attr: 'PRI_EMAIL' },
  { icon: faMapMarkerAlt, attr: 'PRI_ADDRESS_FULL', config: { hideIcon: true } },
  { icon: faGraduationCap, attr: 'PRI_ASSOC_EP' },
]
