import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faBriefcase,
  faPhoneAlt,
  faEnvelope,
  faUserFriends,
  faAlignLeft,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons'

export const LeftDetailAttributesInternship = [
  {
    icon: faUserFriends,
    attr: 'PRI_ASSOC_SUPERVISOR',
    attrSecond: '_LNK_INTERN_SUPERVISOR__PRI_LINKEDIN_URL',
  },
  { icon: faBriefcase, attr: '_LNK_INTERN_SUPERVISOR__PRI_JOB_TITLE' },
  { icon: faEnvelope, attr: '_LNK_INTERN_SUPERVISOR__PRI_EMAIL' },
  { icon: faPhoneAlt, attr: '_LNK_INTERN_SUPERVISOR__PRI_MOBILE' },
  {
    icon: faAlignLeft,
    attr: '_LNK_INTERN_SUPERVISOR__PRI_BIO',
    config: { px: '0px', noOfLines: 5 },
  },
]

export const internshipDetails = {
  header: 'Internship Details',
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  attributes: [
    {
      attr: 'PRI_ASSOC_OCCUPATION',
      label: 'Internship Specialisation',
      config: { detailViewTags: true },
    },
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry', config: { px: '0px', noOfLines: 5 } },
    { attr: 'PRI_WORKSITE', label: 'Internship Type' },
    { attr: 'PRI_INTERNSHIP_START_DATE', label: 'Internship Active from' },
    { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days Available to Intern' },
    { attr: 'LNK_BUSINESS_HOURS', label: 'Company Business Hours' },
    { attr: 'PRI_DRESS_CODE', label: 'Dress Code' },
    { attr: 'PRI_ASSOC_NUM_INTERNS', label: 'Available Positions' },
    {
      attr: 'PRI_INTERNSHIP_DETAILS',
      label: 'Internship Overview',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: 'PRI_ROLES_AND_RESPONSIBILITIES',
      label: 'Roles & Responsibilities',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: 'PRI_SPECIFIC_LEARNING_OUTCOMES',
      label: 'Expected Interpersonal Learning Outcomes',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: 'PRI_BASE_LEARNING_OUTCOMES',
      label: 'Expected Technical & Industry Specific Learning Outcomes',
      config: { px: '0px', noOfLines: 5 },
    },
    { attr: 'PRI_SOFTWARE', label: 'Software used during the internship' },
  ],
}

export const companyDetails = {
  header: 'Company Details',
  icon: <FontAwesomeIcon size="lg" icon={faBuilding} />,
  attributes: [
    { attr: '_LNK_HOST_COMPANY__PRI_NAME', label: 'Company Name' },
    { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
    { attr: 'PRI_ADDRESS_FULL', label: 'Location' },
    { attr: '_LNK_HOST_COMPANY__PRI_COMPANY_DESCRIPTION', label: 'About the Company' },
  ],
}
