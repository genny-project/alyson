import { compose, split, prop, join, update, adjust, subtract, length, __ } from 'ramda'

const setYearForDateDefault = compose(
  join('-'),
  adjust(0, subtract(__, 100)),
  split('-'),
  prop(0),
  split('T'),
)(new Date().toISOString())

const setYearForDateUsingValue = value =>
  compose(join('-'), update(0, value), split('-'), prop(0), split('T'))(new Date().toISOString())

const setYearForDate = value => {
  if (value && length(value) === 4) {
    return setYearForDateUsingValue(value)
  }
  return setYearForDateDefault
}
export default setYearForDate
