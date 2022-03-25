import { Box, Grid, Text } from '@chakra-ui/layout'

import Attribute from 'app/BE/attribute'
import React from 'react'

const Details = ({ label, locationCode, currentMentor }) => {
  return (
    <Grid templateColumns={'repeat(auto-fit, minmax(7rem, max-content))'} w={'100%'}>
      {label && <Text>{label}:</Text>}
      <Box>
        <Attribute config={{ textStyle: 'body.3' }} code={currentMentor} attribute={locationCode} />
      </Box>
    </Grid>
  )
}

export default Details
