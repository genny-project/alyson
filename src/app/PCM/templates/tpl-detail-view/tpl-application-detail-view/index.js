import { Button, Grid, Stack, Text, useTheme } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'ramda'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import CheckLists from './checkLists'
import TenantAdditionalInformation from './tenantAdditionalInformation'
import TenantBasicInformation from './tenantBasicInformation'
import UploadedDocuments from './uploadedDocuments'
import { selectCodeUnary, selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'

const TemplateApplicationDetailView = ({ mappedPcm, depth }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  const userCode = compose(useSelector, selectCode)('USER')
  const userFirstName = compose(useSelector, selectCodeUnary(userCode))('PRI_FIRSTNAME')?.value

  const sbeCode = mappedPcm.PRI_LOC1
  const targetCode = useSelector(selectCode(sbeCode, 'PRI_TARGET_CODE'))?.value
  const isStudent = useSelector(selectCode(targetCode, 'LNK_CAMPUS_SELECTION'))?.value

  const questionCode = mappedPcm.PRI_QUESTION_CODE

  const markCompleteButtonData = useSelector(selectCode(questionCode, 'QUE_MARK_AS_COMPLETE')) || {}
  const { sourceCode } = markCompleteButtonData || {}
  const markCompleteButtonName =
    useSelector(selectCode(questionCode, 'QUE_MARK_AS_COMPLETE'))?.name || ''

  return (
    <>
      <Text fontSize="2.25rem" fontWeight={'400'}>{`Hi ${userFirstName}`}</Text>
      <Text marginBlock={5}>{'Please review these pending Pre-Approval Applications'}</Text>

      <TenantBasicInformation code={targetCode} isStudent={isStudent} />

      <UploadedDocuments code={targetCode} />

      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gap={'1rem'}
        marginBlockStart={'clamp(1rem, 3vw, 3.75rem)'}
      >
        <TenantAdditionalInformation code={targetCode} isStudent={isStudent} />

        <CheckLists mappedPcm={mappedPcm} code={questionCode} />
      </Grid>

      <Stack
        marginBlockStart={'clamp(1.25rem, 5vw, 4.38rem)'}
        alignItems={'flex-end'}
        justifyContent={'flex-end'}
      >
        <Button
          askData={markCompleteButtonData}
          parentCode={questionCode}
          sourceCode={sourceCode}
          borderRadius={20}
          background={'product.secondary'}
          paddingBlock={'1.15rem'}
          paddingInline={'2rem'}
          height={'auto'}
          color={'product.white'}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="product.secondary"
          _hover={{
            background: theme.colors.background.light,
            color: 'product.secondary',

            borderColor: 'product.secondary',
            variant: 'outline',
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <Text as="span" marginInlineStart={4}>
            {markCompleteButtonName}
          </Text>
        </Button>
      </Stack>
    </>
  )
}

export default TemplateApplicationDetailView
