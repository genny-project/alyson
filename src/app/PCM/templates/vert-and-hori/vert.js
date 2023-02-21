import { Grid } from '@chakra-ui/react'
import useProductColors from 'utils/productColors'

const vert = mappingFunction => (mappedPcm, depth, config) => {
  const { tplVertJustify } = useProductColors()

  return (
    <Grid alignItems="start" justifyItems={tplVertJustify} gap={3}>
      {mappingFunction(mappedPcm, depth, config)}
    </Grid>
  )
}

export default vert
