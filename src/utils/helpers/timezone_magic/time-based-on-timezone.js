import timeZoneFromBrowser from 'utils/helpers/timezone_magic/time-zone-from-browser'

const userLocale = navigator.language || navigator.languages[0]

const timeBasedOnTimeZone = (date, locale = userLocale) =>
  date.toLocaleString(locale, { timeZone: timeZoneFromBrowser })
export default timeBasedOnTimeZone
