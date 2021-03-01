import { compose, split, prop, join, update, adjust, subtract, length, init, __ } from 'ramda'

const setYearForMonthDefault = compose(
  join('-'),
  adjust(0, subtract(__, 100)),
  update(1, '01'),
  init,
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())

const setYearForMonthUsingValue = value =>
  compose(
    join('-'),
    update(0, value),
    update(1, '01'),
    init,
    split('-'),
    prop(0),
    split('T'),
  )(new Date().toISOString())

const setYearForMonth = value => {
  if (value && length(value) === 4) {
    return setYearForMonthUsingValue(value)
  }
  return setYearForMonthDefault
}
export default setYearForMonth
