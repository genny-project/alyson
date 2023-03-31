import { compose, values } from 'ramda'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'

const getLocValues = compose(values, getSpillLocs)

export default getLocValues
