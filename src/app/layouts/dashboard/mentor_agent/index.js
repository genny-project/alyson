import { Button, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import DisplaySbe from 'app/SBE'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { head } from 'ramda'
import { onSendMessage } from 'vertx'
import { processView } from 'utils/constants'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const AgentDashboard = () => {
  const dashboardSbes = useSelector(selectDashboard) || []
  const userCode = useSelector(selectCode('USER'))
  const agency = head(safelyParseJson(useSelector(selectCode(userCode, 'LNK_AGENCY'))?.value, ['']))

  return (
    <VStack spacing={4}>
      <Card>
        <VStack spacing={10} w={['xs', 'md']}>
          <Button
            colorScheme="red"
            onClick={() =>
              onSendMessage({
                code: 'QUE_TAB_BUCKET_VIEW',
                parentCode: 'QUE_TAB_BUCKET_VIEW',
              })
            }
            rightIcon={<FontAwesomeIcon icon={faBolt} />}
            size="lg"
            w="full"
          >
            {processView}
          </Button>
          <Attribute config={{ size: 'xl' }} code={agency} attribute="PRI_IMAGE_URL" />
          {dashboardSbes.slice(0, Infinity).map(sbeCode => (
            <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
          ))}
        </VStack>
      </Card>
    </VStack>
  )
}

export default AgentDashboard
