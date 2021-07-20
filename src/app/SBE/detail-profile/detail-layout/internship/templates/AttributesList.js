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
