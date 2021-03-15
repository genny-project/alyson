import timeZoneFromBrowser from 'utils/helpers/time-zone-from-browser'

const timeBasedOnTimeZone = (date, locale = 'en-AU') =>
  date.toLocaleString(locale, { timeZone: timeZoneFromBrowser || 'Australia/Melbourne' })
export default timeBasedOnTimeZone
