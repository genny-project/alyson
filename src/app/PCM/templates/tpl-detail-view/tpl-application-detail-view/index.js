import { Grid, Stack, Text, useTheme } from '@chakra-ui/react'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'

import AdditionalInformation from 'app/PCM/templates/tpl-detail-view/tpl-application-detail-view/additionalInformation'
import BasicInformation from 'app/PCM/templates/tpl-detail-view/tpl-application-detail-view/basicInformation'
import CheckLists from 'app/PCM/templates/tpl-detail-view/tpl-application-detail-view/checkLists'
import EventButton from 'app/DTT/event_button'
import UploadedDocuments from 'app/PCM/templates/tpl-detail-view/tpl-application-detail-view/uploadedDocuments'
import { compose } from 'ramda'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const TemplateApplicationDetailView = ({ mappedPcm }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const userCode = compose(useSelector, selectCode)('USER')
  const userFirstName = compose(useSelector, selectCodeUnary(userCode))('PRI_FIRSTNAME')?.value

  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''
  const targetCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode') || ''

  // Currently using this to check student as it has been inconsistent whether or not LNK_EDU_PROVIDER has been present, however company name has always been there
  const isStudent = !useSelector(selectCode(targetCode, 'PRI_COMPANY_NAME'))?.value

  const markCompleteButtonData = useSelector(selectCode(questionCode, 'QUE_MARK_AS_COMPLETE')) || {}

  const { sourceCode } = markCompleteButtonData || {}

  const isApproved = compose(useSelector, selectCodeUnary(targetCode))('PRI_APPROVED')?.value

  const buttonStyles = {
    width: 'auto !important',
    borderRadius: 20,
    background: 'product.secondary',
    paddingBlock: '1.15rem',
    paddingInline: '2rem',
    height: 'auto',
    color: 'product.white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'product.secondary',
    _hover: {
      background: theme.colors.background.light,
      color: 'product.secondary',
      borderColor: 'product.secondary',
      variant: 'outline',
    },
  }

  return (
    <>
      <Text fontSize="2.25rem" fontWeight={'400'}>{`Hi ${userFirstName}`}</Text>
      <Text marginBlock={5}>
        {isApproved
          ? 'Please review these Pre-Approval Applications'
          : 'Please review these pending Pre-Approval Applications'}
      </Text>

      <BasicInformation code={targetCode} isStudent={isStudent} isApproved={isApproved} />

      <UploadedDocuments code={targetCode} />

      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gap={'1rem'}
        marginBlockStart={'clamp(1rem, 3vw, 3.75rem)'}
      >
        <AdditionalInformation code={targetCode} isStudent={isStudent} />
        <CheckLists mappedPcm={mappedPcm} code={questionCode} isStudent={isStudent} />
      </Grid>

      <Stack
        marginBlockStart={'clamp(1.25rem, 5vw, 4.38rem)'}
        alignItems={'flex-end'}
        justifyContent={'flex-end'}
      >
        <EventButton
          askData={markCompleteButtonData}
          parentCode={questionCode}
          sourceCode={sourceCode}
          config={buttonStyles}
          icon={faCheckCircle}
        />
      </Stack>
    </>
  )
}

export default TemplateApplicationDetailView
