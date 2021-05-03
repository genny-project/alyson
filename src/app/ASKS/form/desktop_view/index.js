import { VStack } from '@chakra-ui/react'
import Header from './template/Header'
import Body from './template/Body'

const configg = {
  subHeader: 'Please tell us a little about yourself',
  groups: [
    {
      label: 'Personal',
      questions: ['QUE_SELECT_HOST_COMPANY', 'QUE_FIRSTNAME', 'QUE_LASTNAME'],
    },
    { label: 'Contact', questions: ['QUE_EMAIL', 'QUE_MOBILE'] },
    { label: 'More Info', questions: ['QUE_IMAGE', 'QUE_BIO'] },
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

const FormDesktopView = ({ title, onFinish, questionCode, config = {} }) => {
  const { subHeader, groups = {}, fullWidth } = configg

  return (
    <VStack mx="25vw" minimumWidth="max-content" spacing="8">
      <Header title={title} subHeader={subHeader} config={config} />
      <Body groups={groups} onFinish={onFinish} questionCode={questionCode} />
    </VStack>
  )
}
export default FormDesktopView
