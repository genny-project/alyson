import { compose, split, prop, join, init } from 'ramda'

const todaysMonthInIsoFormat = compose(
  join('-'),
  init,
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())

export default todaysMonthInIsoFormat
