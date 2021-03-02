import { currentYearInIsoFormat } from 'utils/helpers/date-info-in-iso-format'

const yearRange = (years = 100) =>
  Array.from(Array(years), (_, idx) => currentYearInIsoFormat - idx)

export default yearRange
