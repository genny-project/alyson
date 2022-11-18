import { Grid } from '@chakra-ui/react'

const vert = mappingFunction => (mappedPcm, depth) => (
  <Grid alignItems="start" gap={4}>
    {mappingFunction(mappedPcm, depth)}
  </Grid>
)

export default vert
