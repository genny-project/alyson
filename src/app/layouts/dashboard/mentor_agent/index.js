import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Button, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { head } from 'ramda'
import Attribute from 'app/BE/attribute'

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
            {`Take me to Bucket Page`}
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
