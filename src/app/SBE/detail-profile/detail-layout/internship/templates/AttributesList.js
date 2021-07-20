import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faCalendarAlt,
  faBriefcase,
  faPhoneAlt,
  faEnvelope,
  faUserFriends,
  faAlignLeft,
} from '@fortawesome/free-solid-svg-icons'

export const prefs = {
  header: 'Internship Preferences',
  icon: <FontAwesomeIcon size="lg" icon={faCog} />,
  attributes: [
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry', config: { detailViewTags: true } },
    { attr: 'PRI_ASSOC_OCCUPATION', label: 'Specialisation', config: { detailViewTags: true } },
    { attr: 'PRI_CAREER_OBJ', label: 'Career Objectives', config: { px: '0px', noOfLines: 5 } },
    {
      attr: 'PRI_ASSOC_CURRENT_SOFTWARE',
      label: 'Proficient Software',
      config: { detailViewTags: true },
    },
    {
      attr: 'PRI_ASSOC_FUTURE_SOFTWARE',
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
    { attr: 'PRI_DAYS_PER_WEEK', label: 'Days Per Week' },
    { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days Of Week', config: { detailViewTags: true } },
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
    { attr: 'PRI_PREV_DESCRIPTION', label: 'Description', config: { px: '0px', noOfLines: 5 } },
  ],
}

export const LeftDetailAttributesInternship = [
  {
    icon: faUserFriends,
    attr: 'PRI_ASSOC_SUPERVISOR',
    attrSecond: '_LNK_INTERN_SUPERVISOR__PRI_LINKEDIN_URL',
  },
  { icon: faBriefcase, attr: '_LNK_INTERN_SUPERVISOR__PRI_JOB_TITLE' },
  { icon: faEnvelope, attr: '_LNK_INTERN_SUPERVISOR__PRI_EMAIL' },
  { icon: faPhoneAlt, attr: '_LNK_INTERN_SUPERVISOR__PRI_MOBILE' },
  { icon: faAlignLeft, attr: '_LNK_INTERN_SUPERVISOR__PRI_BIO' },
]
