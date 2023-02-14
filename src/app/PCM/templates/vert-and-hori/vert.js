import { Grid } from '@chakra-ui/react'

const vert = mappingFunction => (mappedPcm, depth, config) => (
  <Grid alignItems="start" gap={4} justifyContent="center">
    {mappingFunction(mappedPcm, depth, config)}
  </Grid>
)

export default vert
