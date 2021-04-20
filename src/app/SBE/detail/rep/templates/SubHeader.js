import { Box, Flex, Text } from '@chakra-ui/react'

import Actions from 'app/layouts/components/actions'

const DetailSubHeader = ({ name, assocHC, jobTitle, actions, beCode, sbeCode }) => {
  return (
    <Box textAlign="center">
      <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
        {name?.value}
      </Text>
      <Box mb="1rem">
        {assocHC ? <Text>{`${jobTitle}, ${assocHC}`}</Text> : <Text>{`${jobTitle}`}</Text>}
      </Box>
      <Flex justifyContent="center" mb="1rem">
        <Actions actions={actions} sbeCode={sbeCode} beCode={beCode} />
      </Flex>
    </Box>
  )
}

export default DetailSubHeader
