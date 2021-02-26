import { compose, split, prop } from 'ramda'

const todaysDateInIsoFormat = compose(prop(0), split('T'))(new Date().toISOString())

export default todaysDateInIsoFormat
