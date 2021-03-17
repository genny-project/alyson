import timeZoneFromBrowser from 'utils/helpers/timezone_magic/time-zone-from-browser'

const timeBasedOnTimeZone = (date, locale = 'en-US') =>
  date.toLocaleString(locale, { timeZone: timeZoneFromBrowser || 'Australia/Adelaide' })
export default timeBasedOnTimeZone
