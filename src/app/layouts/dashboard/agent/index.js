import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Button, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faColumns } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'

const Agent = () => {
  const dashboardSbes = useSelector(selectDashboard) || []

  return (
    <VStack spacing={4}>
      <Card>
        <VStack spacing={10} w="md">
          <Button
            colorScheme="gradient"
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
            Process View
          </Button>
          <DisplaySbe sbeCode={dashboardSbes[0]} />
          {dashboardSbes.slice(1, Infinity).map(sbeCode => (
            <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
          ))}
        </VStack>
      </Card>

      {/* <Search /> */}
    </VStack>
  )
}

export default Agent
