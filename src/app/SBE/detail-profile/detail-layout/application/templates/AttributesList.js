import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faPhoneAlt,
  faEnvelope,
  faUserFriends,
  faAlignLeft,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons'

export const LeftDetailAttributesApplication = [
  {
    icon: faUserFriends,
    attr: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_NAME',
    attrSecond: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_LINKEDIN_URL',
  },
  { icon: faBriefcase, attr: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_JOB_TITLE' },
  { icon: faEnvelope, attr: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_EMAIL' },
  { icon: faPhoneAlt, attr: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_MOBILE' },
  {
    icon: faAlignLeft,
    attr: '_LNK_INTERNSHIP__LNK_INTERN_SUPERVISOR__PRI_BIO',
    config: { px: '0px', noOfLines: 5, w: 'full' },
  },
]

export const internshipDetails = {
  header: 'Internship Details',
  icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
  attributes: [
    {
      attr: '_LNK_INTERNSHIP__LNK_OCCUPATION__PRI_NAME',
      label: 'Internship Specialisation',
      config: { detailViewTags: true },
    },
    {
      attr: '_LNK_INTERNSHIP__LNK_INDUSTRY__PRI_NAME',
      label: 'Industry',
      config: { detailViewTags: true },
    },
    { attr: '_LNK_INTERNSHIP__LNK_WORKSITE_SELECT_PRI_NAME', label: 'Internship Type' },
    { attr: '_LNK_INTERNSHIP__PRI_INTERNSHIP_START_DATE', label: 'Internship Active from' },
    {
      attr: '_LNK_INTERNSHIP__PRI_WHICH_DAYS_STRIPPED',
      label: 'Days Available to Intern',
      config: { detailViewTags: true },
    },
    { attr: '_LNK_INTERNSHIP__PRI_BUSINESS_HOURS', label: 'Company Business Hours' },
    { attr: '_LNK_INTERNSHIP__PRI_DRESS_CODE', label: 'Dress Code' },
    { attr: '_LNK_INTERNSHIP__PRI_NO_OF_INTERNS', label: 'Available Positions' },
    {
      attr: '_LNK_INTERNSHIP__PRI_INTERNSHIP_DETAILS',
      label: 'Internship Overview',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: '_LNK_INTERNSHIP__PRI_ROLES_AND_RESPONSIBILITIES',
      label: 'Roles & Responsibilities',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: '_LNK_INTERNSHIP__PRI_BASE_LEARNING_OUTCOMES',
      label: 'Expected Interpersonal Learning Outcomes',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: '_LNK_INTERNSHIP__PRI_SPECIFIC_LEARNING_OUTCOMES',
      label: 'Expected Technical & Industry Specific Learning Outcomes',
      config: { px: '0px', noOfLines: 5 },
    },
    {
      attr: '_LNK_INTERNSHIP__PRI_SOFTWARE',
      label: 'Software used during the internship',
      config: { detailViewTags: true },
    },
  ],
}

export const companyDetails = {
  header: 'Company Details',
  icon: <FontAwesomeIcon size="lg" icon={faBuilding} />,
  attributes: [
    { attr: '_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_NAME', label: 'Company Name' },
    {
      attr: '_LNK_INTERNSHIP__LNK_HOST_COMPANY__LNK_COMPANY_INDUSTRY__PRI_NAME',
      label: 'Industry',
      config: { detailViewTags: true },
    },
    { attr: '_LNK_INTERNSHIP__PRI_ADDRESS_FULL', label: 'Location' },
    {
      attr: '_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_COMPANY_DESCRIPTION',
      label: 'About the Company',
      config: { px: '0px', noOfLines: 5 },
    },
  ],
}
