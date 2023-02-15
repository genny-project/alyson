import { Grid } from '@chakra-ui/react'

const vert = mappingFunction => (mappedPcm, depth, config) => (
  <Grid alignItems="start" gap={3}>
    {mappingFunction(mappedPcm, depth, config)}
  </Grid>
)

export default vert
