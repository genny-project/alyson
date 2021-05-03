import { VStack } from '@chakra-ui/react'
import Header from './template/Header'
import Body from './template/Body'

const configHcRep = {
  subHeader: 'Please tell us a little about yourself',
  groups: [
    {
      label: 'Personal',
      questions: ['QUE_SELECT_HOST_COMPANY', 'QUE_FIRSTNAME', 'QUE_LASTNAME'],
    },
    { label: 'More Info', questions: ['QUE_IMAGE', 'QUE_BIO'] },
    { label: 'Contact', questions: ['QUE_EMAIL', 'QUE_MOBILE'] },
    {
      label: 'Business',
      questions: [
        'QUE_JOB_TITLE',
        'QUE_SUPER_QUALIFICATION',
        'QUE_LINKEDIN_URL',
        'QUE_SELECT_TIME_ZONE',
        'QUE_SUBMIT',
      ],
    },
  ],
}

// const configHc = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_SPECIFY_ABN',
//         'QUE_COMPANY_ABN',
//         'QUE_LEGAL_NAME',
//         'QUE_TRADING_NAME',
//         'QUE_PHONE',
//         'QUE_MOBILE',
//         'QUE_ADDRESS_FULL',
//         'QUE_COMPANY_WEBSITE',
//         'QUE_COMPANY_DESCRIPTION',
//         'QUE_CPY_LINKEDIN_URL',
//         'QUE_CPY_VIDEO_INTRO',
//         'QUE_COMPANY_INDUSTRY',
//         'QUE_NUMBER_STAFF',
//         'QUE_COMPANY_INC',
//         'QUE_CPY_PROFILE_IMAGE',
//         'QUE_OHS_DOC',
//         'QUE_TC_DOC',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configEp = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_SPECIFY_ABN',
//         'QUE_COMPANY_ABN',
//         'QUE_PROVIDER_ID',
//         'QUE_LEGAL_NAME',
//         'QUE_TRADING_NAME',
//         'QUE_MOBILE',
//         'QUE_ADDRESS_FULL',
//         'QUE_COMPANY_WEBSITE',
//         'QUE_COMPANY_DESCRIPTION',
//         'QUE_IMAGE',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configEpRep = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_SELECT_EDU_PROVIDER',
//         'QUE_FIRSTNAME',
//         'QUE_LASTNAME',
//         'QUE_EMAIL',
//         'QUE_JOB_TITLE',
//         'QUE_MOBILE',
//         'QUE_SELECT_TIME_ZONE',
//         'QUE_LINKEDIN_URL',
//         'QUE_DEPARTMENT',
//         'QUE_IMAGE',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configInternship = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_INTERNSHIP_TITLE',
//         'QUE_SELECT_HOST_COMPANY',
//         'QUE_SELECT_HOST_COMPANY_REP',
//         'QUE_SELECT_INTERN_SUPERVISOR',
//         'QUE_INTERNSHIP_ADDRESS',
//         'QUE_SELECT_TIME_ZONE',
//         'QUE_INTERNSHIP_INDUSTRY',
//         'QUE_INTERNSHIP_OCCUPATION',
//         'QUE_ROLES_AND_RESP',
//         'QUE_BASE_LO',
//         'QUE_SPECIFIC_LO',
//         'QUE_INTERN_SOFTWARE',
//         'QUE_INTERNSHIP_START_DATE',
//         'QUE_WHICH_DAYS',
//         'QUE_WORKSITE',
//         'QUE_DRESS_CODE',
//         'QUE_BUSINESS_HOURS',
//         'QUE_NO_OF_INTERNS',
//         'QUE_INTERNSHIP_VIDEO',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configIntern = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_FIRSTNAME',
//         'QUE_LASTNAME',
//         'QUE_PREFERRED_NAME',
//         'QUE_IMAGE',
//         'QUE_GENDER',
//         'QUE_EMAIL',
//         'QUE_MOBILE',
//         'QUE_ADDRESS',
//         'QUE_SELECT_TIME_ZONE',
//         'QUE_LINKEDIN_URL',
//         'QUE_EDU_PROVIDER_SELECTION',
//         'QUE_CURRENT_COURSE',
//         'QUE_STUDENT_ID',
//         'QUE_INTERNSHIP_INDUSTRY',
//         'QUE_INTERN_OCCUPATION',
//         'QUE_INTERNSHIP_DURATION',
//         'QUE_START_DATE',
//         'QUE_INTERNSHIP_DAYS_PER_WEEK',
//         'QUE_WHICH_DAYS',
//         'QUE_TRANSPORT',
//         'QUE_CURRENT_SOFTWARE',
//         'QUE_FUTURE_SOFTWARE',
//         'QUE_CAREER_OBJ',
//         'QUE_COMP_INTERNSHIP',
//         'QUE_PREV_EMPLOYER',
//         'QUE_PREV_INTERNSHIP_INDUSTRY',
//         'QUE_PREV_JOB_TITLE',
//         'QUE_PREV_DESCRIPTION',
//         'QUE_PREV_PERIOD',
//         'QUE_UPLOAD_CV',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configAgency = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_SPECIFY_ABN',
//         'QUE_COMPANY_ABN',
//         'QUE_LEGAL_NAME',
//         'QUE_TRADING_NAME',
//         'QUE_MOBILE',
//         'QUE_ADDRESS_FULL',
//         'QUE_COMPANY_WEBSITE',
//         'QUE_COMPANY_DESCRIPTION',
//         'QUE_CPY_LINKEDIN_URL',
//         'QUE_COMPANY_INDUSTRY',
//         'QUE_NUMBER_STAFF',
//         'QUE_CPY_PROFILE_IMAGE',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

// const configAgent = {
//   subHeader: 'Please tell us a little about yourself',
//   groups: [
//     {
//       label: 'Personal',
//       questions: [
//         'QUE_SELECT_AGENCY',
//         'QUE_FIRSTNAME',
//         'QUE_LASTNAME',
//         'QUE_PREFERRED_NAME',
//         'QUE_GENDER',
//         'QUE_EMAIL',
//         'QUE_MOBILE',
//         'QUE_ADDRESS_FULL',
//         'QUE_SELECT_TIME_ZONE',
//         'QUE_IMAGE',
//         'QUE_SUBMIT',
//       ],
//     },
//   ],
// }

const FormDesktopView = ({ title, onFinish, questionCode, config = {} }) => {
  const { subHeader, groups = {} } = configHcRep

  return (
    <VStack mx="25vw" spacing="4">
      <Header title={title} subHeader={subHeader} config={config} />
      <Body groups={groups} onFinish={onFinish} questionCode={questionCode} />
    </VStack>
  )
}
export default FormDesktopView
