import { split, pathOr, replace } from 'ramda'
import timeBasedOnTimeZone from 'utils/helpers/timezone_magic/time-based-on-timezone'

const dateTimeInfo = date => {
  const splittedDateTime = date && split('T')(date)
  const dateOnly = pathOr('', [0])(splittedDateTime)
  const timeOnly = pathOr('', [1])(splittedDateTime)
  const dateInfo = split('-')(dateOnly)
  const timeInfo = split(':')(timeOnly)

  const year = dateInfo[0]
  const month = dateInfo[1]
  const day = dateInfo[2]
  const hour = timeInfo[0]
  const minute = timeInfo[1]
  const seconds = timeInfo[2]

  return { year, month, day, hour, minute, seconds }
}

const utcDateTimeInfo = date => {
  const splittedDateTime = date && split(',')(date)
  const dateOnly = pathOr('', [0])(splittedDateTime)
  const timeOnly = replace(':00', '', pathOr('', [1])(splittedDateTime))

  return { dateOnly, timeOnly }
}

const formatDate = (utcDate, includeTime) => {
  const { year, month, day, hour, minute, seconds } = dateTimeInfo(utcDate)
  const localDateInUTCFormat = new Date(Date.UTC(year, month, day, hour, minute, seconds))
  const displayLocalDate = timeBasedOnTimeZone(localDateInUTCFormat)

  if (displayLocalDate !== 'Invalid Date') {
    const { dateOnly, timeOnly } = utcDateTimeInfo(displayLocalDate)
    const dateString = timeOnly ? `${dateOnly}, ${timeOnly}` : `${dateOnly}`
    return includeTime ? dateString : dateOnly
  }
  return ''
}

export default formatDate
