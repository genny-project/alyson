import { Grid } from '@chakra-ui/react'
import { includes } from 'ramda'
import useProductColors from 'utils/productColors'

const vert = mappingFunction => (mappedPcm, depth, config, showCard = false) => {
  const isForm = includes('FORM', mappedPcm?.code || '') || includes('_ADD_', mappedPcm?.code || '')

  const { tplVertJustify, tplVertFormJustify } = useProductColors()

  return (
    <Grid
      w={isForm ? 'min(100%, 50rem)' : 'full'}
      borderRadius={showCard ? '2.5rem' : undefined}
      bg={showCard ? 'white' : undefined}
      paddingBlock={showCard ? 6 : undefined}
      paddingInline={showCard ? 10 : undefined}
      alignItems="start"
      justifyItems={isForm ? tplVertFormJustify : tplVertJustify}
      gap={3}
      _empty={{ display: 'none' }}
    >
      {mappingFunction(mappedPcm, depth, config ?? { config: {} })}
    </Grid>
  )
}

export default vert
