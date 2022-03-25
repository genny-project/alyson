import { faBolt, faColumns } from '@fortawesome/free-solid-svg-icons'

import AgentDashboardSummary from './summary'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import DisplaySbe from 'app/SBE'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from 'app/layouts/dashboard/search'
import { VStack } from '@chakra-ui/react'
import getFilteredDashboardSbes from 'app/layouts/dashboard/helpers/get-filtered-sbes.ts'
import { head } from 'ramda'
import { onSendMessage } from 'vertx'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectCode } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const Agent = () => {
  const dashboardSbes = useSelector(selectDashboard) || []

  const userCode = useSelector(selectCode('USER'))
  const agency = head(safelyParseJson(useSelector(selectCode(userCode, 'LNK_AGENCY'))?.value, ['']))

  const filteredDashboardSbes = getFilteredDashboardSbes(dashboardSbes)

  return (
    <VStack spacing={4}>
      <Card boxShadow={'md'}>
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
