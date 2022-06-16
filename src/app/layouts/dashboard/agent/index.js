import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faColumns } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'
import AgentDashboardSummary from './summary'
import { selectCode } from 'redux/db/selectors'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { head } from 'ramda'
import Attribute from 'app/BE/attribute'
import Search from 'app/layouts/dashboard/search'
import Button from 'app/layouts/components/button'
import getFilteredDashboardSbes from 'app/layouts/dashboard/helpers/get-filtered-sbes.ts'

const Agent = () => {
  const dashboardSbes = useSelector(selectDashboard) || []

  const userCode = useSelector(selectCode('USER'))
  const agency = head(safelyParseJson(useSelector(selectCode(userCode, 'LNK_AGENCY'))?.value, ['']))

  const filteredDashboardSbes = getFilteredDashboardSbes(dashboardSbes)

  return (
    <VStack spacing={4}>
      <Card>
        <VStack spacing={5} w={['xs', 'md']}>
          <Button
            variant="special"
            onClick={() =>
              onSendMessage({
                code: 'QUE_TAB_BUCKET_VIEW',
                parentCode: 'QUE_TAB_BUCKET_VIEW',
              })
            }
            leftIcon={<FontAwesomeIcon icon={faColumns} />}
            rightIcon={<FontAwesomeIcon icon={faBolt} />}
            size="lg"
            w="full"
          >
            {`Process View`}
          </Button>
          <Attribute config={{ size: 'xl' }} code={agency} attribute="PRI_IMAGE_URL" />
          {filteredDashboardSbes.slice(1, Infinity).map(sbeCode => (
            <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
          ))}
          <Search sbeCode={dashboardSbes} />
        </VStack>
      </Card>
      <AgentDashboardSummary />
    </VStack>
  )
}

export default Agent
