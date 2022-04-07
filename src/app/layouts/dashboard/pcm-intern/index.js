import { Box, HStack, Text, VStack, Stack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { find, includes, toUpper } from 'ramda'

import { selectAttributes } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { callBucketView, onSendMessage } from 'vertx'
import Recommendations from 'app/layouts/dashboard/intern/recommendations'
import Attribute from 'app/BE/attribute'
import { useEffect } from 'react'
import Card from 'app/layouts/components/card'
import Progress from 'app/layouts/dashboard/intern/progress'

const Intern = ({ userCode }) => {
  const [firstnameValue, occ, status] = useSelector(
    selectAttributes(userCode, ['PRI_FIRSTNAME', 'PRI_ASSOC_OCCUPATION', 'PRI_STATUS']),
  )

  const firstName = toUpper(firstnameValue?.value) || ''

  return (
    <Box marginLeft="72px">
      <Text
        fontFamily="Roboto"
        fontWeight="700"
        fontSize="36px"
        color="#234371"
      >{`WELCOME ${firstName}`}</Text>
    </Box>
  )
}

export default Intern
