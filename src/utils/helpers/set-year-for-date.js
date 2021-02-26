import { compose, split, prop, join, update, adjust, subtract, __ } from 'ramda'
const setYearForDate = value => {
  if (value) {
    return compose(
      join('-'),
      update(0, value),
      split('-'),
      prop(0),
      split('T'),
    )(new Date().toISOString())
  }
  return compose(
    join('-'),
    adjust(0, subtract(__, 100)),
    split('-'),
    prop(0),
    split('T'),
  )(new Date().toISOString())
}
export default setYearForDate
