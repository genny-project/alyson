import { useSelector } from 'react-redux'
import { selectDashboard } from 'redux/app/selectors'
import DisplaySbe from 'app/SBE'
import { Button, HStack, Stack, useColorModeValue, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faColumns } from '@fortawesome/free-solid-svg-icons'
import Search from 'app/layouts/navigation/Search'
import { onSendMessage } from 'vertx'

const Agent = ({ userCode }) => {
  const dashboardSbes = useSelector(selectDashboard) || []
  const bgColor = useColorModeValue('white', '')

  return (
    <VStack spacing={4}>
      <Stack bgColor={bgColor} shadow="lg" w="sm" p="3" borderRadius="md" direction="column">
        <VStack spacing={4}>
          <DisplaySbe sbeCode={dashboardSbes[0]} />
          <HStack spacing={4}>
            {dashboardSbes.slice(1, Infinity).map(sbeCode => (
              <DisplaySbe key={sbeCode} sbeCode={sbeCode} />
            ))}
          </HStack>
        </VStack>
      </Stack>
      <Button
        onClick={() =>
          onSendMessage({
            code: 'QUE_TAB_BUCKET_VIEW',
            parentCode: 'QUE_TAB_BUCKET_VIEW',
          })
        }
        leftIcon={<FontAwesomeIcon icon={faColumns} />}
        rightIcon={<FontAwesomeIcon icon={faBolt} />}
        colorScheme="gradient"
      >
        Go to Process View
      </Button>
      <Search />
    </VStack>
  )
}

export default Agent
