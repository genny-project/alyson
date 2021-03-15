import { split } from 'ramda'

const formatDate = (date, includeTime) => {
  const splittedDateTime = date && split('T')(date)
  const dateOnly = splittedDateTime && splittedDateTime[0]
  const timeOnly = splittedDateTime && splittedDateTime[1]
  const dateWithTime = `${dateOnly}, ${timeOnly}`

  return includeTime ? dateWithTime : dateOnly
}

export default formatDate
