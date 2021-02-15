import { filter, includes, replace } from 'ramda'

const getSorts = filter(includes('SRT_'))

export default getSorts
export const getAsField = replace('SRT', 'FLD')
