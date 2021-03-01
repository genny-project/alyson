import { compose, split, prop, join, init, head } from 'ramda'

export const currentDateInIsoFormat = compose(prop(0), split('T'))(new Date().toISOString())

export const currentMonthInIsoFormat = compose(
  join('-'),
  init,
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())

export const currentYearInIsoFormat = compose(
  head,
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())
