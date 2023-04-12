import { Grid, Stack, Text, useTheme } from '@chakra-ui/react'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'

import AdditionalInformation from './additionalInformation'
import BasicInformation from './basicInformation'
import CheckLists from './checkLists'
import EventButton from 'app/DTT/event_button'
import UploadedDocuments from './uploadedDocuments'
import { compose } from 'ramda'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const TemplateApplicationDetailView = ({ mappedPcm }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const userCode = compose(useSelector, selectCode)('USER')
  const userFirstName = compose(useSelector, selectCodeUnary(userCode))('PRI_FIRSTNAME')?.value

  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''
  const targetCode = compose(useSelector, selectCodeUnary(questionCode))('targetCode') || ''

  const isStudent = compose(useSelector, selectCodeUnary(targetCode))('LNK_EDU_PROVIDER')?.value

  const markCompleteButtonData =
    compose(useSelector, selectCodeUnary(targetCode))('QUE_MARK_AS_COMPLETE') || {}
  const { sourceCode } = markCompleteButtonData || {}

  const isApproved = compose(useSelector, selectCodeUnary(targetCode))('PRI_APPROVED')?.value

  console.log({ isApproved })

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
        <CheckLists mappedPcm={mappedPcm} code={questionCode} />
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
        />
      </Stack>
    </>
  )
}

export default TemplateApplicationDetailView
