import { compose, split, prop, head } from 'ramda'

const todaysYearInIsoFormat = compose(
  head,
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())

export default todaysYearInIsoFormat
