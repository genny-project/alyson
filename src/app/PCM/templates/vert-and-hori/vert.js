import { Grid } from '@chakra-ui/react'

const vert = mappingFunction => (mappedPcm, depth) => (
  <Grid alignItems="start" spacing="5">
    {mappingFunction(mappedPcm, depth)}
  </Grid>
)

export default vert
