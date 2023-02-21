import { Grid } from '@chakra-ui/react'
import { includes } from 'ramda'
import useProductColors from 'utils/productColors'

const vert = mappingFunction => (mappedPcm, depth, config) => {
  const isForm = includes('FORM', mappedPcm?.code || '') || includes('_ADD_', mappedPcm?.code || '')
  const { tplVertJustify, tplVertFormJustify } = useProductColors()
  return (
    <Grid alignItems="start" justifyItems={isForm ? tplVertFormJustify : tplVertJustify} gap={3}>
      {mappingFunction(mappedPcm, depth, config)}
    </Grid>
  )
}

export default vert
