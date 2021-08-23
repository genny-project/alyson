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
    { attr: '_LNK_INDUSTRY__PRI_NAME', label: 'Industry', config: { detailViewTags: true } },
    {
      attr: '_LNK_OCCUPATION__PRI_NAME',
      label: 'Specialisation',
      config: { detailViewTags: true },
    },
    { attr: 'PRI_CAREER_OBJ', label: 'Career Objectives', config: { px: '0px', noOfLines: 5 } },
    {
      attr: '_LNK_CURRENT_SOFTWARE__PRI_NAME',
      label: 'Proficient Software',
      config: { detailViewTags: true },
    },
    {
      attr: '_LNK_FUTURE_SOFTWARE__PRI_NAME',
      label: 'Software would like experience in',
      config: { detailViewTags: true },
    },
  ],
}
export const internshipDetails = {
  header: 'Internship Specifications',
  icon: <FontAwesomeIcon size="lg" icon={faCalendarAlt} />,
  attributes: [
    { attr: 'PRI_START_DATE', label: 'Internship Start Date' },
    { attr: 'PRI_ASSOC_DURATION', label: 'Internship Duration' },
    { attr: '_LNK_DAYS_PER_WEEK__PRI_NAME', label: 'Days Per Week' },
    { attr: '_LNK_WHICH_DAYS__PRI_NAME', label: 'Days Of Week', config: { detailViewTags: true } },
  ],
}
export const recentEmployment = {
  header: 'Experience',
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  attributes: [
    { attr: 'PRI_PREV_JOB_TITLE', label: 'Job Title' },
    { attr: 'PRI_PREV_PERIOD', label: 'Tenure' },
    { attr: 'PRI_PREV_EMPLOYER', label: 'Company Name' },
    { attr: '_LNK_INTERN_PREV_INDUSTRY__PRI_NAME', label: 'Industry' },
    { attr: 'PRI_PREV_DESCRIPTION', label: 'Description', config: { px: '0px', noOfLines: 5 } },
  ],
}

export const LeftDetailAttributesIntern = [
  { icon: faUser, attr: 'PRI_NAME' },
  { icon: faPhoneAlt, attr: 'PRI_MOBILE' },
  { icon: faEnvelope, attr: 'PRI_EMAIL' },
  { icon: faMapMarkerAlt, attr: 'PRI_ADDRESS_FULL', config: { hideIcon: true } },
  { icon: faGraduationCap, attr: '_LNK_EDU_PROVIDER__PRI_NAME' },
]
