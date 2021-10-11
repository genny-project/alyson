import { HStack, Stack, Text, VStack } from '@chakra-ui/layout'
import { find, head, includes, replace } from 'ramda'
import { selectCode, selectKeys } from 'redux/db/selectors'

import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import Process from 'app/layouts/process'
import { onSendMessage } from 'vertx'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Progress = () => {
  const keys = useSelector(selectKeys)
  const progressSbe = replace(
    '@rows',
    '',
    find(
      aKey => !includes('PRM_', aKey) && includes('SBE_SUMMARY_INPROGRESS_APPLICATION', aKey),
      keys,
    ) || '',
  )

  const appBe = head(useSelector(selectCode(progressSbe, 'rows')) || [])

  const isMobile = useIsMobile()
  if (!appBe) return <Process dashboard />

  const onLogbook = () =>
    onSendMessage({
      parentCode: progressSbe,
      targetCode: appBe,
      code: 'ACT_PRI_EVENT_JOURNAL_VIEW',
    })

  return (
    <Card w={isMobile ? '90vw' : ''}>
      <VStack>
        <Text textStyle="head.3">In Progress Internship</Text>
        <Stack align="center" direction={['column', 'row']}>
          <Text textStyle="body.1">
            <Attribute code={appBe} attribute="PRI_TITLE" />
          </Text>
          <Text>at</Text>
          <Text textStyle="body.1">
            <Attribute code={appBe} attribute="PRI_ASSOC_HC" />
          </Text>
        </Stack>

        <HStack spacing="1">
          <Text textStyle="body.3">Until</Text>
          <Text>
            <Attribute config={{ textStyle: 'body.3' }} code={appBe} attribute="PRI_END_DATE" />
          </Text>
        </HStack>

        <VStack>
          <Button size="lg" variant="special" onClick={onLogbook}>
            Go to Your Logbook
          </Button>
          <Attribute code={appBe} attribute="PRI_PROGRESS" />
        </VStack>
      </VStack>
    </Card>
  )
}

export default Progress
