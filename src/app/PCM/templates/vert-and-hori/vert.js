import { Grid } from '@chakra-ui/react'
import { includes } from 'ramda'
import useProductColors from 'utils/productColors'

const vert = mappingFunction => (mappedPcm, depth, config) => {
  const isForm = includes('FORM', mappedPcm?.code || '') || includes('_ADD_', mappedPcm?.code || '')
  const { tplVertJustify, tplVertFormJustify } = useProductColors()

  return (
    <Grid
      w={isForm ? 'min(100%, 50rem)' : 'full'}
      alignItems="start"
      justifyItems={isForm ? tplVertFormJustify : tplVertJustify}
      gap={3}
      _empty={{ display: 'none' }}
    >
      {mappingFunction(mappedPcm, depth, config ?? { config: { bg: 'red' } })}
    </Grid>
  )
}

export default vert
